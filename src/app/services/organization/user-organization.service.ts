import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOrganization } from './user-organization.model';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

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
        return this.http.get(`${environment.api}${environment.routes.getUserOrganizations(uid)}`, this.httpOptions);
    }

    getAllOrganizations(): Observable<any> {
        return this.http.get(`${environment.api}${environment.routes.getAllOrganization}`, this.httpOptions);
    }
}
