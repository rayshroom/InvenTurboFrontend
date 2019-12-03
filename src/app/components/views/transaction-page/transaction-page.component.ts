import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Item } from 'src/app/services/item.model';
import { ItemManagementService } from 'src/app/services/itemManagementService.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {

  @Input() viewType: string;

  orgCurrent: {orgName: string, photoURL?: string};
  orgOther: {orgName: string, photoURL?: string}[];
  items: Item[];
  taxRate = 0.13;
  fromCurrent = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public m: ItemManagementService
  ) { 
    
  }

  ngOnInit() {
    
    this.orgCurrent = {orgName: "The bar inc.", photoURL: "../../../../assets/default-org-avatar.png" };

    this.orgOther = [];
    for(let i = 0; i < 5; i++) {
      this.orgOther[i] = {orgName: "Org " + i + " company", photoURL: "../../../../assets/default-org-avatar.png"};
    }

    this.items = [];

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.key == 'add') {
        this.items = this.m.getItems(params.key);
      }
    });
    
  }

  getTotalItems() {
    if (this.items) {
      return this.items.map(function(a) {return a.quantity;})
              .reduce(function(a, b) {return a + b;});
    } else {
      return 0;
    }
  }

  getSubtotal() {
    if (this.items) {
      return this.items.map(function(a) {return a.quantity * a.unitPrice;})
              .reduce(function(a, b) {return a + b;});
    } else {
      return 0;
    }
  }

  getTotalPrice() {
    return (1 + this.taxRate) * this.getSubtotal();
  }

  goback() {
    this.router.navigate(['/orgdashboard']);
  }

  submitItems() {
    // keep current state
    this.router.navigate(['/orgdashboard']);
  }

  selectItems() {
    this.router.navigate(['/org/3/transaction/items/add']);
  }
}
