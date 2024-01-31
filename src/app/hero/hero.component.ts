import {Component, OnInit} from '@angular/core';
import 'aos/dist/aos.css';
import AOS from 'aos';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {


  ngOnInit(): void {
    AOS.init();
  }

}
