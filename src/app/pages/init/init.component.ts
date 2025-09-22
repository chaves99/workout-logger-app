import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { WorkoutCardComponent } from '../../components';
import { title, WorkoutResponse } from '../../core';
import { WorkoutHolderService, WorkoutService } from '../../services';
import { WorkoutDecriptionFormDialogComponent } from './workout-decription-form-dialog/workout-decription-form-dialog.component';

@Component({
  selector: 'app-init',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    WorkoutCardComponent
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

  public onSeeAll(): void {
    this.router.navigate(['history']);
  }

}
