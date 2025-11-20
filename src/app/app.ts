import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileEditor } from './pet-profile/petprofile-editor';


@Component({
  selector: 'app-root',
  imports: [ ProfileEditor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('trailtrack-app');
}
