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
import { CommonFilterComponent } from './common-filter/common-filter.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuctionComponent,
    MainComponent,
    AdBannerComponent,
    TopAuctionsComponent,
    CountdownComponent,
    CategoriesComponent,
    CommonFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  providers: [
    AuctionService,
    AdBannerService,
    CategoryService
  ],
  bootstrap: [AuctionComponent],
  exports: [AdBannerComponent, CountdownComponent, CommonFilterComponent]
})
export class AuctionModule { }