import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizeHtmlPipe } from '../../pipes/sanitizeHtml.pipe';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TranslateModule, SanitizeHtmlPipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  missions = [1, 2, 3, 4, 5, 6];
}
