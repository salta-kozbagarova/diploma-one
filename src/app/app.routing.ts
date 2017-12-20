import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: '', component: HomeComponent },
   { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
   { path: 'auctions', component: AuctionsComponent },
   // otherwise redirect to home
   { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);