import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import{ Category, AdBanner } from '../auction/_models';
import{ AuthUser } from '../_models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = [
            { username: 'test', password: 'test', firstName: 'Test', lastName: 'User', login: 'test' }
        ];
        let categories: Category[] = [
            {name: 'Автомобиль', image: 'car.png', link: 'cars', createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false },
            {name: 'Недвижимость', image: 'realty.jpg', link: 'realties', createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false },
            {name: 'Электроника', image: 'electronics.png', link: 'electronics', createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false },
            {name: 'Одежда', image: 'clothes.png', link: 'clothes', createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false },
            {name: 'Искусство', image: 'art.png', link: 'art', createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false },
            {name: 'Прочее', image: 'other.jpg', link: 'other', createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false }
        ];

        let adBanners: AdBanner[] = [
            {id: 1, name: "smth", image: "ad6.jpeg", createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false},
            {id: 2, name: "smth", image: "ad7.jpeg", createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false},
            {id: 3, name: "smth", image: "ad8.jpeg", createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false},
            {id: 4, name: "smth", image: "ad9.jpg", createdBy: users[0], updatedBy: users[0], createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false}
        ];
 
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
 
            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.login === request.body.login && user.password === request.body.password;
                });
 
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    var authUser = new AuthUser(user.id, user.username, user.firstName, user.lastName, null, 'fake-jwt-token');
 
                    return Observable.of(new HttpResponse({ status: 200, body: authUser }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }
 
            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }
 
            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;
 
                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }
 
            // create user
            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;
 
                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                }
 
                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
 
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }
 
            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }
 
                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            if (request.url.endsWith('/api/auction/cars') && request.method === 'POST') {
                // get parameters from post request
                
            }

            if (request.url.endsWith('/api/auction/categories') && request.method === 'GET') {
                // check user credentials and return fake jwt token if valid
                return Observable.of(new HttpResponse({ status: 200, body: categories }));
            }

            if (request.url.endsWith('/api/ad-banners') && request.method === 'GET') {
                // check user credentials and return fake jwt token if valid
                return Observable.of(new HttpResponse({ status: 200, body: adBanners }));
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        })
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};