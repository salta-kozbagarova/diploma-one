import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Category } from '../_models';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  private categoryUrl = '/api/category';//'http://127.0.0.1:8000/categories';  // URL to web api

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        tap(categories => this.log(`fetched categories`)),
        catchError(this.handleError('getCategories', []))
      );
  }

  getSubcategories(category: number|Category): Observable<Category[]> {
    var cat = this.toCategory(category);
    return this.http.get<Category[]>(this.categoryUrl+'/'+cat.id)
      .pipe(
        tap(categories => this.log(`fetched categories`)),
        catchError(this.handleError('getSubcategories', []))
      );
  }

  setCurrentCategory(category: number|Category){
    var curCat = this.toCategory(category);
    localStorage.setItem('category', JSON.stringify(curCat));
  }

  getCurrentCategory(): Category{
    return JSON.parse(localStorage.getItem('category'));
  }

  toCategory(category: number|Category){
    var _category = null;
    if(typeof category === Number.name){
      _category = new Category();
      _category.id = category;
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
