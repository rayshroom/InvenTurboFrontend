import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/services/auth/uam.model';

@Component({
    selector: 'app-profile-summary-pane',
    templateUrl: './profile-summary-pane.component.html',
    styleUrls: ['./profile-summary-pane.component.scss']
})
export class ProfileSummaryPaneComponent implements OnInit {
    @Input()
    public user: firebase.User;

    @Input()
    public profile: Profile;

    public profileImage = {
        classes: [' ', 'profile-photo', 'w-100']
    };

    constructor() {
    }

    ngOnInit() {}

    darkenProfileImage() {
        this.profileImage.classes[0] = 'darken';
    }

    brightenProfileImage() {
        this.profileImage.classes[0] = ' ';
    }
}
