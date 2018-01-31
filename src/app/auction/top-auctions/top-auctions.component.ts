import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuctionService } from '../_services';
import { Auction } from '../_models';

declare var $:any;
@Component({
  selector: 'app-top-auctions',
  templateUrl: './top-auctions.component.html',
  styleUrls: ['./top-auctions.component.css']
})
export class TopAuctionsComponent implements OnInit, AfterViewInit {

  title: string = 'Топ аукционы';
  topAuctions: Auction[];
  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
    this.getTop();
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('body').on('mouseenter', '.auction-card', function() {
        $(this).css({
          '-webkit-transform': 'scale(1.03)',
          '-moz-transform': 'scale(1.03)',
          '-o-transform': 'scale(1.03)'
        });
      });
      $('body').on('mouseleave', '.auction-card', function() {
        $(this).css({
          '-webkit-transform': 'scale(1)',
          '-moz-transform': 'scale(1)',
          '-o-transform': 'scale(1)'
        });
      });
    });
  }

  getTop(){
    this.auctionService.getTop().subscribe(top => this.topAuctions = top);
  }
}
