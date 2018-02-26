import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Auction, CommonFilterForm } from '../_models';
import { Car } from '../transport/_models';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AuctionService {

  private auctionUrl = 'http://127.0.0.1:8000/bargains';  // '/api/auction';  // URL to web api
  @Output() searchResult: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getTop(): Observable<any> {
    return this.http.get<any>(this.auctionUrl+'/bargains')
      .pipe(
        tap(heroes => this.log(`fetched top`)),
        catchError(this.handleError('getTop', []))
      );
  }

  getSearchResultCount(term: any): Observable<number>{
    console.log('getSearchResultCount');
    console.log(term);
    return this.http.get<number>(this.auctionUrl + '/bargains', {params: term})
      .pipe(
        tap(heroes => this.log(`fetched result count`)),
        catchError(this.handleError('getSearchResultCount', term))
      );
  }

  getByParams(options: any) {
    this.http.get<Auction[]>(this.auctionUrl + '/bargains', {params: options})
      .pipe(
        tap(heroes => this.log(`fetched by params`)),
        catchError(this.handleError('getByParams', []))
      ).subscribe(data => {
        this.searchResult.emit(data);
      });
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
