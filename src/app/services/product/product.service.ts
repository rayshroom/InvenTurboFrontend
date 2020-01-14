import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    getAllProducts(): Observable<any> {
        return this.http.get<any>(`${env.api}${env.routes.getAllProduct}`, this.httpOptions);
    }

    addNewProduct(data: Product): Observable<any> {
        return this.http.post<any>(`${env.api}${env.routes.createProduct}`, data, this.httpOptions);
    }
}
