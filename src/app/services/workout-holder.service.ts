import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkoutResponse } from '../core';

@Injectable({ providedIn: 'root' })
export class WorkoutHolderService {

  private workout = new BehaviorSubject<WorkoutResponse | undefined>(undefined);
  currentWorkout = this.workout.asObservable();

  public hold(workout?: WorkoutResponse): void {
    this.workout.next(workout);
  }
}
