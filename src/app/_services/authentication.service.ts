import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { User, SigninForm, AuthUser } from '../_models';

@Injectable()
export class AuthenticationService {

  public token: string;

  @Output() currentUser: EventEmitter<AuthUser> = new EventEmitter();

  constructor(private http: Http) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('user'));
    this.token = currentUser && currentUser.token;
  }

  login(signinForm: SigninForm): Observable<boolean> {
    return this.http.post('/api/authenticate', JSON.stringify(signinForm))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        console.log('token ' + token);
        if (token) {
          // set token property
          this.token = token;
          var authUser = new AuthUser(signinForm.login, null, token);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(authUser));
          this.currentUser.emit(authUser);
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          this.currentUser.emit(null);
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('user');
    this.currentUser.emit(null);
  }

  getCurrentUser(): AuthUser {
    return JSON.parse(localStorage.getItem('user'));
  }
}
