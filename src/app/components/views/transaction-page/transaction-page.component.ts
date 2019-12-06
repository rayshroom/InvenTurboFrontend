import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/services/item.model';
import { ItemManagementService } from 'src/app/services/itemManagementService.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';

@Component({
    selector: 'app-transaction-page',
    templateUrl: './transaction-page.component.html',
    styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {
    @Input() viewType: string;

    orgCurrent: UserOrganization;
    orgOther: UserOrganization[] = [];
    items: Item[] = [];
    taxRate = 0.13;
    fromCurrent = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public auth: AuthService,
        public userOrg: UserOrganizationService,
        public m: ItemManagementService
    ) {
        this.orgCurrent = this.userOrg.getCurrentOrganization();
        this.userOrg.getAllOrganizations().subscribe(orgs => {
            this.orgOther = orgs.filter(o => o.oid !== this.orgCurrent.oid);
        });
        this.activatedRoute.queryParams.subscribe(params => {
            if (params.key === 'add') {
                this.items = this.m.getItems(params.key);
            }
        });
    }

    ngOnInit() {
    }

    getTotalItems() {
        return this.items.length > 0 ? this.items.map(a => a.quantity).reduce((a, b) => a + b) : 0;
    }

    getSubtotal() {
        return this.items.length > 0 ? this.items.map(a => a.quantity * a.unitPrice).reduce((a, b) => a + b) : 0;
    }

    getTotalPrice() {
        return (1 + this.taxRate) * this.getSubtotal();
    }

    goback() {
        this.router.navigate(['/organization']);
    }

    submitItems() {
        // keep current state
        this.router.navigate(['/organization']);
    }

    selectItems() {
        this.router.navigate(['/organization/transaction/items/add']);
    }
}
