import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: '', component: HomeComponent },
   { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);