import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { isPlatformBrowser } from '@angular/common';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(@Inject(PLATFORM_ID) private platformId: Object){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = null;
        //if(isPlatformBrowser(this.platformId)){
            currentUser = JSON.parse(localStorage.getItem('user'));
        //}
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `JWT ${currentUser.token}`
                }
            });
        }
 
        return next.handle(request);
    }
}