import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { LoginResponse, StorageKey } from '../../core';
import { StorageService, UserService } from '../../services/';

@Component({
  selector: 'app-user-register',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  userService = inject(UserService);
  storageService = inject(StorageService);
  router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  public onSubmit(): void {
    const { name, email, password, confirmPassword } = this.registerForm.value;
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        this.userService.register({ name: name, email: email, password: password })
          .subscribe((res: LoginResponse) => {
            if (res) {
              this.storageService.save(StorageKey.LOGIN_RESPONSE, JSON.stringify(res))
              this.router.navigate(['init']);
            }
          });
      }
    }
  }

}

