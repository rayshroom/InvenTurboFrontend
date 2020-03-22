import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocationInventory, ProductStock } from './product-stock.model';

@Injectable({
    providedIn: 'root'
})
export class ProductStockService {
    constructor(private http: HttpClient, private route: Router) {}

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    getOneProductStock(oid: string, pid: string): Observable<any> {
        return this.http
            .get<any>(
                `${env.api}${env.routes.getOneProductStock(oid, pid)}`,
                this.httpOptions
            )
            .pipe(
                catchError(err => {
                    this.route.navigate(['/notfound']);
                    return throwError(err);
                })
            );
    }

    getAllOrganizationProductStock(oid: string): Observable<any> {
        return this.http.get<any>(
            `${env.api}${env.routes.getOrganizationProductStocks(oid)}`,
            this.httpOptions
        );
    }

    addOneOrganizationProductStock(oid: string, pid: string): Observable<any> {
        return this.http.post<any>(
            `${env.api}${env.routes.addOneProductStock(oid)}`,
            { pid },
            this.httpOptions
        );
    }

    updateOneProductStock(oid: string, pid: string, locInvData: LocationInventory[]): Observable<any> {
        return this.http.put<any>(
            `${env.api}${env.routes.updateOneProductStock(oid, pid)}`,
            locInvData,
            this.httpOptions
        );
    }

    removeProductStock(oid: string, pid: string): Observable<any> {
        return this.http.delete<any>(
            `${env.api}${env.routes.removeProductStock(oid, pid)}`,
            this.httpOptions
        );
    }

    hideProductStock(oid: string, pid: string): Observable<any> {
        return this.http.put<any>(
            `${env.api}${env.routes.hideProductStock(oid, pid)}`,
            this.httpOptions
        );
    }

    updateProductStockPrice(oid: string, pid: string, newPrice: number): Observable<any> {
        return this.http.put<any>(
            `${env.api}${env.routes.updateProductStockPrice(oid, pid)}`,
            { unit_price: newPrice },
            this.httpOptions
        );
    }

}
