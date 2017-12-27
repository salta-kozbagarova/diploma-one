import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './transport.component';
import { CarsComponent } from './cars/cars.component';
import { UsedCarsComponent } from './used-cars/used-cars.component';
import { TrucksComponent } from './trucks/trucks.component';
import { MototechnicsComponent } from './mototechnics/mototechnics.component';
import { AirTransportsComponent } from './air-transports/air-transports.component';
import { OthersComponent } from './others/others.component';

const transportRoutes: Routes = [
    {
        path: '',
        component: TransportComponent
    },
    {
        path: 'cars',
        component: CarsComponent
    },
    {
        path: 'used-cars',
        component: UsedCarsComponent
    },
    {
        path: 'trucks',
        component: TrucksComponent
    },
    {
        path: 'mototechnics',
        component: MototechnicsComponent
    },
    {
        path: 'air-transports',
        component: AirTransportsComponent
    },
    {
        path: 'others',
        component: OthersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(transportRoutes)],
    exports: [RouterModule]
})
export class TransportRoutingModule {
}