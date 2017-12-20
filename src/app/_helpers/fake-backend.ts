import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import{ Category } from '../_models';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        let testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User', login: 'test' };
        let categories: Category[] = [
            {name: 'Автомобиль', image: 'car.png', link: 'cars'},
            {name: 'Недвижимость', image: 'realty.jpg', link: 'realties'},
            {name: 'Электроника', image: 'electronics.png', link: 'electronics'},
            {name: 'Одежда', image: 'clothes.png', link: 'clothes'},
            {name: 'Искусство', image: 'art.png', link: 'art'},
            {name: 'Прочее', image: 'other.jpg', link: 'other'}
        ];
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // fake authenticate api end point
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // check user credentials and return fake jwt token if valid
                if (params.login === testUser.login && params.password === testUser.password) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }

            // fake users api end point
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return test users if valid, this security is implemented server side
                // in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: [testUser] })
                    ));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }

            if (connection.request.url.endsWith('/api/auction/cars') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // check user credentials and return fake jwt token if valid
                if (params.login === testUser.login && params.password === testUser.password) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }

            if (connection.request.url.endsWith('/api/auction/categories') && connection.request.method === RequestMethod.Get) {
                // check user credentials and return fake jwt token if valid
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 200, body: categories })
                ));
            }

        }, 500);

    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};