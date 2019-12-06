import { Component, OnInit } from '@angular/core';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-inventory-panel',
    templateUrl: './inventory-panel.component.html',
    styleUrls: ['./inventory-panel.component.scss']
})
export class InventoryPanelComponent implements OnInit {
    public search: FormGroup;

    public org: UserOrganization;
    public products: ProductStock[];
    public filteredProducts: ProductStock[];

    constructor(
        private fb: FormBuilder,
        private loc: Location,
        public userOrg: UserOrganizationService,
        public prodStock: ProductStockService,
    ) {
        this.search = this.fb.group({
            searchBar: ['']
        });
        this.org = this.userOrg.getCurrentOrganization();
        if (!this.org.photoURL) {
            this.org.photoURL = 'assets/default-org-avatar.png';
        }
        this.prodStock.getAllOrganizationProductStock(this.org.oid).subscribe(prod => {
            this.products = prod;
            this.filteredProducts = prod;
        });
    }

    filterItems() {
        const trimmed = this.search.get('searchBar').value.trim();
        if (trimmed !== '') {
            this.filteredProducts = this.products.filter(prod =>
                prod.name.includes(trimmed) ||
                prod.description.includes(trimmed)
            );
        } else {
            this.filteredProducts = this.products;
        }
    }

    goBack() {
        this.loc.back();
    }

    ngOnInit() {
    }
}
