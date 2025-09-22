import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WorkoutCardComponent } from '../../components';
import { Page, WorkoutResponse } from '../../core';
import { StorageService, WorkoutService } from '../../services';

@Component({
  selector: 'app-workout-history',
  imports: [
    MatPaginatorModule,
    MatButtonModule,
    MatListModule,
    WorkoutCardComponent
  ],
  templateUrl: './workout-history.component.html',
  styleUrl: './workout-history.component.css'
})
export class WorkoutHistoryComponent implements OnInit {

  public pageSize = 10;
  public pageSizeOptions = [5, 10, 20, 25];
  public contentLength = 100;
  public pageIndex = 0;

  public currentWorkouts: WorkoutResponse[] = [];

  storeService = inject(StorageService);
  workoutService = inject(WorkoutService);
  location = inject(Location);

  ngOnInit(): void {
    this.fetchWorkout();
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.fetchWorkout();
  }

  fetchWorkout(): void {
    this.workoutService.getPagedByUser(this.pageIndex, this.pageSize)
      .subscribe({
        next: (response: Page<WorkoutResponse>) => {
          this.contentLength = response.page.totalElements;
          this.currentWorkouts = response.content;
        }
      });
  }

  onGoBack(): void {
    this.location.back();
  }

}
