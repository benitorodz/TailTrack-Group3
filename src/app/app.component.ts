import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
template: `
  <header class="page">
    <h1>TailTrack</h1>
    <nav class="actions">
      <a routerLink="/feeding" routerLinkActive="active">Feeding Schedule</a>
      <a routerLink="/exercise" routerLinkActive="active">Exercise Log</a>
    </nav>
  </header>

  <main class="page">
    <router-outlet></router-outlet>
  </main>
  `
  // no styleUrls – you’re using global styles.css
})
export class AppComponent {}