import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { StorageKey } from '../core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  private cookieService = inject(CookieService)

  public constructor() {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist()
        .then(result => console.log(result));
    }
  }

  public save(key: StorageKey, value: string): void {
    this.cookieService.set(key, value);
  }

  public get(key: StorageKey): string {
    return this.cookieService.get(key);
  }

  public delete(key: StorageKey): void {
    this.cookieService.delete(key);
  }
}
