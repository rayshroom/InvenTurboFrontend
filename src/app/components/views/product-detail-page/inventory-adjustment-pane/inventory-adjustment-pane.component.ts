import { Component, OnInit, Input } from '@angular/core';
import { LocationInventory } from 'src/app/services/product/product-stock.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
    selector: 'app-inventory-adjustment-pane',
    templateUrl: './inventory-adjustment-pane.component.html',
    styleUrls: ['./inventory-adjustment-pane.component.scss']
})
export class InventoryAdjustmentPaneComponent implements OnInit {
    @Input()
    public invLocs: LocationInventory[];

    public inventoryAdjustmentForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.inventoryAdjustmentForm = this.fb.group({
            inventories: this.fb.array([])
        });
    }

    ngOnInit() {
        const control = (this.inventoryAdjustmentForm.get('inventories') as FormArray);
        this.invLocs.forEach(loc => control.push(this.fb.group({
            location: [loc.name],
            quantity: [loc.quantity]
        })));
    }

    onInventoryAdjust() {

    }
}
