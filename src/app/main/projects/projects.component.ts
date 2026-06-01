import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  constructor(public lang: LanguageService) {}
}
