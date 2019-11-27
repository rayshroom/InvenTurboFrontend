import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    user: {displayName: string, email: string, photoURL?: string};

    constructor(public auth: AuthService) {
        this.user = auth.getCurrentUser();
    }

    ngOnInit() {}
}
