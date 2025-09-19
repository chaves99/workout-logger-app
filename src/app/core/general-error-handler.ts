import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, inject } from "@angular/core";
import { StorageService } from "../services";
import { Router } from "@angular/router";
import { StorageKey } from "./types/types";

export class GeneralErrorHandler implements ErrorHandler {

  storageService = inject(StorageService);
  router = inject(Router);

  handleError(error: any): void {
    console.log(error);
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        this.storageService.delete(StorageKey.LOGIN_RESPONSE);
        this.router.navigate(['/login']);
      }
    }
  }
}
