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
        <a routerLink="/Vet
        " routerLinkActive="active">Vet Log</a>
        <!-- later: add Feeding, Vet Visits, etc -->
      </nav>
    </header>

    <main class="page">
      <router-outlet></router-outlet>
    </main>
  `
  // no styleUrls – you’re using global styles.css
})
export class AppComponent {}