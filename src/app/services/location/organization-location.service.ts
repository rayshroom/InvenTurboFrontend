import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { OrganizationLocation } from './organization-location.model';

@Injectable({
    providedIn: 'root'
})
export class OrganizationLocationService {
    constructor(private http: HttpClient) {}

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
    };

    public getAllOrganizationLocation(oid: string): Observable<any> {
        return this.http.get(`${env.api}${env.routes.getOrganizationLocations(oid)}`, this.httpOptions);
    }

    public createNewOrganizationLocation(oid: string, newLoc: OrganizationLocation): Observable<any> {
        return this.http.post(`${env.api}${env.routes.createOrganizationLocation(oid)}`, newLoc, this.httpOptions);
    }

    public updateOneOrganizationLocation(oid: string, locid: string, updatedLoc: OrganizationLocation): Observable<any> {
        return this.http.put(`${env.api}${env.routes.updateOrganizationLocation(oid, locid)}`, updatedLoc, this.httpOptions);
    }

    public deleteOneOrganizationLocation(oid: string, locid: string): Observable<any> {
        return this.http.delete(`${env.api}${env.routes.deleteOrganizationLocation(oid, locid)}`, this.httpOptions);
    }
}
