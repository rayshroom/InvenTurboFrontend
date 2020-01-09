import { Component, OnInit, Input } from '@angular/core';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-organization-select-pane',
    templateUrl: './organization-select-pane.component.html',
    styleUrls: ['./organization-select-pane.component.scss']
})
export class OrganizationListPaneComponent implements OnInit {
    public orgs: UserOrganization[];

    constructor(public auth: AuthService, public userOrg: UserOrganizationService, private router: Router) {
        this.auth.getCurrentUser().pipe(
            flatMap(user => this.userOrg.getAllUserOrganizations(user.uid))
        ).subscribe(orglinks => {
            orglinks.forEach(org => {
                if (!org.photoURL) {
                    org.photoURL = 'assets/default-org-avatar.png';
                }
            });
            this.orgs = orglinks;
        });
    }

    ngOnInit() {}

    getOrglinkItemBackgroundCss(color) {
        const col = color ? color : 'rgb(255,255,255)' ;
        return  {
            background: `linear-gradient(90deg, ${col} 20%, rgba(255,255,255,0) 20%)`,
        };
    }

    onClickOrglinkItem(orglink) {
        this.userOrg.setCurrentOrganization(orglink);
        this.router.navigate(['/organization']);
    }
}
