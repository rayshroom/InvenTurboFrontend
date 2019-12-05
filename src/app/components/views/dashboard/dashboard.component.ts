import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public user: firebase.User;
    public userOrgs: UserOrganization[];

    getOrglinkItemBackgroundCss(color) {
        const col = color ? color : 'rgb(255,255,255)' ;
        return  {
            background: `linear-gradient(90deg, ${col} 20%, rgba(255,255,255,0) 20%)`,
        };
    }

    constructor(public auth: AuthService, public userOrg: UserOrganizationService, private router: Router) {
        this.auth.getCurrentUser().pipe(
            flatMap(user => {
                this.user = user;
                return this.userOrg.getAllCurrentUserOrganizations();
            })
        ).subscribe(orglinks => {
            orglinks.forEach(org => {
                if (!org.photoURL) {
                    org.photoURL = 'assets/default-org-avatar.png';
                }
            });
            this.userOrgs = orglinks;
        });
    }

    onClickOrglinkItem(orglink) {
        this.userOrg.setCurrentOrganization(orglink);
        this.router.navigate(['/organization']);
    }

    ngOnInit() {
    }
}
