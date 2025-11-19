import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'vet',
    loadComponent: () => import('./vet/vet-log.component').then(m => m.VetLogComponent)
  }
];
