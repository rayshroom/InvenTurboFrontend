import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Item } from 'src/app/services/item.model';
import { TxProduct, TxProductShippingConfig } from 'src/app/services/transaction/transaction-management.model';
import { ItemManagementService } from 'src/app/services/itemManagementService.service';
import { UserOrganization } from 'src/app/services/organization/user-organization.model';
import { UserOrganizationService } from 'src/app/services/organization/user-organization.service';
import { environment } from 'src/environments/environment';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionManagementService } from 'src/app/services/transaction/transaction-management.service';
import { InventoryDetailOverlayComponent } from 'src/app/components/views/inventory-detail-overlay/inventory-detail-overlay.component';
import { ProductStock } from 'src/app/services/product/product-stock.model';
import { ProductStockService } from 'src/app/services/product/product-stock.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'app-transaction-page',
    templateUrl: './transaction-page.component.html',
    styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit, OnDestroy {

    orgCurrent: UserOrganization;
    orgOther: UserOrganization[] = [];
    currentPartner: UserOrganization;
    items: Item[] = [];
    items_existing: TxProduct[] = [];
    items_shipping: TxProductShippingConfig[] = [];
    taxRate = 0.13;
    fromCurrent = true;
    showSelectionMenu = false;
    viewTxId: string;
    openMode = 'pending';
    thisTx: any;
    errorMessage: string;
    shippingForm: FormGroup;
    currentUser: any;

    deadTx = false;

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
        public psService: ProductStockService,
        private modalService: NgbModal
    ) {
        this.orgCurrent = this.userOrg.getCurrentOrganization();
    }

    ngOnInit() {
        this.auth.getCurrentUser().subscribe(user => {
            this.currentUser = user;
            this.userOrg.getAllOrganizations().subscribe(orgs => {
                this.orgOther = orgs.filter(o => o.oid !== this.orgCurrent.oid);
                this.viewTxId = this.activatedRoute.snapshot.paramMap.get('txid');
                this.currentPartner = (this.tms.getOtherOrganization() === null ? this.orgOther[0] : this.tms.getOtherOrganization());
                this.tms.setOtherOrganization(this.currentPartner);

                this.errorMessage = '';

                this.items = this.m.getItems();
                this.items_existing = this.m.getItemsExisting();
                if (this.viewTxId) {
                    this.tms.getOneTransaction(this.viewTxId).subscribe(tx => {
                        this.thisTx = tx;
                        this.openMode = tx.status;
                        if (this.items_existing.length == 0) {
                            this.items_existing = tx.items;
                            this.items_existing.sort((a, b) => a.pid > b.pid ? 1 : -1);
                            this.m.saveItemsExisting(this.items_existing);

                        }

                        if (tx.oid_source === this.orgCurrent.oid) {
                            this.tms.setOtherOrganization(this.orgOther.find(o => o.oid === tx.oid_dest));
                            this.currentPartner = this.tms.getOtherOrganization();
                            this.fromCurrent = true;
                            of(...this.items_existing).pipe(
                                flatMap(item => this.psService.getOneProductStock(tx.oid_source, item.pid))
                            ).subscribe(prod => {
                                this.items_shipping.push({
                                    pid: prod.pid,
                                    collapse: true,
                                    location: prod.inventoryByLocation.map(l => l.name),
                                    location_id: prod.inventoryByLocation.map(l => l.locid),
                                    maxcount: prod.inventoryByLocation.map(l => l.quantity),
                                    count: Array(prod.inventoryByLocation.length).fill(0)
                                });
                            }, err => console.log(err),
                            () => {
                                this.items_shipping.sort((a, b) => a.pid > b.pid ? 1 : -1);
                            });
                        } else {
                            this.tms.setOtherOrganization(this.orgOther.find(o => o.oid == tx.oid_source));
                            this.currentPartner = this.tms.getOtherOrganization();
                            this.fromCurrent = false;

                            if (this.openMode === 'Shipped') {
                                of(...this.items_existing).pipe(
                                    flatMap(item => this.psService.addOneOrganizationProductStock(this.orgCurrent.oid, item.pid))
                                ).subscribe( result => {},
                                    err => console.log(err),
                                    () => of(...this.items_existing).pipe(
                                        flatMap(item => this.psService.getOneProductStock(this.orgCurrent.oid, item.pid))
                                    ).subscribe(prod => {
                                        this.items_shipping.push({
                                            pid: prod.pid,
                                            collapse: true,
                                            location: prod.inventoryByLocation.map(l => l.name),
                                            location_id: prod.inventoryByLocation.map(l => l.locid),
                                            maxcount: prod.inventoryByLocation.map(l => l.quantity),
                                            count: Array(prod.inventoryByLocation.length).fill(0)
                                        });
                                    }, err => console.log(err),
                                    () => {
                                        this.items_shipping.sort((a, b) => a.pid > b.pid ? 1 : -1);
                                    })
                                );
                            }
                        }
                    });

                } else {
                    this.openMode = 'new';
                }
            });
        });
    }

    setCurrentPartner(org) {
        this.tms.setOtherOrganization(org);
        this.currentPartner = org;
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
        this.deadTx = true;
        this.router.navigate(['/organization']);
    }

    submitItems() {
        this.tms.submitSimpleTransaction({
            status: 'Submitted',
            stringTime: (new Date()).toString(),
            oid_source: this.tms.getOtherOrganization().oid,
            oid_dest: this.orgCurrent.oid,
            items: this.items,
            currentUser: this.currentUser,
            totalPrice: this.getTotalPrice(),
        }).subscribe(ref => {
            this.deadTx = true;
            this.router.navigate(['/organization']);
        });
    }

    mergeItems() {
        const it = this.m.getItems();
        const ite = this.m.getItemsExisting();
        const iteid = ite.map(p => p.pid);
        for (let i = 0; i < it.length; i++) {
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
        this.tms.updateTransaction(this.viewTxId, items, this.currentUser, this.getTotalPrice())
            .subscribe(ref => {
                this.deadTx = true;
                this.router.navigate(['/organization']);
            });
    }

    orderTransaction() {
        this.m.saveItems(this.items);
        this.m.saveItemsExisting(this.items_existing);
        const items = this.mergeItems();
        this.tms.orderTransaction(this.viewTxId, items, this.currentUser, this.getTotalPrice())
          .subscribe(ref => {
            this.deadTx = true;
              this.router.navigate(['/organization']);
          });
    }

    approveTransaction() {
        this.m.saveItems(this.items);
        this.m.saveItemsExisting(this.items_existing);
        for (let i = 0; i < this.items_shipping.length; i++) {
            if (this.items_existing[i].quantity != this.items_shipping[i].count.reduce((a, b) => a + b, 0)) {
                this.errorMessage = 'Incorrect number of items selected';
                return;
            }
        }
        this.errorMessage = '';

        of(...this.items_shipping).pipe(
            flatMap(item => {
                const locationInfo = [];
                for (let i = 0; i < item.location_id.length; i++) {
                    locationInfo.push({
                        locid: item.location_id[i],
                        name: item.location[i],
                        quantity: item.maxcount[i] - item.count[i]
                    });
                }
                return this.psService.updateOneProductStock(this.orgCurrent.oid, item.pid, locationInfo);
            })
        ).subscribe(
            result => {
                this.tms.approveTransaction(this.viewTxId)
                .subscribe(ref => {
                    this.deadTx = true;
                    this.router.navigate(['/organization']);
                });
            }
        );
        // this.psService.updateOneProductStock(this.orgCurrent.oid, this.product.pid, newInventoryData).subscribe(result => {});


    }

    acceptTransaction() {
        this.m.saveItems(this.items);
        this.m.saveItemsExisting(this.items_existing);
        for (let i = 0; i < this.items_shipping.length; i++) {
            if (this.items_existing[i].quantity != this.items_shipping[i].count.reduce((a, b) => a + b, 0)) {
                this.errorMessage = 'Incorrect number of items selected';
                return;
            }
        }

        this.errorMessage = '';
        of(...this.items_shipping).pipe(
            flatMap(item => {
                const locationInfo = [];
                for (let i = 0; i < item.location_id.length; i++) {
                    locationInfo.push({
                        locid: item.location_id[i],
                        name: item.location[i],
                        quantity: item.maxcount[i] + item.count[i]
                    });
                }
                return this.psService.updateOneProductStock(this.orgCurrent.oid, item.pid, locationInfo);
            })
        ).subscribe(
            result =>
            this.tms.acceptTransaction(this.viewTxId)
            .subscribe(ref => {
                this.deadTx = true;
                this.router.navigate(['/organization']);
            })
        );
    }

    declineTransaction() {
        this.tms.declineTransaction(this.viewTxId)
          .subscribe(ref => {
              this.deadTx = true;
              this.router.navigate(['/organization']);
          });
    }

    reorderTransaction() {
        this.tms.submitSimpleTransaction({
            status: 'Submitted',
            stringTime: (new Date()).toString(),
            oid_source: this.tms.getOtherOrganization().oid,
            oid_dest: this.orgCurrent.oid,
            items: this.m.getItemsExisting(),
        }).subscribe(ref => {
            this.deadTx = true;
            this.router.navigate(['/organization']);
        });
    }

    selectItems() {
        this.m.saveItemsExisting(this.items_existing);
        this.m.saveItems(this.items);
        this.router.navigate([`/organization/transaction/items/add/${this.currentPartner.oid}`]);
    }

    removeItemExisting(item: TxProduct) {
        for (let i = 0; i < this.items_existing.length; i++) {
            if (this.items_existing[i].name == item.name) {
                this.items_existing.splice(i, 1);
                break;
            }
        }
    }

    removeItem(item: TxProduct) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === item.name) {
                this.items.splice(i, 1);
                break;
            }
        }
        this.m.saveItems(this.items);
    }

    openDetailOverlay(product: ProductStock) {
        const modalRef = this.modalService.open(InventoryDetailOverlayComponent);
        modalRef.componentInstance.item = product;
    }

    ngOnDestroy() {
        this.m.saveItemsExisting([]);
        console.log(this.items_shipping);
        if (this.deadTx) {
            this.m.saveItems([]);
            this.tms.setOtherOrganization(null);
        }
    }
}
