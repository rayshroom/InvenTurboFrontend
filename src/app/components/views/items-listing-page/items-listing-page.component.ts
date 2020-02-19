import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from 'src/app/services/item.model';
import { ItemManagementService } from 'src/app/services/itemManagementService.service';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-items-listing-page',
    templateUrl: './items-listing-page.component.html',
    styleUrls: ['./items-listing-page.component.scss']
})
export class ItemsListingPageComponent implements OnInit {
    search: FormGroup;

    items: Item[];
    selectedItems: Item[];
    allItems: Item[];

    viewModeList = false;

    constructor(
        public auth: AuthService,
        private router: Router,
        public m: ItemManagementService,
        private activatedRoute: ActivatedRoute,
        public userOrg: UserOrganizationService,
        public prodStock: ProductStockService,
        private location: Location
    ) {
        this.items = [];

        this.selectedItems = this.m.getItems();

        const otherOrg = this.activatedRoute.snapshot.paramMap.get('oid');
        this.prodStock.getAllOrganizationProductStock(otherOrg).subscribe(prod => {
            this.items = prod.map(p => {
                return {
                    pid: p.pid,
                    oid: p.oid,
                    name: p.name,
                    description: p.description,
                    photoURL: p.photoURL,
                    unit_price: p.unit_price || 0,
                    quantity: 1,
                    total_quantity: p.total_quantity,
                    isSelected: this.selectedItems.map(tp => tp.name).includes(p.name)
                }
            });
            this.allItems = this.items;
        });

        this.search = new FormGroup({
            search: new FormControl('')
        });
    }

    ngOnInit() {}

    filterItems(partial: string) {
        this.items = this.allItems.filter(function(a) {
            return a.name.includes(partial);
        });
    }

    markSelected(item: Item) {
        if (item.isSelected) {
            item.isSelected = false;
            this.selectedItems.splice(this.selectedItems.map(p => p.name).indexOf(item.name), 1);
            console.log(this.selectedItems, item);
        } else {
            item.isSelected = true;
            this.selectedItems.push(item);
        }
    }

    toggleListView() {
        this.viewModeList = true;
    }

    toggleGridView() {
        this.viewModeList = false;
    }

    goback() {
        this.location.back();
    }

    submitItems() {
        // keep current state
        this.m.saveItems(this.selectedItems);
        // console.log(this.selectedItems);
        console.log(JSON.parse(sessionStorage.getItem('tx_other_organization')));
        this.location.back();
        // this.router.navigate(['/organization/transaction/new'], {
        //     queryParams: { key: 'add' }
        // });
    }
}
