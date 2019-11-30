import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionManagementService } from 'src/app/services/transaction-management.service'

@Component({
    selector: 'app-organization-dashboard-view',
    templateUrl: './organization-dashboard.component.html',
    styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {
    user: {displayName: string, email: string, photoURL?: string};
    ol: {position: string};
    org: {name: string, photoURL?: string};
    transactions: {tid: string, status: string, datetime: Date}[];
    lastTransactionTime: Date;

    constructor(
        public auth: AuthService,
        public m: TransactionManagementService,
    ) {
        this.user = auth.getCurrentUser();
        if (!this.user.photoURL) {
            this.user.photoURL = "../../../../assets/default-avatar.png";
        }

        // this.ol = this.auth.getCurrentOrganizationLink();
        this.ol = { position: "Inventory Manager" };

        // this.org = this.auth.getCurrentOrganization();
        this.org = { name: "Your company inc." };
        if (!this.org.photoURL) {
            this.org.photoURL = "../../../../assets/default-org-avatar.png";
        }

        // this.m.getAllOrganizationTransactions(this.ol.oid).subscribe(transactions => this.transactions = transactions);
        this.transactions = [
            {
                tid: "20020",
                status: "Order fulfilled",
                datetime: new Date()
            },
            {
                tid: "20021",
                status: "Order fulfilled",
                datetime: new Date()
            },
            {
                tid: "20022",
                status: "Order fulfilled",
                datetime: new Date()
            },
            {
                tid: "20023",
                status: "Order fulfilled",
                datetime: new Date()
            },
        ];

        this.lastTransactionTime = this.transactions[this.transactions.length - 1].datetime;
    }

    ngOnInit() {}
}
