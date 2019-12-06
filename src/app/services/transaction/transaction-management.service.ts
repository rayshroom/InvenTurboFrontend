import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionManagementService {
    transactions: {tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string}[];

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {}

    getAllOrganizationTransactions(oid: string): Observable<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string}[]> {
        return this.http.get<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string}[]>(
            `${environment.api}${environment.routes.getOrganizationTransactions(oid)}`,
            this.httpOptions
        );
    }

    submitSimpleTransaction(transaction): Observable<any> {
        return this.http.post<{status: string, stringTime: string, oid_source: string, oid_dest: string}[]>(
            `${environment.api}${environment.routes.addSimpleTransaction}`,
            transaction,
            this.httpOptions
        );
    }
}
