import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// Updated...
import { Observable, of } from 'rxjs';
// New...
import { catchError, tap } from "rxjs/operators";

import { User} from "./data-model-classes";

@Injectable({
  providedIn: 'root'
})
export class DataModelManagerService {
  
  user: User;

  constructor(private http: HttpClient) { }

  // URL to the example reqres.in web service
//  private urlReqres: string = "https://reqres.in/api/users";

  // Edit the base URL string to the web service
  private url: string = "http://localhost:8080/api";

  // Options object for POST and PUT requests
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  // Error handler, from the Angular docs
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  _RegisterUser(val: object): Observable<any> {
    return this.http.post<User>(`${this.url}/user/register`, val, this.httpOptions);
  }


}
