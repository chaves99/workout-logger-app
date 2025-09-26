import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse, StorageKey } from '../core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  private cookieService = inject(CookieService);

  public constructor() {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist()
        .then(result => console.log(result));
    }
  }

  public save(key: StorageKey, value: string): void {
    localStorage.setItem(key, value);
    // this.cookieService.set(key, value);
  }

  public get(key: StorageKey): string {
    const value = localStorage.getItem(key);
    if (value) return value;
    return "";
    // return this.cookieService.get(key);
  }

  public delete(key: StorageKey): void {
    localStorage.removeItem(key);
    // this.cookieService.delete(key);
  }

  public getCurrentUser(): LoginResponse {
    // const loginResponseString = this.cookieService.get(StorageKey.LOGIN_RESPONSE);
    // const loginResponse: LoginResponse = JSON.parse(loginResponseString);
    // return loginResponse;
    const loginResponseString = this.get(StorageKey.LOGIN_RESPONSE);
    const loginResponse: LoginResponse = JSON.parse(loginResponseString);
    return loginResponse;
  }
}
