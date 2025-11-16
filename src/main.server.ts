import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideHttpClient, withFetch } from '@angular/common/http';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(withFetch())
    ]
  });

export default bootstrap;