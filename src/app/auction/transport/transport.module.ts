import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuctionModule } from '../auction.module';
import { PaginationModule } from '../../pagination/pagination.module';
import { TrucksComponent } from './trucks/trucks.component';
import { UsedCarsComponent } from './used-cars/used-cars.component';
import { MototechnicsComponent } from './mototechnics/mototechnics.component';
import { AirTransportsComponent } from './air-transports/air-transports.component';
import { OthersComponent } from './others/others.component';
import { CarsComponent } from './cars/cars.component';
import { SafeUrlPipe, SortPipe } from '../../_pipes';
import { TransportService } from './_services';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TransportRoutingModule,
    AuctionModule,
    FormsModule,
    PaginationModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransportComponent, CategoriesComponent, TrucksComponent, UsedCarsComponent,
    MototechnicsComponent, AirTransportsComponent, OthersComponent, CarsComponent, SafeUrlPipe, SortPipe, TestComponent ],
  providers: [
    TransportService
  ],
  bootstrap: [TransportComponent]
})
export class TransportModule { }
