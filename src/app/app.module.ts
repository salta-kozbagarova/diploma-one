import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
 
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { routing }        from './app.routing';
import { AuthGuard } from './_guards';
import { AuthenticationService, UserService, AuctionService } from './_services';

import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionsComponent } from './auctions/auctions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AuctionComponent,
    AuctionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    AuctionService,
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
