import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../_services';
import { TransportService } from './_services';
import { Auction } from '../_models';
import { Subject }    from 'rxjs/Subject';
import { CommonFilterForm } from '../_models';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {

  transports: Auction[];
  private searchTerms = new Subject<string>();
  sortParam: string;
  sortAsc = false;

  loading = false;
  count = 0;
  page = 1;
  limit = 10;

  constructor(private transportService: TransportService,
              private auctionService: AuctionService) {
    this.auctionService.searchResult.subscribe(data => this.showResult(data));
  }

  ngOnInit() {
    //this.getTransports();
  }

  // Push a search term into the observable stream.
  // TODO: probably getTransport functionality should be in seacrh method
  search(term: string): void {
    if(!term){
      this.getTransports();
    }else{
      this.transportService.search(this.searchTerms).subscribe(data => {
        this.transports = data.results;
      });
      this.searchTerms.next(term);
    }
  }

  getTransports(nextLink?){
    this.loading = true;
    this.transportService.getTransports(nextLink).subscribe(data => {
      this.count = data.count;
      this.transports = data.results;
      this.loading = false;
    });
  }

  showResult(data: any){
    this.loading = true;
    this.page = 1;
    this.count = data.count;
    this.transports = data.results;
    this.loading = false;
  }

  goToPage(n: number): void {
    this.page = n;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getFilterParams());
    this.getTransports(params);
  }

  onNext(): void {
    this.page++;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getFilterParams());
    this.getTransports(params);
  }

  onPrev(): void {
    this.page--;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getFilterParams());
    this.getTransports(params);
  }

  sort(param: string){
    if(this.sortParam !== param){
      this.sortAsc = true;
    } else{
      this.sortAsc = this.sortAsc !== null ? !this.sortAsc : false;
    }
    this.sortParam = param;
  }

  onLoad(data: boolean){
    if(data === true){
      this.loading = true;
    }
  }
}
