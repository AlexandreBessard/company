import {Pipe, PipeTransform, SecurityContext} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'sanitizeHtml',
  standalone: true
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): unknown {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
}
