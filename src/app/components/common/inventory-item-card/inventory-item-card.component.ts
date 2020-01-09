import { Component, OnInit, Input } from '@angular/core';
import { ProductStock } from 'src/app/services/product/product-stock.model';

@Component({
    selector: 'app-inventory-item-card',
    templateUrl: './inventory-item-card.component.html',
    styleUrls: ['./inventory-item-card.component.scss']
})
export class InventoryItemCardComponent implements OnInit {
    @Input()
    public productItem: ProductStock;

    constructor() {}

    ngOnInit() {}
}
