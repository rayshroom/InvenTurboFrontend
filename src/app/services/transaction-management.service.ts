import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../src/environments/environment';

import { Transaction } from './transaction.model';


@Injectable({
    providedIn: 'root'
})
export class TransactionManagementService {
    transactions: Transaction[];

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {}

    getAllOrganizationTransactions(oid: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(
            `${environment.api}${environment.routes.TRANSAC.GETALL(oid)}`,
            this.httpOptions
        );
    }
}