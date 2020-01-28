import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { Profile } from './uam.model';

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

    doRegister(values: Profile): Observable<any> {
        values.displayName = `${values.title} ${values.firstName} ${values.lastName}`.trim();
        return this.http.post<any>(
            `${env.api}${env.routes.register}`,
            values,
            this.httpOptions
        );
    }

    getOneUserProfile(uid: string): Observable<any> {
        return this.http.get<any>(
            `${env.api}${env.routes.getOneProfile(uid)}`,
            this.httpOptions
        );
    }
}
