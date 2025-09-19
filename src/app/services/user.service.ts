import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateUserRequest, LoginResponse } from '../core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({providedIn:'root'})
export class UserService {

  private http = inject(HttpClient);

  private readonly URL = environment.serviceUrl + "/user";

  public register(req: CreateUserRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.URL, req);
  }
}
