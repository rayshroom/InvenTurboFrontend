import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-activity-feed-pane',
    templateUrl: './activity-feed-pane.component.html',
    styleUrls: ['./activity-feed-pane.component.scss']
})
export class ActivityFeedPaneComponent implements OnInit {
    public user: firebase.User;

    constructor(public auth: AuthService) {
        this.auth.getCurrentUser().subscribe(user => this.user = user);
    }

    ngOnInit() {}
}
