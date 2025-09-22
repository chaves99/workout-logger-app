import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ExerciseResponse, WorkoutResponse } from '../../core/';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { WorkoutHolderService } from '../../services';

@Component({
  selector: 'app-workout-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css'
})
export class WorkoutCardComponent {

  @Input()
  workout!: WorkoutResponse;

  private router = inject(Router);
  private workoutHolderService = inject(WorkoutHolderService);


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


  public onSeeMore(workout: WorkoutResponse): void {
    this.workoutHolderService.hold(workout);
    this.router.navigate(['workout-detail']);
  }
}
