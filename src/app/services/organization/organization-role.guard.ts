import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserOrganizationService } from './user-organization.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationRoleGuard implements CanActivate {
    constructor(private router: Router, public o: UserOrganizationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const currentOrg = this.o.getCurrentOrganization();
    const requiredClaims = next.data.requiredClaims as Array<string>;
    for (const reqClaim of requiredClaims) {
        if (!currentOrg.claims[reqClaim]) {
            this.router.navigate(['/organization']);
            return false;
        }
    }
    return true;
  }

}
