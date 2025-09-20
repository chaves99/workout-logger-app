import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { StorageKey } from '../../core';
import { LoginService, StorageService } from '../../services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  storageService = inject(StorageService);
  loginService = inject(LoginService);

  matSnackBar = inject(MatSnackBar);

  router = inject(Router);

  usernameEmail?: string;
  password?: string;

  onSubmit(): void {
    if (this.usernameEmail && this.password) {
      this.loginService.login(this.usernameEmail, this.password)
        .subscribe({
          next: response => {
            const loginResponseJson = JSON.stringify(response);
            this.storageService.save(StorageKey.LOGIN_RESPONSE, loginResponseJson);
            this.router.navigate(['init']);
          },
          error: err => {
            if (err instanceof HttpErrorResponse
              && err.status === 401) {
              this.matSnackBar.open("Email or password incorrect", "Ok", { duration: 5000 });
            }
          }
        });
    }
  }
}
