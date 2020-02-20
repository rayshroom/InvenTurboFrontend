import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
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
export class OrganizationDashboardComponent implements OnInit {
    user: firebase.User;
    org: UserOrganization;
    transactions: any = [];
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
            id: 'pending',
            label: 'Pending Transactions'
        },
        {
            id: 'requested',
            label: 'Requested Transactions'
        },
        {
            id: 'done',
            label: 'Completed Transactions'
        }

    ]
    filterType: string = this.filters[0].id;
    filterDateStart: any;
    filterDateEnd: any;

    shouldDisplay(transaction) {
        this.filterDateStart = this.filterDateEnd = null;

        if (this.filterType == 'all') {
            return true;
        }
        else if (this.filterType == 'my') {
            if (transaction.currentUser)
                return transaction.currentUser.displayName == this.user.displayName;
        }
        else if (this.filterType == 'range') {
            if (!this.filterDateStart || !this.filterDateEnd) {
                return true;
            }
            else {
                var s, e;
                s = new Date(this.filterDateStart)
                e = new Date(this.filterDateEnd)
                console.log(Date.now() >= s && Date.now() <= e)
                if (Date.now() >= s && Date.now() <= e) {
                    return true;
                }
            }
        }
        else if (this.filterType == 'pending') {
            return transaction.status.toLowerCase() == 'pending';
        }
        else if (this.filterType == 'requested') {
            return transaction.status.toLowerCase() == 'requested';
        }
        else if (this.filterType == 'done') {
            return transaction.status.toLowerCase() == 'done';
        }

        return false;
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
        private _changeDetectionRef : ChangeDetectorRef
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
                this.lastTransactionTime = this.transactions.length > 0 ?
                    this.transactions[this.transactions.length - 1].timeDate : null;
            });
        });
    }

    ngOnInit() {
    }

    // ngAfterViewChecked() : void {
    //     this._changeDetectionRef.detectChanges();
    // }
}
