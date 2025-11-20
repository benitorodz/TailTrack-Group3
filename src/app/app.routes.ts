import { Routes } from '@angular/router';
import { ExerciseLogComponent } from './exercise/exercise-log.component';
import { FeedingScheduleComponent } from './feeding-schedule/feeding-schedule.component';

export const routes: Routes = [
  { path: 'feeding', component: FeedingScheduleComponent },
  { path: 'exercise', component: ExerciseLogComponent },

  { path: '', redirectTo: 'feeding', pathMatch: 'full' },

  { path: '**', redirectTo: 'feeding' }
];
