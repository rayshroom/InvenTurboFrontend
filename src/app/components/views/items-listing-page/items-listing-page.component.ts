import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

class item {
  productID: string;
  photoURL?: string;
  quantity: number;
  unitPrice: number;
  isSelected?: boolean
}

@Component({
  selector: 'app-items-listing-page',
  templateUrl: './items-listing-page.component.html',
  styleUrls: ['./items-listing-page.component.scss']
})
export class ItemsListingPageComponent implements OnInit {

  items: item[];
  selectedItems: item[];

  constructor(
    public auth: AuthService,
    private router: Router,
    // public m: TransactionManagementService
  ) { 

    
  }

  ngOnInit() {
    this.items = [];
    for(let i = 0; i < 30; i++) {
      this.items[i] = {
        productID: 'JD' + i,
        photoURL: '../../../../assets/sample-product.png',
        quantity: Math.floor(Math.random() * 20) + 1,
        unitPrice: Math.random() * 2
      };
    }

    this.selectedItems = [];
  }


  markSelected(item: item) {
    if(item.isSelected) {
      item.isSelected = false;
    } else {
      item.isSelected = true;
      this.selectedItems.push(item);
    }
    
  }

  goback() {
    this.router.navigate(['/orgdashboard']);
  }

  submitItems() {
    // keep current state
    this.router.navigate(['/orgdashboard']);
  }

}
