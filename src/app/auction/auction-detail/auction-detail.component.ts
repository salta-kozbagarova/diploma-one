import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { AuctionService } from '../_services/auction.service';
import { Auction } from '../_models/auction';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
declare var $:any;
@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit, AfterViewInit, OnChanges {
  
  auction: Auction;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private auctionService: AuctionService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.getAuction(res.id);
      
    });
    this.galleryOptions = [
      {
          width: '100%',
          height: '400px',
          thumbnailsColumns: 4,
          thumbnailsRows: 1,
          imageAnimation: NgxGalleryAnimation.Fade,
          imageAutoPlay: true,
          imageAutoPlayPauseOnHover: true,
          previewAutoPlay: true,
          previewAutoPlayPauseOnHover: true,
          thumbnailsMoveSize: 4,
          thumbnailsMargin: 0,
          thumbnailMargin: 0,
          previewZoom: true,
          previewRotate: true,
          thumbnailsRemainingCount: true,
          imageArrowsAutoHide: true,
          thumbnailsArrowsAutoHide: true
      },
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      {
          breakpoint: 400,
          preview: false
      }
    ];
  }

  ngOnChanges(){
    
  }

  ngAfterViewInit(){
    
  }

  getAuction(id: number){
    this.auctionService.getAuction(id).subscribe(data => {
      this.auction = data;
      this.loadImages();
    });
  }

  loadImages(){
    this.galleryImages = [];
    this.auction.product.images.forEach((image, i) => {
      this.galleryImages.push(
        {
            small: image.image,
            medium: image.image,
            big: image.image
        }
      );
    });
  }
}
