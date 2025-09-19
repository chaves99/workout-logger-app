import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services';
import { StorageKey } from './types/types';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  storageService = inject(StorageService);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const token = this.storageService.get(StorageKey.LOGIN_RESPONSE);
    if( token !== null && token !== undefined && token.length > 0)
      return true;

    return this.router.createUrlTree(['/login']);
  }
}
