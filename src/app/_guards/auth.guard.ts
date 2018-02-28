import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object) { }

    canActivate() {
        //if (isPlatformBrowser(this.platformId)){
            if(localStorage.getItem('user')) {
                // logged in so return true
                return true;
            }
        //}

        // not logged in so redirect to login page
        this.router.navigate(['/']);
        return false;
    }
}