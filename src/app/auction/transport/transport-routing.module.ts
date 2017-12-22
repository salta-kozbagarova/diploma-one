import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportComponent } from './transport.component';

const transportRoutes: Routes = [
    {
        path: '',
        component: TransportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(transportRoutes)],
    exports: [RouterModule]
})
export class TransportRoutingModule {
}