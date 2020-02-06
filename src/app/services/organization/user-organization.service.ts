import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOrganization } from './user-organization.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserOrganizationService {
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    private currentOrganization: UserOrganization;

    setCurrentOrganization(orglink: UserOrganization) {
        this.currentOrganization = orglink;
        sessionStorage.setItem('user_organization', JSON.stringify(this.currentOrganization));
    }

    getCurrentOrganization() {
        const storedUser = sessionStorage.getItem('user_organization');
        if (!this.currentOrganization && storedUser) {
            this.currentOrganization = JSON.parse(storedUser);
        }
        return this.currentOrganization;
    }

    constructor(private http: HttpClient) {
    }

    getAllUserOrganizations(uid: string): Observable<any> {
        return this.http.get(`${env.api}${env.routes.getUserOrganizations(uid)}`, this.httpOptions);
    }

    getAllOrganizations(): Observable<any> {
        return this.http.get(`${env.api}${env.routes.getAllOrganization}`, this.httpOptions);
    }

    createOrganization(data): Observable<any> {
        return this.http.post(`${env.api}${env.routes.createOrganization}`, data, this.httpOptions);
    }
}
