
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../services';
import { LoginResponse } from '../types/response';
import { StorageKey } from '../types/types';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const storageService = inject(StorageService);
  const loginResponseJson = storageService.get(StorageKey.LOGIN_RESPONSE);
  if (loginResponseJson !== null && loginResponseJson.length > 0) {
    const loginResponse: LoginResponse = JSON.parse(loginResponseJson);
    return next(req.clone({
      headers: req.headers.set('Authorization', loginResponse.token),
    }));
  }
  return next(req);
}
