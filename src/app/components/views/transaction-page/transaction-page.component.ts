import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {

  @Input() viewType: string;

  orgCurrent: {orgName: string, photoURL?: string};
  orgOther: {orgName: string, photoURL?: string}[];
  items: {productID: string, photoURL?: string, quantity: number, unitPrice: number}[];
  taxRate = 0.13;
  fromCurrent = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    // public m: TransactionManagementService
  ) { 

    if (this.viewType == "new") {

    } else if (this.viewType == "view") {

    }

    this.orgCurrent = {orgName: "The bar inc.", photoURL: "../../../../assets/default-org-avatar.png" };

    this.orgOther = [];
    for(let i = 0; i < 5; i++) {
      this.orgOther[i] = {orgName: "Org " + i + " company", photoURL: "../../../../assets/default-org-avatar.png"};
    }

    this.items = [];
  }

  ngOnInit() {
  }

  getTotalItems() {
    if (this.items.length > 0) {
      return this.items.map(function(a) {return a.quantity;})
              .reduce(function(a, b) {return a + b;});
    } else {
      return 0;
    }
  }

  getSubtotal() {
    if (this.items.length > 0) {
      return this.items.map(function(a) {return a.quantity * a.unitPrice;})
              .reduce(function(a, b) {return a + b;});
    } else {
      return 0;
    }
  }

  getTotalPrice() {
    return this.taxRate * this.getSubtotal();
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
