import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personnel } from './personnel.model';

@Injectable({
    providedIn: 'root'
})
export class PersonnelService {
    
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {}

    autoAcceptUser(email: string): Observable<any> {
        console.log("Not reached");
        console.log(`${environment.api}${environment.routes.organizationInviteRequestAutoAccept(email)}`);
        return this.http.post<any>(
            `${environment.api}${environment.routes.organizationInviteRequestAutoAccept(email)}`,
            {'status': 'accept', 'email': email},
            this.httpOptions
        )
    }

    getAllEmployeeOfOrganization(oid: string): Observable<{employees: Personnel[]}> {
        return this.http.get<any>(
            `${environment.api}${environment.routes.getOrganizationEmployees(oid)}`,
            this.httpOptions
        )
    }

    fireOneEmployeeOfOrganization(oid: string, uid: string): Observable<any> {
        return this.http.put<any>(
            `${environment.api}${environment.routes.fireOneEmployee(oid, uid)}`,
            this.httpOptions
        )
    }

    createOrganizationInvite(inviteRequest): Observable<any> {
        return this.http.post<any>(
            `${environment.api}${environment.routes.organizationInviteRequestCreate}`,
            inviteRequest,
            this.httpOptions
        )
    }

    getOneOrganizationInvite(rid: string): Observable<any> {
        return this.http.get<any>(
            `${environment.api}${environment.routes.organizationInviteRequestGetone(rid)}`,
            this.httpOptions
        )
    }

    acceptInviteToOrganization(rid: string): Observable<any> {
        return this.http.post<any>(
            `${environment.api}${environment.routes.organizationInviteRequestHandle(rid)}`,
            {'status': 'accept'},
            this.httpOptions
        );
    }

    declineInviteToOrganization(rid: string): Observable<any> {
        return this.http.post<any>(
            `${environment.api}${environment.routes.organizationInviteRequestHandle(rid)}`,
            {'status': 'decline'},
            this.httpOptions
        );
    }

}
