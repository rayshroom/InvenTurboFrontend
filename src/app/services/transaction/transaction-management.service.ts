import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TxProduct } from './transaction-management.model';
import { UserOrganization } from '../organization/user-organization.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TransactionManagementService {
    transactions: {tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string, currentUser?: any, totalItems?: any, totalPrice?: any}[];

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
        sessionStorage.setItem('tx_other_organization', JSON.stringify(orglink));
    }

    getOtherOrganization() {
        const storedOtherTx = sessionStorage.getItem('tx_other_organization');
        return storedOtherTx === "undefined" || storedOtherTx === undefined ? null : JSON.parse(storedOtherTx);
    }

    getAllOrganizationTransactions(oid: string): Observable<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string, currentUser?: any, totalItems?: any, totalPrice?: any}[]> {
        return this.http.get<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string, currentUser?: any, totalItems?: any, totalPrice?: any}[]>(
            `${environment.api}${environment.routes.getOrganizationTransactions(oid)}`,
            this.httpOptions
        );
    }

    getOneTransaction(tid: string): Observable<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string, items: TxProduct[], currentUser?: any, totalItems?: any, totalPrice?: any}> {
        return this.http.get<{tid: string, status: string, stringTime: string, oid_source: string, oid_dest: string, items: TxProduct[], currentUser?: any, totalItems?: any, totalPrice?: any}>(
            `${environment.api}${environment.routes.getOneTransaction(tid)}`,
            this.httpOptions
        );
    }

    submitSimpleTransaction(transaction): Observable<any> {
        return this.http.post<{status: string, stringTime: string,oid_source: string, oid_dest: string, currentUser?: any, totalItems?: any, totalPrice?: any}[]>(
            `${environment.api}${environment.routes.addSimpleTransaction}`,
            transaction,
            this.httpOptions
        );
    }

    updateTransaction(tid: string, items: any, currentUser?: any, totalPrice?: any): Observable<any> {
        return this.http.post<any>(
            `${environment.api}${environment.routes.orderTransaction(tid)}`,
            {'status': 'Pending', 'addItems': items,
                'uid': currentUser.uid, 'userName': currentUser.displayName, 'totalItems': items.length, totalPrice},
            this.httpOptions
        )
    }

    orderTransaction(tid: string, items: any, currentUser?: any, totalPrice?: any): Observable<any> {
        return this.http.post<string>(
            `${environment.api}${environment.routes.orderTransaction(tid)}`,
            {'status': 'Requested', 'addItems': items,
                'uid': currentUser.uid, 'userName': currentUser.displayName, 'totalItems': items.length, totalPrice},
            this.httpOptions
        )
    }

    // TODO: use executeTransaction
    approveTransaction(tid: string): Observable<any> {
        return this.http.post<string>(
            `${environment.api}${environment.routes.orderTransaction(tid)}`,
            {'status': 'Shipped'},
            this.httpOptions
        )
    }

    acceptTransaction(tid: string): Observable<any> {
        return this.http.post<string>(
            `${environment.api}${environment.routes.orderTransaction(tid)}`,
            {'status': 'Completed'},
            this.httpOptions
        )
    }

    declineTransaction(tid: string): Observable<any> {
        return this.http.post<string>(
            `${environment.api}${environment.routes.orderTransaction(tid)}`,
            {'status': 'Declined'},
            this.httpOptions
        )
    }

    reorderTransaction(tid: string): Observable<any> {
        return this.http.post<string>(
            `${environment.api}${environment.routes.orderTransaction(tid)}`,
            {'status': 'Reordered'},
            this.httpOptions
        )
    }


}
