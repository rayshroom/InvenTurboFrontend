import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductStockService {
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    getAllOrganizationProductStock(oid: string): Observable<any> {
        return this.http.get<any>(
            `${environment.api}${environment.routes.getOrganizationProductStocks(oid)}`,
            this.httpOptions
        );
    }
}
