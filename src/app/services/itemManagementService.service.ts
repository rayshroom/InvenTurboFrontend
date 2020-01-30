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
        this.items = saved;
    }

    getItems() {
        return this.items;
    }

    saveItemsExisting(saved: TxProduct[]) {
        this.items_existing = saved;
    }

    getItemsExisting() {
        return this.items_existing;
    }
}
