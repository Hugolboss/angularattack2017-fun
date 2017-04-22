import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/change_detection';
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isAuthenticated;

    constructor(private authService: AuthService) {
      this.authService.getAuthObservable().subscribe(auth => {
        if (auth) {
          this.isAuthenticated = true;
        }
      });
    }

    canActivate() {
        return this.isAuthenticated;
    }
}
