import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WorkoutService } from '../../services';

@Component({
  selector: 'app-workout-history',
  imports: [
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './workout-history.component.html',
  styleUrl: './workout-history.component.css'
})
export class WorkoutHistoryComponent implements OnInit {

  public pageSize = 10;
  public pageSizeOptions = [5, 10, 20, 25];
  public contentLength = 100;

  workoutService = inject(WorkoutService);

  ngOnInit(): void {
    // this.workoutService.getByUser()

  }

}
