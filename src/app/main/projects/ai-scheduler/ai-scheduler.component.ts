import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlPipe } from '../../../pipes/sanitizeHtml.pipe';
import { LanguageService } from '../../../core/language.service';

@Component({
  selector: 'app-ai-scheduler',
  standalone: true,
  imports: [RouterLink, TranslateModule, SanitizeHtmlPipe],
  templateUrl: './ai-scheduler.component.html',
})
export class AiSchedulerComponent implements OnInit {
  readonly repoUrl = 'https://github.com/AlexandreBessard/ai-scheduler-poc';

  /** Architecture diagram (reconstructed from the project's README). */
  readonly architecture = String.raw`┌──────────────────────────────────────────────────────────────┐
│                          BROWSER                             │
│   ┌────────────────────────┐   ┌────────────────────────┐    │
│   │   client-app  :4200    │   │   admin-app  :4201     │    │
│   │   SchedulingPrompt     │   │   AppointmentList      │    │
│   │   • chat UI            │   │   • live table         │    │
│   │   • threadId (UUID)    │   │   • loading / error    │    │
│   │   • payment modal      │   │                        │    │
│   └───────────┬────────────┘   └───────────┬────────────┘    │
└───────────────│────────────────────────────│────────────────┘
        POST /chat                    GET /appointments
        POST /appointments/{id}/pay   POST /appointments/{id}/pay
                │                            │
┌───────────────▼────────────────────────────▼────────────────┐
│                       FastAPI  :8000                         │
│   ┌────────────────────────┐   ┌────────────────────────┐    │
│   │        chat.py         │   │     appointments.py    │    │
│   │   rate limiter         │   │   GET  /appointments   │    │
│   │   (20 req/60s/thread)  │   │   GET  /…/{id}         │    │
│   │        │               │   │   POST /appointments   │    │
│   │        ▼               │   │   POST /…/{id}/pay     │    │
│   │   graph.ainvoke()      │   └───────────┬────────────┘    │
│   │   scan ToolMessages    │               │                 │
│   │   → extract            │               │                 │
│   │     payment_request    │               │                 │
│   └───────────┬────────────┘               │                 │
└───────────────│────────────────────────────│────────────────┘
                ▼                            │
┌───────────────────────────────┐            │
│      LangGraph StateGraph     │            │
│    (compiled once at startup) │            │
│    ┌─────────┐  tool_calls?   │            │
│    │  agent  │───────────────►│            │
│    │  node   │◄───────────────│            │
│    └────┬────┘   ┌─────────┐  │            │
│         │        │  tools  │  │            │
│         ▼        │  node   │  │            │
│        END       └────┬────┘  │            │
│    MemorySaver        │       │            │
│    (thread_id key)    │       │            │
└───────────────────────│───────┘            │
                        ▼                    ▼
┌──────────────────────────────────────────────────────────────┐
│                     AppointmentService                        │
│                (single owner of all storage)                  │
│   check_availability │ book_appointment │ cancel │ mark_paid  │
│                _store: dict[id → Appointment]                 │
│                      (in-memory, PoC)                         │
└───────────────────────────────┬──────────────────────────────┘
                                │  (DATABASE_URL wired, not yet used)
                                ▼
                       ┌──────────────────┐
                       │   PostgreSQL     │
                       │   port 5433      │
                       │   (Docker)       │
                       └──────────────────┘`;

  constructor(
    public lang: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
