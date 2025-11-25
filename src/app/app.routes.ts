import { Routes } from '@angular/router';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { VetVisitsComponent } from './vet-visits/vet-visits.component';
import { FeedingScheduleComponent } from './feeding-schedule/feeding-schedule.component';
import { ExerciseLogComponent } from './exercise/exercise-log.component';

export const routes: Routes = [
  { path: 'pets', component: PetProfileComponent },
  { path: 'visits', component: VetVisitsComponent },
  { path: 'feeding', component: FeedingScheduleComponent },
  { path: 'exercise', component: ExerciseLogComponent },
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  { path: '**', redirectTo: 'pets' }
];