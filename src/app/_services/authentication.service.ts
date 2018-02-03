import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User, SigninForm, AuthUser } from '../_models';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://localhost:8000/api-token-auth/';
  @Output() currentUser: EventEmitter<AuthUser> = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(signinForm: SigninForm): Observable<boolean> {
    return this.http.post<any>(this.authUrl, signinForm)
      .map(data => {
        // login successful if there's a jwt token in the response
        if (data.token && data.user) {
          var authUser = data.user;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.emit(authUser);
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
    localStorage.removeItem('user');
    this.currentUser.emit(null);
  }

  getCurrentUser(): AuthUser {
    return JSON.parse(localStorage.getItem('user'));
  }
}
