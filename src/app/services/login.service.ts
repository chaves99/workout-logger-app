import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../core';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private http = inject(HttpClient);

  public login(usernameEmail: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.serviceUrl}/login`, { email: usernameEmail, password: password });
  }
}
