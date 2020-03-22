import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FileStorageService } from 'src/app/services/storage/file-storage.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { flatMap } from 'rxjs/operators';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-new-product-pane',
    templateUrl: './create-new-product-pane.component.html',
    styleUrls: ['./create-new-product-pane.component.scss']
})
export class CreateNewProductPaneComponent implements OnInit {
    public addForm: FormGroup;

    public localProductImage: {
        file: File;
        url: SafeResourceUrl;
        filename: string;
    } = { file: null, url: null, filename: null };

    public submitBtn = {
        classes: ['btn-danger', 'btn', 'btn-block'],
        message: 'Create and Continue',
        disabled: false,
    }

    constructor(
        private router: Router,
        private fb: FormBuilder,
        public userOrg: UserOrganizationService,
        public fs: FileStorageService,
        public prodService: ProductService,
        public prodStockService: ProductStockService,
    ) {
        this.addForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            image: ['', Validators.required],
            unit_price: ['']
        });
    }

    loadImage(file: File) {
        this.localProductImage.file = file;
        this.localProductImage.url = this.fs.getSanitizedLocalUrl(file);
        this.localProductImage.filename = file.name;
    }

    onSubmit() {
        this.submitBtn.classes[0] = 'btn-warning';
        this.submitBtn.message = 'Uploading product image...';
        this.submitBtn.disabled = true;

        const file = this.localProductImage.file;
        let newProduct;
        this.fs.uploadFile(file, '/images/products/').pipe(
            flatMap(url => {
                const { name, description, unit_price } = this.addForm.value;
                newProduct = { name, description, unit_price, photoURL: url};
                this.submitBtn.message = 'Creating new product...';
                return this.prodService.addNewProduct(newProduct);
            }),
            flatMap(({ data }) => {
                newProduct.pid = data.pid;
                const oid = this.userOrg.getCurrentOrganization().oid;
                this.submitBtn.message = 'Adding new product to your organization...';
                return this.prodStockService.addOneOrganizationProductStock(oid, data.pid);
            }),
        ).subscribe(() => {
            this.submitBtn.message = 'Success!';
            this.submitBtn.classes[0] = 'btn-success';
            setTimeout(() => {
                this.router.navigate(['/organization/inventory/', newProduct.pid]);
            }, 1500);
        });
    }

    ngOnInit() {}
}
