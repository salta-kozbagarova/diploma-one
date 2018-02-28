import { Injectable, Output, EventEmitter, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_BASE_HREF, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User, SigninForm, AuthUser } from '../_models';

@Injectable()
export class AuthenticationService {

  private authUrl = 'http://127.0.0.1:8000/api-token-auth/';
  @Output() currentUser: EventEmitter<AuthUser> = new EventEmitter();

  constructor(private http: HttpClient,
              @Optional() @Inject(APP_BASE_HREF) origin: string,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.authUrl = `${origin}${this.authUrl}`;
  }

  authenticate(signinForm: SigninForm): Observable<boolean> {
    return this.http.post<any>(this.authUrl, signinForm)
      .map(data => {
        // login successful if there's a jwt token in the response
        if (data.token && data.user) {
          var authUser = data;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('user', JSON.stringify(authUser));
          //}
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
    //if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('user');
    //}
    this.currentUser.emit(null);
  }

  getCurrentUser(): AuthUser {
    //if(isPlatformBrowser(this.platformId)){
      return JSON.parse(localStorage.getItem('user'));
    //}
    //return null;
  }
}
