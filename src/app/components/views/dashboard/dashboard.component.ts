import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public user: firebase.User;

    constructor(public auth: AuthService) {
        this.auth.getCurrentUser().subscribe(user => {
            this.user = user;
        });
    }

    ngOnInit() {
    }
}
