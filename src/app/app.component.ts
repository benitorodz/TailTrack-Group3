import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="page app-header">
      <div class="brand">
        <span class="paw-print">🐾</span>
        <h1>TailTrack</h1>
        <span class="paw-print">🐾</span>
      </div>

      <nav class="actions">
        <a routerLink="/pets" routerLinkActive="active">Pet Profiles</a>
        <a routerLink="/visits" routerLinkActive="active">Vet Visits</a>
        <a routerLink="/feeding" routerLinkActive="active">Feeding Schedule</a>
        <a routerLink="/exercise" routerLinkActive="active">Exercise Log</a>
      </nav>
    </header>

    <main class="page">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}

