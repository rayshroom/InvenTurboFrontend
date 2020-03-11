import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserOrganizationService } from './user-organization.service';

@Injectable({
    providedIn: 'root'
})
export class OrganizationGuard implements CanActivate {
    constructor(private router: Router, public o: UserOrganizationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.o.getCurrentOrganization()) {
            return true;
        } else {
            this.router.navigate(['/dashboard']);
            return false;
        }
    }
}
