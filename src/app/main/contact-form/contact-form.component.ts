import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  form: FormGroup;
  status: FormStatus = 'idle';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name:    ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get name()    { return this.form.get('name')!; }
  get email()   { return this.form.get('email')!; }
  get message() { return this.form.get('message')!; }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.status = 'sending';
    this.http.post(environment.contactApiUrl, this.form.value).subscribe({
      next: () => {
        this.status = 'success';
        this.form.reset();
      },
      error: () => {
        this.status = 'error';
      }
    });
  }
}
