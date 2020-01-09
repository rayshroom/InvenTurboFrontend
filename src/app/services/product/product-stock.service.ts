import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocationInventory } from './product-stock.model';

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
                `${environment.api}${environment.routes.getOneProductStock(oid, pid)}`,
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
            `${
                environment.api
            }${environment.routes.getOrganizationProductStocks(oid)}`,
            this.httpOptions
        );
    }

    updateOneProductStock(oid: string, pid: string, locInvData: LocationInventory[]): Observable<any> {
        return this.http.put<any>(
            `${environment.api}${environment.routes.updateOneProductStock(oid, pid)}`,
            locInvData,
            this.httpOptions
        );
    }
}
