import { Component, OnInit, Input } from '@angular/core';
import { ProductStock } from 'src/app/services/product/product-stock.model';

@Component({
    selector: 'app-product-detail-pane',
    templateUrl: './product-detail-pane.component.html',
    styleUrls: ['./product-detail-pane.component.scss']
})
export class ProductDetailPaneComponent implements OnInit {
    @Input()
    public product: ProductStock;

    constructor() {}

    ngOnInit() {}
}
