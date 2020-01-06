import { Component, OnInit } from '@angular/core';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';

@Component({
    selector: 'app-product-detail-page',
    templateUrl: './product-detail-page.component.html',
    styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
    public product: ProductStock;

    constructor(
        public orgSer: UserOrganizationService,
        public psService: ProductStockService,
        private curRoute: ActivatedRoute
    ) {
        const curOrg = this.orgSer.getCurrentOrganization();
        this.curRoute.params.pipe(
            flatMap(params => this.psService.getOneProductStock(curOrg.oid, params.pid))
        ).subscribe(prod => this.product = prod);
    }

    ngOnInit() {}
}
