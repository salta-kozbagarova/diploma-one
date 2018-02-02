import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuctionComponent } from './auction.component';

const auctionRoutes: Routes = [
    {
        path: '',
        component: AuctionComponent,
        children: [
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: 'main', component: MainComponent },
            { path: 'transport', pathMatch: 'full', loadChildren: 'app/auction/transport/transport.module#TransportModule' }
        ]
    }
];

export const routing = RouterModule.forChild(auctionRoutes);