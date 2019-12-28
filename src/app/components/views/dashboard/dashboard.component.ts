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

    constructor() {
    }

    ngOnInit() {
    }
}
