import { Component, OnInit, Input } from '@angular/core';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { Router } from '@angular/router';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';

@Component({
    selector: 'app-product-detail-pane',
    templateUrl: './product-detail-pane.component.html',
    styleUrls: ['./product-detail-pane.component.scss']
})
export class ProductDetailPaneComponent implements OnInit {
    @Input()
    public product: ProductStock;

    public orgId;

    private originalPrice: number;
    public priceSavedMessage = '';
    public displaySavePriceButton = false;

    constructor(
        private router: Router,
        public orgService: UserOrganizationService,
        private psService: ProductStockService,
    ) {
        this.orgId = this.orgService.getCurrentOrganization().oid;
    }

    ngOnInit() {
        this.originalPrice = this.product.unit_price;
    }

    removeProductStock() {
        if (confirm('Are you sure you want to remove this product from your inventory?')) {
            // this.psService.removeProductStock(this.orgService.getCurrentOrganization().oid, this.product.pid)
            this.psService.hideProductStock(this.orgId, this.product.pid)
            .subscribe(() => {
                this.router.navigate(['/organization/inventory']);
            });
        }
    }

    toggleSavePriceButton(value: boolean) {
        this.priceSavedMessage = '';
        if (this.product.unit_price === this.originalPrice) {
            this.displaySavePriceButton = false;
        } else {
            this.displaySavePriceButton = value;
        }
    }

    savePrice() {
        this.toggleSavePriceButton(false);
        this.originalPrice = this.product.unit_price;
        this.priceSavedMessage = 'Updating price...';
        this.psService.updateProductStockPrice(this.orgId, this.product.pid, this.product.unit_price).subscribe(_ => {
            this.priceSavedMessage = 'New price saved!';
        });
    }
}
