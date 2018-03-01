import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuctionService } from '../_services/auction.service';
import { Auction } from '../_models/auction';
import { ActivatedRoute } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit, AfterViewInit {

  auction: Auction;

  constructor(private auctionService: AuctionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.getAuction(res.id);
    });
  }

  ngAfterViewInit(){
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox({
        onShown: function() {
            console.log('Checking our the events huh?');
        },
        onNavigate: function(direction, itemIndex){
            console.log('Navigating '+direction+'. Current item: '+itemIndex);
        },
        maxWidth: 600,
        maxHeight: 450
      });
    });
  }

  getAuction(id: number){
    this.auctionService.getAuction(id).subscribe(data => this.auction = data);
  }
}
