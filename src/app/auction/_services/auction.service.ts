import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Category, Car, Auction } from '../_models';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuctionService {

  private auctionUrl = '/api/auction';  // URL to web api

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.auctionUrl+'/categories')
        .pipe(
          tap(heroes => this.log(`fetched categories`)),
          catchError(this.handleError('getCategories', []))
        );
  }

  getSubcategoriesFor(category: Category): Observable<Category[]> {
    return this.http.get<Category[]>(this.auctionUrl+'/categories?parent='+category.id)
        .pipe(
          tap(heroes => this.log(`fetched categories for ` + category.name)),
          catchError(this.handleError('getSubcategoriesFor', []))
        );
  }

  getCars(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.auctionUrl+'/cars')
        .pipe(
          tap(heroes => this.log(`fetched cars`)),
          catchError(this.handleError('getCars', []))
        );
  }

  getTop(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.auctionUrl+'/top')
        .pipe(
          tap(heroes => this.log(`fetched top`)),
          catchError(this.handleError('getTop', []))
        );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('AuctionService: ' + message);
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
