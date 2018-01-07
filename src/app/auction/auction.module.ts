import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { routing }        from './auction.routing';

import { AuctionService, AdBannerService, CategoryService } from './_services';
import { AuctionComponent } from './auction.component';
import { MainComponent } from './main/main.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { TopAuctionsComponent } from './top-auctions/top-auctions.component';
import { CountdownComponent } from './countdown/countdown.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AuctionComponent,
    MainComponent,
    AdBannerComponent,
    TopAuctionsComponent,
    CountdownComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    routing
  ],
  providers: [
    AuctionService,
    AdBannerService,
    CategoryService
  ],
  bootstrap: [AuctionComponent],
  exports: [AdBannerComponent, CountdownComponent]
})
export class AuctionModule { }