import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/services/product/product.model';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { flatMap } from 'rxjs/operators';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';

class ProductItem {
    constructor(prod: Product) {
        this.product = prod;
    }

    existed = false;
    selected = false;
    filtered = true;
    product: Product;
};

@Component({
    selector: 'app-add-existing-product-pane',
    templateUrl: './add-existing-product-pane.component.html',
    styleUrls: ['./add-existing-product-pane.component.scss']
})
export class AddExistingProductPaneComponent implements OnInit {
    public searchForm: FormGroup;
    public submitButton = {
        classes: ['btn-danger', 'btn', 'btn-block'],
        message: 'Continue',
        disabled: false,
    };

    public productItems: ProductItem[];
    public selectedItem: ProductItem;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        public prodService: ProductService,
        public userOrg: UserOrganizationService,
        public prodStockService: ProductStockService,
    ) {
        this.searchForm = this.fb.group({
            searchBar: ['']
        });
        this.prodService.getAllProducts().pipe(
            flatMap(items => {
                this.productItems = items.map(p => new ProductItem(p));
                return this.prodStockService.getAllOrganizationProductStock(this.userOrg.getCurrentOrganization().oid);
            })
        ).subscribe(invItems => {
            this.productItems.forEach(prodItem => {
                if (invItems.some(invItem => invItem.pid === prodItem.product.pid)) {
                    prodItem.existed = true;
                }
            });
        });
    }

    filterItems() {
        const value = this.searchForm.value.searchBar.trim().toLowerCase();
        if (value !== '') {
            this.productItems.forEach(item => {
                if (item.product.name.toLowerCase().includes(value) ||
                    item.product.description.toLowerCase().includes(value)) {
                    item.filtered = true;
                } else {
                    item.filtered = false;
                }
            });
        } else {
           this.productItems.forEach(item => item.filtered = true);
        }
    }

    chooseItem(item: ProductItem) {
        if (!item.existed) {
            if (this.selectedItem !== item) {
                item.selected = true;
                if (this.selectedItem) {
                    this.selectedItem.selected = false;
                }
                this.selectedItem = item;
            } else {
                item.selected = false;
                this.selectedItem = null;
            }
        }
    }

    onAddProductStock() {
        const oid = this.userOrg.getCurrentOrganization().oid;
        const pid = this.selectedItem.product.pid;

        this.submitButton.classes[0] = 'btn-warning';
        this.submitButton.message = 'Adding selected product...';
        this.submitButton.disabled = true;
        this.prodStockService.addOneOrganizationProductStock(oid, pid).subscribe(() => {
            this.submitButton.classes[0] = 'btn-success';
            this.submitButton.message = 'Success!';
            setTimeout(() => this.router.navigate(['/organization/inventory', pid]), 1500)
        }, err => {

        });
    }

    ngOnInit() {}
}
