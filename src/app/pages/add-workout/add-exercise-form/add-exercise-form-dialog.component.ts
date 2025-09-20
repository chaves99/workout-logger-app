import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ExerciseRequest, title } from '../../../core';

@Component({
  selector: 'app-add-exercise-form-dialog',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent
  ],
  templateUrl: './add-exercise-form-dialog.component.html'
})
export class AddExerciseFormDialogComponent implements OnInit {

  private readonly snackBar = inject(MatSnackBar);

  @ViewChild("inputName") inputName?: ElementRef;

  // data = inject(MAT_DIALOG_DATA);

  data: {exercise: ExerciseRequest, order: number} = inject(MAT_DIALOG_DATA);

  // readonly refExercise: ExerciseRequest | undefined = this.data.exercise;
  // readonly refOrder: number | undefined = this.data.order;

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    reps: new FormControl(null, Validators.required),
    weight: new FormControl(null, Validators.required),
  });

  readonly dialogRef = inject(MatDialogRef<AddExerciseFormDialogComponent>);

  ngOnInit(): void {
    if (this.inputName)
      this.inputName.nativeElement.focus();
    if (this.isEditing()) {
      const execution = this.data.exercise.executions.find(e => e.order === this.data.order)
      if (execution) {
        this.formGroup.controls.name.setValue(this.data.exercise.name);
        this.formGroup.controls.name.patchValue(this.data.exercise.name);
        this.formGroup.controls.name.disable();
      }
    }
  }

  private isEditing(): boolean {
    return this.data !== null
      && this.data.exercise !== null
      && this.data.order !== null;
  }

  onSubmit(): void {
    const { reps, weight } = this.formGroup.value;
    const name = this.isEditing() ? this.data.exercise.name : this.formGroup.value.name;
    const order = (this.data && this.data.order) ? this.data.order : 0;
    if (name
      && reps
      && weight) {
      const exercise: ExerciseRequest = {
        name: title(name),
        executions: [
          {
            reps: reps,
            weight: weight,
            order: order
          }
        ]
      };
      this.dialogRef.close(exercise);
    } else {
      this.snackBar.open("It need to fill all the fields!", "OK", { duration: 5000 });
    }
  }

  onBackClick(): void {
    this.dialogRef.close();
  }
}
