import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TransactionManagementService } from 'src/app/services/transaction-management.service'

import { OrganizationLink } from 'src/app/services/organization-link.model';
import { Transaction } from 'src/app/services/transaction.model';

@Component({
    selector: 'app-organization-dashboard-view',
    templateUrl: './organization-dashboard.component.html',
    styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {
    ol: OrganizationLink;
    transactions: Transaction[];

    constructor(
        public auth: AuthService,
        public m: TransactionManagementService,
    ) {
        this.ol = this.auth.getCurrentOrganizationLink(); // not yet unimplemented
    }

    ngOnInit() {
        this.m.getAllOrganizationTransactions(this.ol.oid).subscribe(transactions => this.transactions = transactions);
    }
}
