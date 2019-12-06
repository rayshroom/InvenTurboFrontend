import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from 'src/app/services/item.model';
import { ItemManagementService } from 'src/app/services/itemManagementService.service';

@Component({
  selector: 'app-items-listing-page',
  templateUrl: './items-listing-page.component.html',
  styleUrls: ['./items-listing-page.component.scss']
})
export class ItemsListingPageComponent implements OnInit {

  search: FormGroup;

  items: Item[];
  selectedItems: Item[];
  allItems: Item[];
  viewModeList = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    public m: ItemManagementService
  ) { 

    
  }

  ngOnInit() {
    this.items = [];
    for(let i = 0; i < 30; i++) {
      this.items[i] = {
        displayName: 'AABC' + i,
        productID: 'JD' + i,
        photoURL: '../../../../assets/sample-product.png',
        quantity: Math.floor(Math.random() * 20) + 1,
        unitPrice: Math.random() * 2
      };
    }

    this.allItems = this.items;

    this.selectedItems = [];

    this.search = new FormGroup({
      search: new FormControl('')
    });
  }

  filterItems(partial: string) {
    this.items = this.allItems.filter(function(a) {
      return a.productID.includes(partial);
    });
  }

  markSelected(item: Item) {
    if(item.isSelected) {
      item.isSelected = false;
    } else {
      item.isSelected = true;
      this.selectedItems.push(item);
    }
    
  }

  toggleListView() {
    this.viewModeList = true;
  }

  toggleGridView() {
    this.viewModeList = false;
  }

  goback() {
    this.router.navigate(['/org/3/transaction/new']);
  }

  submitItems() {
    // keep current state
    this.m.saveItems("add", this.selectedItems);
    // console.log(this.selectedItems);
    this.router.navigate(['/org/3/transaction/new'], {queryParams: {key: "add"}});
  }

}
