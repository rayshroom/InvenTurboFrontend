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
    transactions: {tid: string, status: string, timeDate: Date}[];
    lastTransactionTime: Date;

    getTransactionItemBackgroundCss(color) {
        const col = color ? color : 'rgb(255,255,255)' ;
        return  {
            background: `linear-gradient(90deg, ${col} 12.5%, rgba(255,255,255,0) 12.5%)`,
            'padding-left': '3%'
        };
    }

    constructor(
        public auth: AuthService,
        public userOrg: UserOrganizationService,
        public tms: TransactionManagementService,
    ) {
        this.auth.getCurrentUser().subscribe(async user => {
            this.user = user;
            let org = this.userOrg.getCurrentOrganization();
            this.org = org;
            if (!this.org.photoURL) {
                this.org.photoURL = 'assets/default-org-avatar.png';
            }

            this.tms.getAllOrganizationTransactions(this.org.oid).subscribe(transactions => {
                transactions.forEach(transaction => {
                    let transactionDate: Date;
                    try {
                        transactionDate = new Date(transaction.datetime);
                    }
                    catch(err) {
                        transactionDate = new Date();
                    }
                    this.transactions.push({timeDate: transactionDate, ...transaction});
                });
                this.lastTransactionTime = this.transactions[this.transactions.length - 1].timeDate;
            });
        });
    }

    ngOnInit() {
    }
}
