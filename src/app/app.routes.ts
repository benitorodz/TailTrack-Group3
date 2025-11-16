import { Routes } from '@angular/router';
import { ExerciseLogComponent } from './exercise/exercise-log.component';

export const routes: Routes = [
  { path: 'exercise', component: ExerciseLogComponent },
  { path: '', redirectTo: 'exercise', pathMatch: 'full' }
];
