import { Routes } from '@angular/router';
import { ExerciseLogComponent } from './exercise/exercise-log.component';
import { FeedingScheduleComponent } from './feeding-schedule/feeding-schedule.component';
import { VetVisitsComponent } from './vet-visits/vet-visits.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';

export const routes: Routes = [
  { path: 'feeding', component: FeedingScheduleComponent },
  { path: 'exercise', component: ExerciseLogComponent },
  { path: 'visits', component: VetVisitsComponent },
  { path: 'pets', component: PetProfileComponent },

  { path: '', redirectTo: 'feeding', pathMatch: 'full' },
  { path: '**', redirectTo: 'feeding' }
];
