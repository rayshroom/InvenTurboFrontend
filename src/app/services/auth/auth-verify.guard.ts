import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthVerifyGuard implements CanActivate {
    constructor(public auth: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.auth.getCurrentUser().pipe(
            mergeMap(user => {
                if (user) {
                    if (user.emailVerified) {
                        return of(true);
                    }
                    return from(user.reload().then(() => {
                        if (user.emailVerified) {
                            return true;
                        }
                        this.router.navigate(['/welcome']);
                        return false;
                    }));
                } else {
                    this.router.navigate(['/login']);
                    return of(false);
                }
            }
        ));
    }
}
