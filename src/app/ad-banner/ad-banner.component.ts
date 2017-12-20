import { Component, OnInit } from '@angular/core';
import { AdBannerService } from '../_services';
import { AdBanner } from '../_models';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.css']
})
export class AdBannerComponent implements OnInit {

  adBanners: AdBanner[];

  constructor(private adBannerService: AdBannerService) { }

  ngOnInit() {
    this.getAdBanners();
  }

  getAdBanners(){
    this.adBannerService.getAdBanners()
        .subscribe(adBanners => this.adBanners = adBanners);
  }
}
