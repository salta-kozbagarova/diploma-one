import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuctionComponent } from './auction.component';
import { CarComponent } from './car/car.component';

const auctionRoutes: Routes = [
    {
        path: '',
        component: AuctionComponent,
        children: [
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: 'main', component: MainComponent },
            { path: 'cars', component: CarComponent }
        ]
    }
];

export const routing = RouterModule.forChild(auctionRoutes);