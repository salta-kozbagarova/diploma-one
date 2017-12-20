import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuctionService } from '../_services';
import { Category } from '../_models';

declare var $:any;
@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit, AfterViewInit {

  categories: Category[];

  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.auctionService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('.category').hover(function(){
        $(this).find('.icon-sm').css({height: '52px',width: '52px'});
      }, function() {
        $(this).find('.icon-sm').css({height: '50px',width: '50px'});
      });
    });
  }

}
