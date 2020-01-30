import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TxProduct } from './transaction-management.model';
import { UserOrganization } from '../organization/user-organization.model';

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

    // These 2 methods are put under transaction instead of organization because they are only used
    // when adding items into a transaction
    private otherOrganization: UserOrganization = null;

    setOtherOrganization(orglink: UserOrganization) {
        this.otherOrganization = orglink;
        sessionStorage.setItem('tx_other_organization', JSON.stringify(this.otherOrganization));
    }

    getOtherOrganization() {
        const storedOtherTx = sessionStorage.getItem('tx_other_organization');
        if (!this.otherOrganization && storedOtherTx) {
            this.otherOrganization = JSON.parse(storedOtherTx);
        }
        return this.otherOrganization;
    }

    getAllOrganizationTransactions(oid: string): Observable<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string}[]> {
        return this.http.get<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string}[]>(
            `${environment.api}${environment.routes.getOrganizationTransactions(oid)}`,
            this.httpOptions
        );
    }

    getOneTransaction(tid: string): Observable<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string, items: TxProduct[]}> {
        return this.http.get<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string, items: TxProduct[]}>(
            `${environment.api}${environment.routes.getOneTransaction(tid)}`,
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

    orderTransaction(tid): Observable<any> {
        return this.http.post<string>(
            `${environment.api}${environment.routes.orderTransaction(tid)}`,
            {'status': 'Requested'},
            this.httpOptions
        )
    }
}
