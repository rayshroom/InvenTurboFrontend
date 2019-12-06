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
    transactions: {tid: string, status: string, timeDate: Date, transactionType: string, oid_source: string, oid_dest: string}[];
    lastTransactionTime: Date;

    getTransactionItemBackgroundCss(color) {
        const col = color ? color : 'rgb(255,255,255)' ;
        return  {
            background: `linear-gradient(90deg, ${col} 16.5%, rgba(255,255,255,0) 16.5%)`};
    }

    constructor(
        public auth: AuthService,
        public userOrg: UserOrganizationService,
        public tms: TransactionManagementService,
    ) {
        this.auth.getCurrentUser().subscribe(async user => {
            this.user = user;
            const org = this.userOrg.getCurrentOrganization();
            this.org = org;
            this.transactions = [];
            if (!this.org.photoURL) {
                this.org.photoURL = 'assets/default-org-avatar.png';
            }
            this.tms.getAllOrganizationTransactions(this.org.oid).subscribe(transactions => {
                transactions.forEach(transaction => {
                    console.log(transaction);
                    const timestamp = Date.parse(transaction.stringTime);
                    const transactionDate = !isNaN(timestamp) ? new Date(timestamp) : new Date();

                    const transactionType = (transaction.oid_dest === this.org.oid) ? 'Incoming' : 'Outgoing';

                    this.transactions.push({timeDate: transactionDate, transactionType, ...transaction});
                });
                this.lastTransactionTime = this.transactions[this.transactions.length - 1].timeDate;
            });
        });
    }

    ngOnInit() {
    }
}
