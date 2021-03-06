import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './transport.component';
import { TrucksComponent } from './trucks/trucks.component';
import { MototechnicsComponent } from './mototechnics/mototechnics.component';
import { AirTransportsComponent } from './air-transports/air-transports.component';
import { OthersComponent } from './others/others.component';
import { TestComponent } from './test/test.component';

const transportRoutes: Routes = [
    {
        path: '',
        component: TransportComponent
    },
    {
        path: ':categoryCode',
        component: TransportComponent
    },
    // {
    //     path: 'new-cars',
    //     component: NewCarsComponent
    // },
    // {
    //     path: 'used-cars',
    //     component: UsedCarsComponent
    // },
    // {
    //     path: 'trucks',
    //     component: TrucksComponent
    // },
    // {
    //     path: 'mototechnics',
    //     component: MototechnicsComponent
    // },
    // {
    //     path: 'air-transport',
    //     component: AirTransportsComponent
    // },
    // {
    //     path: 'other',
    //     component: OthersComponent
    // },
    {
        path: 'test',
        component: TestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(transportRoutes)],
    exports: [RouterModule]
})
export class TransportRoutingModule {
}