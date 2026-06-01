import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { SanitizeHtmlPipe } from '../../pipes/sanitizeHtml.pipe';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

// Cloudflare Turnstile, injected globally by its script.
declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, opts: Record<string, unknown>): string;
      reset(id?: string): void;
      remove(id?: string): void;
    };
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
// Bots tend to submit instantly; ignore anything faster than this.
const MIN_SUBMIT_MS = 2500;

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, SanitizeHtmlPipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements AfterViewInit {
  form: FormGroup;
  status: FormStatus = 'idle';
  /** True when the user submitted without solving the Turnstile challenge. */
  captchaError = false;

  @ViewChild('turnstile') private turnstileEl?: ElementRef<HTMLDivElement>;

  private readonly isBrowser: boolean;
  private renderedAt = 0;
  private widgetId?: string;
  private token = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.form = this.fb.group({
      name:    ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, Validators.requiredTrue],
      // Honeypot: hidden from real users; only bots fill it. Must stay empty.
      company: ['']
    });
  }

  get name()    { return this.form.get('name')!; }
  get email()   { return this.form.get('email')!; }
  get message() { return this.form.get('message')!; }
  get consent() { return this.form.get('consent')!; }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.renderedAt = Date.now();
    this.loadTurnstile()
      .then(() => this.renderWidget())
      .catch(() => {
        // If the challenge script can't load we leave `token` empty; submit() then
        // surfaces the captcha error rather than silently sending unverified.
      });
  }

  submit(): void {
    this.captchaError = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Honeypot tripped → almost certainly a bot. Pretend it worked, send nothing.
    if (this.form.value.company) {
      this.status = 'success';
      this.form.reset();
      return;
    }

    // Too fast to be a human filling the form.
    if (Date.now() - this.renderedAt < MIN_SUBMIT_MS) {
      this.captchaError = true;
      return;
    }

    if (this.isBrowser && !this.token) {
      this.captchaError = true;
      return;
    }

    this.status = 'sending';
    const { name, email, message } = this.form.value;
    this.http
      .post(environment.contactApiUrl, {
        name,
        email,
        message,
        turnstileToken: this.token,
        elapsedMs: Date.now() - this.renderedAt,
        company: this.form.value.company,
      })
      .subscribe({
        next: () => {
          this.status = 'success';
          this.form.reset();
          this.resetWidget();
        },
        error: () => {
          this.status = 'error';
          this.resetWidget();
        },
      });
  }

  /** Load the Turnstile script once, resolving when the API is available. */
  private loadTurnstile(): Promise<void> {
    if (window.turnstile) return Promise.resolve();
    const base = TURNSTILE_SRC.split('?')[0];
    const existing = document.querySelector<HTMLScriptElement>(`script[src^="${base}"]`);
    if (existing) {
      return new Promise((resolve, reject) => {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject());
      });
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  private renderWidget(): void {
    if (!window.turnstile || !this.turnstileEl) return;
    this.widgetId = window.turnstile.render(this.turnstileEl.nativeElement, {
      sitekey: environment.turnstileSiteKey,
      callback: (token: string) => {
        this.token = token;
        this.captchaError = false;
      },
      'expired-callback': () => (this.token = ''),
      'error-callback': () => (this.token = ''),
    });
  }

  /** After a send, force a fresh challenge so the token can't be replayed. */
  private resetWidget(): void {
    this.token = '';
    this.renderedAt = Date.now();
    if (this.isBrowser && window.turnstile) {
      window.turnstile.reset(this.widgetId);
    }
  }
}
