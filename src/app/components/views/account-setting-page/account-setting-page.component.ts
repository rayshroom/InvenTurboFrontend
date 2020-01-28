import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Profile } from 'src/app/services/auth/uam.model';
import { flatMap } from 'rxjs/operators';
import { UserManagementService } from 'src/app/services/auth/uam.service';

@Component({
    selector: 'app-account-setting-page',
    templateUrl: './account-setting-page.component.html',
    styleUrls: ['./account-setting-page.component.scss']
})
export class AccountSettingPageComponent implements OnInit {
    public user: firebase.User;
    public profile: Profile;

    constructor(public auth: AuthService, public uam: UserManagementService) {
        this.auth.getCurrentUser().pipe(
            flatMap(curUser => {
                this.user = curUser;
                return this.uam.getOneUserProfile(curUser.uid);
            })
        ).subscribe(profile => this.profile = profile);
    }

    ngOnInit() {}
}
