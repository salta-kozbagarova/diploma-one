import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { SearchRadius } from '../_models';

@Injectable()
export class SearchRadiusService {

  private searchRaduisUrl = '/api/search-radius';  // URL to web api

  constructor(private http: HttpClient) { }

  getSearchRadiuses(): Observable<SearchRadius[]>{
    return this.http.get<SearchRadius[]>(this.searchRaduisUrl)
      .pipe(
        tap(searchRadiuses => this.log(`fetched adm searchRadiuses`)),
        catchError(this.handleError('getSearchRadiuses', []))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('SearchRadiusService: ' + message);
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
