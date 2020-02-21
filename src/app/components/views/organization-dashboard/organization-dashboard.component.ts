import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionManagementService } from 'src/app/services/transaction/transaction-management.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-organization-dashboard-view',
    templateUrl: './organization-dashboard.component.html',
    styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit, AfterContentChecked {
    user: firebase.User;
    org: UserOrganization;
    transactions: any[] = [];
    filteredTransactions: Object[] = [];
    lastTransactionTime: Date;
    filters = [
        {
            id: 'all',
            label: 'All Transactions'
        },
        {
            id: 'my',
            label: 'My Transactions'
        },
        {
            id: 'range',
            label: 'Transactions within a date range...'
        },
        {
            id: 'incoming',
            label: 'Incoming Transactions'
        },
        {
            id: 'outgoing',
            label: 'Outgoing Transactions'
        },
        {
            id: 'pending',
            label: 'Pending Transactions'
        },
        {
            id: 'requested',
            label: 'Requested Transactions'
        },
        {
            id: 'shipped',
            label: 'Shipped Transactions'
        },
        {
            id: 'completed',
            label: 'Completed Transactions'
        },
        {
            id: 'declined',
            label: 'Declined Transactions'
        }
    ];

    timePeriods = [
        {
            label: 'minutes ago',
            value: 1
        },
        {
            label: 'hours ago',
            value: 60
        },
        {
            label: 'days ago',
            value: 1440
        },
        {
            label: 'weeks ago',
            value: 10080
        },
        {
            label: 'months ago',
            value: 43200
        },
        {
            label: 'years ago',
            value: 525600
        }
    ];

    filterType: string = this.filters[0].id;
    filterDateStart: number = 0;
    filterDateEnd: number = 12;
    filterTimePeriod: number = 60;

    shouldDisplay(transaction) {
        if (this.filterType === 'all') {
            return true;
        } else if (this.filterType === 'my' && transaction.currentUser) {
            return transaction.currentUser.displayName === this.user.displayName;
        } else if (this.filterType === 'range') {
            const upperBound = new Date(new Date().getTime() - this.filterDateStart * Number(this.filterTimePeriod) * 60 * 1000);
            const lowerBound = new Date(new Date().getTime() - this.filterDateEnd   * Number(this.filterTimePeriod) * 60 * 1000);

            if (this.filterDateStart > this.filterDateEnd) {
                this.filterDateEnd = this.filterDateStart;
            }

            return transaction.timeDate.getTime() <= upperBound.getTime()
                && transaction.timeDate.getTime() >= lowerBound.getTime();
        } else {
            return this.filterType === transaction.transactionType.toLowerCase() || this.filterType === transaction.status.toLowerCase() ;
        }
    }

    filterTransactions() {
        this.filteredTransactions = [];
        this.transactions.forEach(t => {
            if (this.shouldDisplay(t)) {
                this.filteredTransactions.push(t);
            }
        })
    }

    getProfileLink(uid) {
        return `${environment.api}${environment.routes.getOneProfile(uid)}`;
    }

    getTransactionItemBackgroundCss(color) {
        const col = color ? color : 'rgb(255,255,255)' ;
        return  {
            background: `linear-gradient(90deg, ${col} 16.5%, rgba(255,255,255,0) 16.5%)`};
    }

    constructor(
        public auth: AuthService,
        public userOrg: UserOrganizationService,
        public tms: TransactionManagementService,
        public cdref: ChangeDetectorRef
    ) {
        this.auth.getCurrentUser().subscribe(async user => {
            this.user = user;
            this.org = this.userOrg.getCurrentOrganization();
            if (!this.org.photoURL) {
                this.org.photoURL = 'assets/default-org-avatar.png';
            }
            this.tms.getAllOrganizationTransactions(this.org.oid).subscribe(transactions => {
                transactions.forEach(transaction => {
                    const timestamp = Date.parse(transaction.stringTime);
                    const transactionDate = !isNaN(timestamp) ? new Date(timestamp) : new Date();
                    const transactionType = transaction.oid_dest != this.org.oid ? 'Incoming' : 'Outgoing';
                    this.transactions.push({timeDate: transactionDate, transactionType, ...transaction});
                });
                this.lastTransactionTime = this.transactions.length > 0 ?
                this.transactions[this.transactions.length - 1].timeDate : null;
            });
        });
    }

    ngOnInit() {
    }

    ngAfterContentChecked() {
        this.cdref.detectChanges();
        this.filterTransactions();
    }
}
