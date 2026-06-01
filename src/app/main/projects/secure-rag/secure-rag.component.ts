import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlPipe } from '../../../pipes/sanitizeHtml.pipe';
import { LanguageService } from '../../../core/language.service';

@Component({
  selector: 'app-secure-rag',
  standalone: true,
  imports: [RouterLink, TranslateModule, SanitizeHtmlPipe],
  templateUrl: './secure-rag.component.html',
})
export class SecureRagComponent implements OnInit {
  readonly repoUrl = 'https://github.com/AlexandreBessard/secure-rag-assistant';

  /** Verbatim architecture diagram from the project README. */
  readonly architecture = String.raw`┌──────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                    Angular 21 SPA (:4200)                    │
│        Keycloak PKCE login → Bearer token on each request    │
└───────────────────────────────┬──────────────────────────────┘
                                │ HTTPS + JWT
                                ▼
┌──────────────────────────────────────────────────────────────┐
│                       BACKEND  (:8080)                       │
│                                                              │
│  POST /ask ─► PromptGuardService                             │
│                [1] regex injection patterns    (zero cost)   │
│                [2] keyword blocklist           (zero cost)   │
│                [3] Comprehend DetectToxicContent             │
│                      │                                       │
│                      ▼                                       │
│              ChatService                                     │
│                ┌ Phase 1: Tool-first ───────────────────┐    │
│                │  ChatClient + MCP tools (no RAG)        │    │
│                │  → if LLM answers: return ✓             │    │
│                └ Phase 2: RAG fallback ─────────────────┘    │
│                   MultiQueryExpander (4 query variants)      │
│                   RoleFilterDocumentRetriever               │
│                     JWT role → RoleHierarchy → pgvector     │
│                   ContextualQueryAugmenter                   │
│                   CanaryWordAdvisor (leak detection)   [4]   │
│                   EvaluationService (relevancy score)       │
│                                                              │
│  POST /upload ─► DocumentUploadService ─► S3                 │
│  GET  /history ─► SPRING_AI_CHAT_MEMORY + RAG_SOURCES (PG)   │
└──────┬─────────────────────────┬─────────────────────────────┘
       │ SSE (MCP)               │ pgvector query / JDBC
       ▼                         ▼
┌──────────────┐    ┌────────────────────────────┐
│ TOOLS (:8082)│    │  PostgreSQL + pgvector      │
│ DocumentAccess    │  (:5433)                    │
│ Tool → S3    │    │  • vector_store             │
└──────────────┘    │  • SPRING_AI_CHAT_MEMORY    │
                    │  • RAG_SOURCES              │
                    └────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                     INGESTION SERVICE  (:8081)               │
│  local profile  POST /ingest (multipart) ───────────────┐    │
│  aws profile    SQS ◄─ S3 event notification            │    │
│                   HeadObject (metadata) + GetObject     │    │
│                   TikaDocumentReader → TokenTextSplitter │    │
│                   VectorStore.accept() ─► Titan V2 ─► pgvector│
└──────────────────────────────────────────────────────────────┘

┌───────────────┐   ┌────────────────────────────────┐
│ KEYCLOAK      │   │  AWS BEDROCK  (eu-west-3)       │
│ (:8180)       │   │  • claude-haiku-4-5 (chat)      │
│ realm:        │   │  • titan-embed-text-v2          │
│ rag-assistant │   │    (1024-dim embeddings)        │
└───────────────┘   └────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  OBSERVABILITY                               │
│  Prometheus (:9090) ◄─ Spring Boot actuators │
│  Grafana    (:3000) ◄─ Prometheus            │
│  Jaeger     (:16686) ◄─ OTLP traces          │
└──────────────────────────────────────────────┘`;

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
