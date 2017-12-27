import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../_services';
import { TransportService } from './_services';
import { Auction } from '../_models';
import { Subject }    from 'rxjs/Subject';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  transports: Auction[];
  private searchTerms = new Subject<string>();
  sortParam: string;

  constructor(private transportService: TransportService) { }

  ngOnInit() {
    this.getTransports();
  }

  // Push a search term into the observable stream.
  // TODO: probably getTransport functionality should be in seacrh method
  search(term: string): void {
    if(!term){
      this.getTransports();
    }else{
      this.searchTerms.next(term);
      this.transportService.search(this.searchTerms).subscribe(data => this.transports = data);
    }
  }

  getTransports(){
    this.transportService.getTransports().subscribe(data => this.transports = data);
  }
}
