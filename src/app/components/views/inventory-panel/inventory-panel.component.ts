import { Component, OnInit, Input } from '@angular/core';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryDetailOverlayComponent } from 'src/app/components/views/inventory-detail-overlay/inventory-detail-overlay.component';

@Component({
    selector: 'app-inventory-panel',
    templateUrl: './inventory-panel.component.html',
    styleUrls: ['./inventory-panel.component.scss']
})
export class InventoryPanelComponent implements OnInit {
    public search: FormGroup;

    public products: ProductStock[];
    public filteredProducts: ProductStock[];

    constructor(
        private fb: FormBuilder,
        private loc: Location,
        public userOrg: UserOrganizationService,
        public prodStock: ProductStockService,
        private modalService: NgbModal,
    ) {
        this.search = this.fb.group({
            searchBar: ['']
        });
        const thisorg = this.userOrg.getCurrentOrganization();
        this.prodStock.getAllOrganizationProductStock(thisorg.oid).subscribe(prod => {
            this.products = prod;
            this.filteredProducts = prod;
        });
    }

    filterItems() {
        const pattern = this.search.get('searchBar').value.trim().toLowerCase();
        if (pattern !== '') {
            this.filteredProducts = this.products.filter(prod =>
                prod.name.toLowerCase().includes(pattern) ||
                prod.description.toLowerCase().includes(pattern)
            );
        } else {
            this.filteredProducts = this.products;
        }
    }

    ngOnInit() {
    }

    openDetailOverlay(product: ProductStock) {
        const modalRef = this.modalService.open(InventoryDetailOverlayComponent);
        modalRef.componentInstance.item = product;
    }
}
