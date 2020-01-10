import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(public auth: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.auth.getCurrentUser().pipe(map(user => {
            if (!user) {
                return true;
            } else {
                this.router.navigate(['/dashboard']);
                return false;
            }
        }));
    }
}
