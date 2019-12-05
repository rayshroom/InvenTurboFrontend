import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionManagementService } from 'src/app/services/transaction/transaction-management.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';

@Component({
    selector: 'app-organization-dashboard-view',
    templateUrl: './organization-dashboard.component.html',
    styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {
    user: firebase.User;
    org: UserOrganization;
    transactions: {tid: string, status: string, datetime: Date}[];
    lastTransactionTime: Date;

    constructor(
        public auth: AuthService,
        public userOrg: UserOrganizationService,
        public m: TransactionManagementService,
    ) {
        this.auth.getCurrentUser().subscribe(user => {
            this.user = user;
            this.org = this.userOrg.getCurrentOrganization();
            if (!this.org.photoURL) {
                this.org.photoURL = 'assets/default-org-avatar.png';
            }
        });

        // this.m.getAllOrganizationTransactions(this.org.oid).subscribe(transactions => this.transactions = transactions);
        this.transactions = [
            {
                tid: '20020',
                status: 'Order fulfilled',
                datetime: new Date()
            },
            {
                tid: '20021',
                status: 'Order fulfilled',
                datetime: new Date()
            },
            {
                tid: '20022',
                status: 'Order fulfilled',
                datetime: new Date()
            },
            {
                tid: '20023',
                status: 'Order fulfilled',
                datetime: new Date()
            },
        ];

        this.lastTransactionTime = this.transactions[this.transactions.length - 1].datetime;
    }

    ngOnInit() {
    }
}
