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

    private currentUser: firebase.User;
    private currentOrganization: UserOrganization;

    setCurrentOrganization(orglink: UserOrganization) {
        this.currentOrganization = orglink;
    }

    getCurrentOrganization() {
        return this.currentOrganization;
    }

    constructor(private http: HttpClient, private auth: AuthService) {
        this.auth.getCurrentUser().subscribe(user => this.currentUser = user);
    }

    getAllCurrentUserOrganizations(): Observable<any> {
        return this.http.get(`${environment.api}${environment.routes.getUserOrganizations(this.currentUser.uid)}`, this.httpOptions);
    }
}
