import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class InnerGuard implements CanActivate {
    constructor(public auth: AuthService, private loc: Location) {}

    canActivate() {
        if (this.auth.isAuthenticated()) {
            this.loc.back();
            return false;
        }
        return true;
    }
}
