import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService, StorageService } from '../../services';
import { Router, RouterLink } from '@angular/router';
import { StorageKey } from '../../core';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  storageService = inject(StorageService);
  loginService = inject(LoginService);

  router = inject(Router);

  usernameEmail?: string;
  password?: string;

  onSubmit(): void {
    if (this.usernameEmail && this.password) {
      this.loginService.login(this.usernameEmail, this.password)
        .subscribe(response => {
          const loginResponseJson = JSON.stringify(response);
          this.storageService.save(StorageKey.LOGIN_RESPONSE, loginResponseJson);
          this.router.navigate(['init']);
        });
    }
  }
}
