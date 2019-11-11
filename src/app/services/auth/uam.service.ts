import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { NewUser } from './uam.model';

@Injectable({
  providedIn: 'root'
})

export class uamService {

  user: NewUser;
  env: any;

  constructor(private http: HttpClient) {
    this.env = environment;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  RegisterUser(val: object): Observable<any> {
    return this.http.post<NewUser>(`${this.env.baseUrl}${this.env.routes.uam.register}`, val, this.httpOptions);
  }
}