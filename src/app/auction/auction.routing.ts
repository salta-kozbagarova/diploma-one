import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuctionComponent } from './auction.component';
import { AuctionListComponent } from './auction-list/auction-list.component';

export function categoriesUrl(url: UrlSegment[]) {
    if(url.length <= 1){
        return null;
    }
    if(url[0].path !== 'cat'){
        return null;
    }
    let posParams: {} = {};
    for(let ind in url){
        if(parseInt(ind) === 0)
            continue;
        posParams[url[ind]['path']] = url[ind];
    }
    return {consumed: url, posParams: posParams};
  }

const auctionRoutes: Routes = [
    {
        path: '',
        component: AuctionComponent,
        children: [
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: 'main', component: MainComponent },
            { path: 'transport', loadChildren: 'app/auction/transport/transport.module#TransportModule' },
            { 
                path: 'cat',
                component: AuctionListComponent,
                matcher: categoriesUrl
            }
        ]
    }
];

export const routing = RouterModule.forChild(auctionRoutes);