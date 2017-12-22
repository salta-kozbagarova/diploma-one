import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
import { AuthenticationService } from './index';
import { User } from '../_models';
 
@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }
 
    getUsers(): Observable<User[]> {
        // get users from api
        return this.http.get<User[]>('/api/users');
    }
}