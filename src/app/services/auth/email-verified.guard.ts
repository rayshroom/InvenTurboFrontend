import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class EmailVerifiedGuard implements CanActivate {
    constructor(
        public auth: AuthService,
        private router: Router,
        private loc: Location
    ) {}

    canActivate(): Observable<boolean> {
        return this.auth.getCurrentUser().pipe(
            map(user => {
                if (user) {
                    if (!user.emailVerified) {
                        return true;
                    }
                    this.loc.back();
                    return false;
                }
                this.router.navigate(['/login']);
                return false;
            })
        );
    }
}
