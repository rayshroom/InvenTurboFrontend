import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/services/product/product.model';

@Component({
    selector: 'app-product-item-card',
    templateUrl: './product-item-card.component.html',
    styleUrls: ['./product-item-card.component.scss']
})
export class ProductItemCardComponent implements OnInit {
    @Input()
    public product: Product;

    @Input()
    public existed: boolean;

    @Input()
    public filtered: boolean;

    @Input()
    public hidden: boolean;

    @Input()
    public selected: boolean;

    constructor() {}

    ngOnInit() {}
}
