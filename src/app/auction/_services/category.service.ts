import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Category } from '../_models';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  private categoryUrl = 'http://127.0.0.1:8000/categories';  // '/api/category'; // URL to web api
  private paginationParams = {limit: 100, offset: 0}

  constructor(private http: HttpClient) { }

  getCategories(pageParams?: {}): Observable<any> {
    var params = pageParams ? pageParams : this.paginationParams;
    return this.http.get<Category[]>(this.categoryUrl+'/categories/', {params: params})
      .pipe(
        tap(categories => this.log(`fetched categories`)),
        catchError(this.handleError('getCategories', []))
      );
  }

  getCategory(code?: string): Observable<any> {
    return this.http.get<any>(this.categoryUrl+`/categories/${code}`)
      .pipe(
        tap(categories => this.log(`fetched categories`)),
        catchError(this.handleError('getCategories', []))
      );
  }

  getRootCategories(): Observable<any> {
    return this.http.get<Category[]>(this.categoryUrl+'/categories/', {params: {"is_root": "true"}})
      .pipe(
        tap(categories => this.log(`fetched root categories`)),
        catchError(this.handleError('getRootCategories', []))
      );
  }

  getSubcategories(categoryCode: string): Observable<any> {
    return this.http.get<Category[]>(this.categoryUrl+'/categories/', {params: {"parent__code": categoryCode}})
      .pipe(
        tap(categories => this.log(`fetched subcategories for ${categoryCode}`)),
        catchError(this.handleError('getSubcategories', []))
      );
  }

  toCategory(category: number|string|Category){
    var _category = null;
    if(typeof category === Number.name){
      _category = new Category();
      _category.id = category;
    } else if(typeof category === String.name){
      _category = new Category();
      _category.code = category;
    } else{
      _category = category;
    }
    return _category;
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('CategoryService: ' + message);
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
