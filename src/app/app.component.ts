import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabKmlComponent } from './components/tab-kml/tab-kml.component';
import { TxtToKmlComponent } from './components/txt-tab-to-kml/txt-tab-to-kml.component';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TxtToKmlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = '';
  constructor(private primeng: PrimeNG) {}
  
  ngOnInit() {
      this.primeng.ripple.set(true);
  }
}
