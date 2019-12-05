import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from './uam.model';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {}

    doRegister(values: User): Observable<any> {
        values.displayName = `${values.title} ${values.firstName} ${values.lastName}`.trim();
        return this.http.post<User>(
            `${environment.api}${environment.routes.register}`,
            values,
            this.httpOptions
        );
    }
}
