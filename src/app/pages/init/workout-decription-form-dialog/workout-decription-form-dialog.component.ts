import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-workout-decription-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './workout-decription-form-dialog.component.html',
})
export class WorkoutDecriptionFormDialogComponent {

  readonly dialogRef = inject(MatDialogRef<WorkoutDecriptionFormDialogComponent>);

  description?: string;

  public onCancel(): void {
    this.dialogRef.close();
  }
}
