import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ExerciseResponse, WorkoutResponse } from '../../core';
import { WorkoutHolderService } from '../../services';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-workout-detail',
  imports: [
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './workout-detail.component.html',
  styleUrl: './workout-detail.component.css'
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {

  workout?: WorkoutResponse;

  workoutHolderService = inject(WorkoutHolderService);
  router = inject(Router);

  ngOnInit(): void {
    this.workoutHolderService.currentWorkout.subscribe(workout => {
      if (workout !== undefined)
        this.workout = workout;
      else
        this.router.navigate(['init']);
    });
  }

  public getTotalOfSet(): number {
    let total = 0;
    if (this.workout) {
      this.workout.exercises.forEach(exercise => total += exercise.executions.length);
    }
    return total;
  }

  public getTotalTons(): number {
    let total = 0;
    if (this.workout) {
      this.workout.exercises
        .forEach(exercise =>
          exercise.executions
            .forEach(exec => total += (exec.reps * exec.weight)))
    }
    return total;
  }

  public totalTon(exercise: ExerciseResponse): number {
    return exercise.executions
      .map(e => (e.weight * e.reps))
      .reduce((prev, current) => prev + current, 0);
  }

  public onBack() {
    this.router.navigate(['init']);
  }

  ngOnDestroy(): void {
    this.workoutHolderService.hold(undefined);
  }
}
