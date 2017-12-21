import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { routing }        from './auction.routing';

import { AuctionService, AdBannerService } from './_services';
import { AuctionComponent } from './auction.component';
import { MainComponent } from './main/main.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { CarComponent } from './car/car.component';
import { TopAuctionsComponent } from './top-auctions/top-auctions.component';

@NgModule({
  declarations: [
    AuctionComponent,
    MainComponent,
    AdBannerComponent,
    CarComponent,
    TopAuctionsComponent
  ],
  imports: [
    CommonModule,
    routing
  ],
  providers: [
    AuctionService,
    AdBannerService
  ],
  bootstrap: [AuctionComponent]
})
export class AuctionModule { }