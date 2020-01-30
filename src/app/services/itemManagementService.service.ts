import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item.model';
import { TxProduct } from 'src/app/services/transaction/transaction-management.model';

@Injectable({
    providedIn: 'root'
})
export class ItemManagementService {
    items: Item[] = [];
    items_existing: TxProduct[] = [];

    // private httpOptions = {
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*'
    //     })
    // };

    constructor(private http: HttpClient) {
    }

    saveItems( saved: Item[]) {
        // let items = JSON.parse(sessionStorage.getItem('selectedItems')) || [];
        
        // let names = items.map(p => p.name);
        // for(var i = 0; i < saved.length; i++) {
        //     if (!names.includes(saved[i].name)) {
        //         items.push(saved[i]);
        //     }
        // }

        sessionStorage.setItem('selectedItems', JSON.stringify(saved));
    }

    getItems() {
        let items = sessionStorage.getItem('selectedItems');
        return JSON.parse(items) || [];
    }

    saveItemsExisting(saved: TxProduct[]) {
        sessionStorage.setItem('existingItems', JSON.stringify(saved));
    }

    getItemsExisting() {
        let items = sessionStorage.getItem('existingItems');
        return JSON.parse(items) || [];
    }
}
