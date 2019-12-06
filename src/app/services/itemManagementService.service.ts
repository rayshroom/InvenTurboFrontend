import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import {Item} from './item.model';

@Injectable({
    providedIn: 'root'
})
export class ItemManagementService {
    items: {}

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {
        this.items = {};
    }

    saveItems(key: string, saved: Item[]) {
        console.log(key);
        console.log(saved);
        this.items[key] = saved;
    }

    getItems(key: string) {
        return this.items[key];
    }

    // getAllOrganizationTransactions(oid: string): Observable<{tid: string, status: string, datetime: Date}[]> {
    //     return this.http.get<{tid: string, status: string, datetime: Date}[]>(
    //         `${environment.api}${environment.routes.TRANSAC.GETALL(oid)}`,
    //         this.httpOptions
    //     );
    // }
}