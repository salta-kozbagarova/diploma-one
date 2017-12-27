import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Category, Auction } from '../../_models';
import { catchError, map, tap } from 'rxjs/operators';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Injectable()
export class TransportService {

  private transportUrl = '/api/auction/transport';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.transportUrl+'/categories')
      .pipe(
        tap(categories => this.log(`fetched categories for Transport`)),
        catchError(this.handleError('getCategories', []))
      );
  }

  getTransports(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.transportUrl)
      .pipe(
        tap(heroes => this.log(`fetched transports`)),
        catchError(this.handleError('getTransports', []))
      );
  }

  search(terms: Observable<string>): Observable<Auction[]> {
    return terms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchAuctions(term))
    );
  }

  /* GET auctions whose name contains search term */
  searchAuctions(term: string): Observable<Auction[]> {
    console.log('searching');
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Auction[]>(this.transportUrl + `?name=${term}`)
      .pipe(
        tap(auctions => this.log(`found auctions matching "${term}"`)),
        catchError(this.handleError<Auction[]>('searchAuctions', []))
      );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('TransportService: ' + message);
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
