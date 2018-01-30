import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { AdministrativeDivision } from '../_models';

@Injectable()
export class AdministrativeDivisionService {

  private admUrl = 'http://127.0.0.1:8000/administrative-divisions';//'/api/administrative-division';  // URL to web api

  constructor(private http: HttpClient) { }

  getAdmDivisions(): Observable<AdministrativeDivision[]> {
    return this.http.get<AdministrativeDivision[]>(this.admUrl + '/administrative-divisions')
      .pipe(
        tap(adms => this.log(`fetched adm divisions`)),
        catchError(this.handleError('getAdmDivisions', []))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('AdministrativeDivisionService: ' + message);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
