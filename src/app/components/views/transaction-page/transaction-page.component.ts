import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from 'src/app/services/item.model';
import { TxProduct } from 'src/app/services/transaction/transaction-management.model';
import { ItemManagementService } from 'src/app/services/itemManagementService.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { environment } from 'src/environments/environment';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionManagementService } from 'src/app/services/transaction/transaction-management.service';
import { InventoryDetailOverlayComponent } from 'src/app/components/views/inventory-detail-overlay/inventory-detail-overlay.component';

@Component({
    selector: 'app-transaction-page',
    templateUrl: './transaction-page.component.html',
    styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {

    orgCurrent: UserOrganization;
    orgOther: UserOrganization[] = [];
    currentPartner: UserOrganization;
    items: Item[] = [];
    items_existing: TxProduct[] = [];
    taxRate = 0.13;
    fromCurrent = true;
    showSelectionMenu = false;
    viewTxId: string;
    openMode = "new";
    thisTx: any;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public auth: AuthService,
        public userOrg: UserOrganizationService,
        public m: ItemManagementService,
        public tms: TransactionManagementService,
        private modalService: NgbModal
    ) {
        this.orgCurrent = this.userOrg.getCurrentOrganization();
        this.userOrg.getAllOrganizations().subscribe(orgs => {
            this.orgOther = orgs.filter(o => o.oid !== this.orgCurrent.oid);
            if (this.tms.getOtherOrganization() == null) {
                this.currentPartner = this.orgOther[0];
                this.tms.setOtherOrganization(this.currentPartner);
            } else {
                this.currentPartner = this.tms.getOtherOrganization();
            }
        });
        this.viewTxId = this.activatedRoute.snapshot.paramMap.get('txid');

        this.items = this.m.getItems();
        this.items_existing = this.m.getItemsExisting();

        if (this.viewTxId) {
            this.tms.getOneTransaction(this.viewTxId).subscribe(tx => {
                this.thisTx = tx;
                this.openMode = tx.status;
                console.log(tx.items);
                if (this.items_existing.length == 0) {
                    this.items_existing = tx.items.map(t => {
                        return {
                            ...t,
                            unit_price: t.unit_price || 0
                        }
                    });
                    this.m.saveItemsExisting(this.items_existing);
                }
                this.tms.setOtherOrganization(this.orgOther.find(o => o.oid == tx.oid_source));
                this.currentPartner = this.orgOther.find(o => o.oid == tx.oid_source);
            });

        } else {


            // this.items = this.m.getItems(params.key || params.txid || this.orgCurrent.oid);
            // this.activatedRoute.queryParams.subscribe(params => {
            //     this.tms.getOneTransaction(params.txid).subscribe(transaction => {
            //         // orgCurrent = getOrganization(transaction.oid_dest);
            //         // orgOther = [getOrganization(transaction.oid_source)];
            //         // items still need to be added to transaction, then items = transaction.item
            //     })
            // });

        }

        console.log(this.viewTxId, this.openMode);

    }

    ngOnInit() {
    }

    setCurrentPartner(org) {
        this.tms.setOtherOrganization(org);
        this.currentPartner = this.tms.getOtherOrganization();
        this.showSelectionMenu = false;
    }

    getTotalItems() {
        return (this.items.length > 0 ? this.items.map(a => a.quantity).reduce((a, b) => a + b) : 0)
            +
            (this.items_existing.length > 0 ? this.items_existing.map(a => a.quantity).reduce((a, b) => a + b) : 0);
    }

    getSubtotal() {
        return ((this.items.length > 0 ? this.items.map(a => a.quantity * a.unit_price).reduce((a, b) => a + b) : 0)
        +
        (this.items_existing.length > 0 ? this.items_existing.map(a => a.quantity * a.unit_price).reduce((a, b) => a + b) : 0));
    }

    getTotalPrice() {
        return (1 + this.taxRate) * this.getSubtotal();
    }

    setCorrectValue(item: Item) {
        console.log(item);
    }

    goback() {
        this.m.saveItems([]);
        this.m.saveItemsExisting([]);
        this.tms.setOtherOrganization(null);
        this.router.navigate(['/organization']);
    }

    submitItems() {
        this.tms.submitSimpleTransaction({
            status: "Submitted",
            stringTime: (new Date()).toString(),
            oid_source: this.tms.getOtherOrganization().oid,
            oid_dest: this.orgCurrent.oid,
            items: this.m.getItems()
        }).subscribe(ref => {
            this.m.saveItems([]);
            this.m.saveItemsExisting([]);
            this.tms.setOtherOrganization(null);
            this.router.navigate(['/organization']);
        });
    }

    mergeItems() {
        const it = this.m.getItems();
        const ite = this.m.getItemsExisting();
        const iteid = ite.map(p => p.pid);
        for(var i = 0; i < it.length; i++) {
            if (iteid.includes(it[i].pid)) {
                ite[iteid.indexOf(it[i].pid)].quantity += it[i].quantity;
            } else {
                ite.push(it[i]);
            }
        }
        return ite;
    }

    saveOrder() {
        this.m.saveItems(this.items);
        this.m.saveItemsExisting(this.items_existing);
        const items = this.mergeItems();
        this.m.saveItems([]);
        this.m.saveItemsExisting([]);
        this.tms.setOtherOrganization(null);
        this.tms.updateTransaction(this.viewTxId, items)
            .subscribe(ref => {
                this.router.navigate(['/organization']);
            })
    }

    orderTransaction() {
        this.m.saveItems(this.items);
        this.m.saveItemsExisting(this.items_existing);
        const items = this.mergeItems();
        this.m.saveItems([]);
        this.m.saveItemsExisting([]);
        this.tms.setOtherOrganization(null);
        this.tms.orderTransaction(this.viewTxId, items)
          .subscribe(ref => {
              this.router.navigate(['/organization']);
          })
    }

    selectItems() {
        this.m.saveItemsExisting(this.items_existing);
        this.m.saveItems(this.items);
        this.router.navigate([`/organization/transaction/items/add/${this.currentPartner.oid}`]);
    }

    removeItemExisting(item: TxProduct) {
        for(var i = 0; i < this.items_existing.length; i++) {
            if (this.items_existing[i].name == item.name) {
                this.items_existing.splice(i, 1);
                break;
            }
        }
    }

    removeItem(item: TxProduct) {
        for(var i = 0; i < this.items.length; i++) {
            if (this.items[i].name == item.name) {
                this.items.splice(i, 1);
                break;
            }
        }
        this.m.saveItems(this.items);
    }

    openDetailOverlay(product: ProductStock) {
        const modalRef = this.modalService.open(InventoryDetailOverlayComponent);
        modalRef.componentInstance.item = product;
        console.log(product);
    }

}
