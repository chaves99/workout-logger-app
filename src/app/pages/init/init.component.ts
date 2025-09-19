import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { WorkoutHolderService, WorkoutService } from '../../services';
import { ExerciseResponse, title, WorkoutResponse } from '../../core';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDecriptionFormDialogComponent } from './workout-decription-form-dialog/workout-decription-form-dialog.component';

@Component({
  selector: 'app-init',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    DatePipe,
  ],
  templateUrl: './init.component.html',
  styleUrl: './init.component.css'
})
export class InitComponent implements OnInit {

  workoutService = inject(WorkoutService);
  workoutHolderService = inject(WorkoutHolderService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  workoutResponse: WorkoutResponse[] = [];

  ngOnInit(): void {
    this.workoutService.getPagedByUser(0, 2)
      .subscribe(res => {
        this.workoutResponse = res.content;
      });
  }

  public exerciseResume(exercise: ExerciseResponse): string {
    let total = 0;
    exercise.executions.forEach(execution => {
      total += (execution.reps * execution.weight);
    });
    return `${exercise.name} total: ${total}Kg`;
  }

  public getDuration(start: string, end: string) {
    const milliDiff: number = new Date(end).getTime() - new Date(start).getTime();

    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const remSeconds = totalSeconds % 60;
    const remMinutes = totalMinutes % 60;
    return `Duration: ${totalHours}:${remMinutes}:${remSeconds}`;
  }

  public onStart(): void {
    this.matDialog
      .open(WorkoutDecriptionFormDialogComponent, {})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.router.navigate(['add-workout'], {
            queryParams: { description: title(result) }
          })
        }
      });
  }

  public onSeeMore(workout: WorkoutResponse): void {
    this.workoutHolderService.hold(workout);
    this.router.navigate(['workout-detail']);
  }

}
