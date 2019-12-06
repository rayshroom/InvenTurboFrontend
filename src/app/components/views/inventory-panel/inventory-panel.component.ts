import { Component, OnInit } from '@angular/core';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-inventory-panel',
    templateUrl: './inventory-panel.component.html',
    styleUrls: ['./inventory-panel.component.scss']
})
export class InventoryPanelComponent implements OnInit {
    public org: UserOrganization;
    public products: ProductStock[];

    constructor(
        private loc: Location,
        public userOrg: UserOrganizationService,
        public prodStock: ProductStockService,
    ) {
        this.org = this.userOrg.getCurrentOrganization();
        if (!this.org.photoURL) {
            this.org.photoURL = 'assets/default-org-avatar.png';
        }
        this.prodStock.getAllOrganizationProductStock(this.org.oid).subscribe(prod => {
            this.products = prod;
            console.log(this.products);
        });
    }

    goBack() {
        this.loc.back();
    }

    ngOnInit() {
    }
}
