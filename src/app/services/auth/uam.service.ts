import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { Profile } from './uam.model';
import { flatMap, last } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Credential } from './auth.model';

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

    constructor(private http: HttpClient, public auth: AuthService) {}

    doRegister(values: Profile): Observable<firebase.User> {
        values.displayName = `${values.title} ${values.firstName} ${values.lastName}`.trim();
        return this.http.post<any>(`${env.api}${env.routes.register}`, values, this.httpOptions).pipe(
            flatMap(() => this.auth.doLogin(new Credential(values.email, values.password))),
            flatMap(user => {
                user.sendEmailVerification();
                return of(user);
            }),
        );
    }

    getOneUserProfile(uid: string): Observable<any> {
        return this.http.get<any>(
            `${env.api}${env.routes.getOneProfile(uid)}`,
            this.httpOptions
        );
    }
}
