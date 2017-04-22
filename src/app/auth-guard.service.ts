import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/change_detection';
import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isAuthenticated;

    constructor(private service: AuthService) {
        this.service.getAuthenticationStatus()
            .subscribe(val => this.isAuthenticated = val);
    }

    canActivate() {
        return this.isAuthenticated;
    }
}
