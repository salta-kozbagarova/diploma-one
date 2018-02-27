import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { routing }        from './auction.routing';

import { AuctionService, AdBannerService, CategoryService, CommonFilterFormService } from './_services';
import { AuctionComponent } from './auction.component';
import { MainComponent } from './main/main.component';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { TopAuctionsComponent } from './top-auctions/top-auctions.component';
import { CountdownComponent } from './countdown/countdown.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommonFilterComponent } from './common-filter/common-filter.component'
import { FormsModule } from '@angular/forms';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { PaginationModule } from '../pagination/pagination.module';
import { CategoriesMiniComponent } from './categories-mini/categories-mini.component';
import { SafeUrlPipe, SortPipe } from '../_pipes';
import { TransportService } from './_services';

@NgModule({
  declarations: [
    AuctionComponent,
    MainComponent,
    AdBannerComponent,
    TopAuctionsComponent,
    CountdownComponent,
    CategoriesComponent,
    CommonFilterComponent,
    AuctionListComponent,
    CategoriesMiniComponent,
    SafeUrlPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    routing,
    PaginationModule
  ],
  providers: [
    AuctionService,
    AdBannerService,
    CategoryService,
    CommonFilterFormService,
    TransportService
  ],
  bootstrap: [AuctionComponent],
  exports: [AdBannerComponent, CountdownComponent, CommonFilterComponent]
})
export class AuctionModule { }