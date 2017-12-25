import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../_services';
import { Auction } from '../_models';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  transports: Auction[];

  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
    this.getTransports();
  }
  getTransports(){
    this.auctionService.getTransports().subscribe(data => this.transports = data);
  }
}
