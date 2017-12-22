import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportRoutingModule }        from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuctionModule } from '../auction.module';
import { TrucksComponent } from './trucks/trucks.component';
import { UsedCarsComponent } from './used-cars/used-cars.component';
import { CommonFilterComponent } from './common-filter/common-filter.component';

@NgModule({
  imports: [
    CommonModule,
    TransportRoutingModule,
    AuctionModule
  ],
  declarations: [TransportComponent, CategoriesComponent, TrucksComponent, UsedCarsComponent, CommonFilterComponent ],
  bootstrap: [TransportComponent]
})
export class TransportModule { }
