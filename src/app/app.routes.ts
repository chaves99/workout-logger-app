import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './pages/add-workout/add-workout.component';
import { InitComponent } from './pages/init/init.component';
import { WorkoutDetailComponent } from './pages/pos-workout/workout-detail.component';
import { WorkoutHistoryComponent } from './pages/workout-history/workout-history.component';
import { LoginComponent } from './pages/login/login.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { AuthGuard } from './core';

export const routes: Routes = [
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: 'init', component: InitComponent, canActivate: [AuthGuard] },
  { path: 'add-workout', component: AddWorkoutComponent, canActivate: [AuthGuard] },
  { path: 'workout-detail', component: WorkoutDetailComponent, canActivate: [AuthGuard] },
  { path: 'history', component: WorkoutHistoryComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user-register', component: UserRegisterComponent },
];
