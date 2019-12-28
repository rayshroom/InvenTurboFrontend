import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-user-profile-pane',
    templateUrl: './user-profile-pane.component.html',
    styleUrls: ['./user-profile-pane.component.scss']
})
export class UserProfilePaneComponent implements OnInit {
    @Input()
    public user: firebase.User;

    constructor(public auth: AuthService) {
        this.auth.getCurrentUser().subscribe(user => this.user = user);
    }

    ngOnInit() {}
}
