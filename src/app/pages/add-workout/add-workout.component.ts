
import { Component, inject, OnInit, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { WorkoutHolderService, WorkoutService } from '../../services';
import { ExecutionRequest, ExerciseRequest } from '../../core';
import { AddExerciseFormDialogComponent } from './add-exercise-form/add-exercise-form-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-workout',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css',
  standalone: true,
})
export class AddWorkoutComponent implements OnInit {

  description?: string;
  begining?: Date;
  exercises: ExerciseRequest[] = [];

  workoutService = inject(WorkoutService);
  workoutHolderService = inject(WorkoutHolderService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  readonly exerciseDialog = inject(MatDialog);

  ngOnInit(): void {
    this.begining = new Date();
    const routeDesc = this.activatedRoute.snapshot.queryParamMap.get('description');
    if (routeDesc)
      this.description = routeDesc;
  }

  openExerciseDialog(): void {
    this.exerciseDialog
      .open(AddExerciseFormDialogComponent, {})
      .afterClosed()
      .subscribe((result?: ExerciseRequest) => {
        if (result !== undefined) {
          let orderCounter = 0;
          this.exercises.forEach(exercise => orderCounter += exercise.executions.length);
          const exercise = this.exercises.filter(exer => exer.name === result.name)[0];
          if (exercise) {
            const newExecution: ExecutionRequest = {
              ...result.executions[0],
              order: orderCounter,
            };
            exercise.executions.push(newExecution);
          } else {
            this.exercises.push({
              name: result.name,
              executions: [{ ...result.executions[0], order: orderCounter }]
            })
          }
        }
      });
  }

  submit() {
    if (this.description && this.begining) {
      this.workoutService.create({
        description: this.description,
        begining: this.begining.toISOString(),
        finish: new Date().toISOString(),
        exercises: this.exercises
      }).pipe(workout => {
        return workout;
      }).subscribe(workout => {
        this.workoutHolderService.hold(workout);
        this.router.navigate(['workout-detail']);
      });
    }
  }

  public onListItemClick(exercise: ExerciseRequest, order: number): void {
    this.exerciseDialog
      .open(AddExerciseFormDialogComponent, { data: { exercise: exercise, order: order } })
      .afterClosed()
      .subscribe((result?: ExerciseRequest) => {
        if (result !== undefined) {
          const execution = result.executions[0];
          this.exercises.forEach(exercise => {
            if (exercise.name === result.name) {
              exercise.executions = exercise.executions.map(exec => {
                if (exec.order == execution.order) {
                  return { ...execution };
                }
                return exec;
              });
            }
          });
        }
      });
  }
}
