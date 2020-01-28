import { Component, OnInit, Input } from '@angular/core';
import {
    LocationInventory,
    ProductStock
} from 'src/app/services/product/product-stock.model';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { Location } from '@angular/common';

@Component({
    selector: 'app-inventory-adjustment-pane',
    templateUrl: './inventory-adjustment-pane.component.html',
    styleUrls: ['./inventory-adjustment-pane.component.scss']
})
export class InventoryAdjustmentPaneComponent implements OnInit {
    @Input()
    public product: ProductStock;
    public inventoryByLocations: LocationInventory[];

    public inventoryAdjustmentForm: FormGroup;
    public submitBtnMessage = 'Save inventory adjustment';
    public submitBtnClasses = [
        'font-weight-bold',
        'btn',
        'btn-block',
        'btn-lg',
        'btn-danger'
    ];

    public currentOrg: UserOrganization;

    constructor(
        private fb: FormBuilder,
        private loc: Location,
        public orgSerivce: UserOrganizationService,
        public psService: ProductStockService
    ) {
        this.inventoryAdjustmentForm = this.fb.group({
            inventories: this.fb.array([])
        });
        this.currentOrg = this.orgSerivce.getCurrentOrganization();
    }

    ngOnInit() {
        const control = this.inventoryAdjustmentForm.get(
            'inventories'
        ) as FormArray;
        this.inventoryByLocations = this.product.inventoryByLocation;
        this.inventoryByLocations.forEach(location =>
            control.push(
                this.fb.group({
                    locid: [location.locid],
                    name: [location.name],
                    quantity: [location.quantity],
                    changedValue: [0]
                })
            )
        );
    }

    incrementQuantity(invLoc: FormControl) {
        const curValue = invLoc.get('quantity').value;
        invLoc.get('quantity').setValue(curValue + 1);
        const curChangedValue = invLoc.get('changedValue').value;
        invLoc.get('changedValue').setValue(curChangedValue + 1);
    }

    decrementQuantity(invLoc: FormControl) {
        const curValue = invLoc.get('quantity').value;
        if (curValue > 0) {
            invLoc.get('quantity').setValue(curValue - 1);
            const curChangedValue = invLoc.get('changedValue').value;
            invLoc.get('changedValue').setValue(curChangedValue - 1);
        }
    }

    onChangeQuantity(event, invLoc: FormControl, index: number) {
        const newVal = invLoc.get('quantity').value;
        const oldVal = this.inventoryByLocations[index].quantity;
        if (newVal > 0) {
            invLoc.get('changedValue').setValue(newVal - oldVal);
        } else {
            invLoc.get('quantity').setValue(oldVal);
            invLoc.get('changedValue').setValue(0);
        }
    }

    onInventoryAdjust() {
        this.submitBtnMessage = 'Saving...';
        this.submitBtnClasses[4] = 'btn-warning';
        const newInventoryData = this.inventoryAdjustmentForm.value.inventories.map(
            loc => ({ locid: loc.locid, quantity: loc.quantity })
        );
        this.psService
            .updateOneProductStock(
                this.currentOrg.oid,
                this.product.pid,
                newInventoryData
            )
            .subscribe(result => {
                this.submitBtnMessage = 'Inventory updated!';
                this.submitBtnClasses[4] = 'btn-success';
                setTimeout(() => this.loc.back(), 1500);
            });
    }
}
