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

  constructor(private transportService: TransportService) { }

  ngOnInit() {
    //this.getTransports();
  }

  // Push a search term into the observable stream.
  // TODO: probably getTransport functionality should be in seacrh method
  search(term: string): void {
    if(!term){
      this.getTransports();
    }else{
      this.searchTerms.next(term);
      this.transportService.search(this.searchTerms).subscribe(data => {
        this.transports = data.results;
      });
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

  showResult(any){
    console.log('getting res');
    console.log(any);
    this.loading = true;
    this.page = 1;
    this.count = any.count;
    this.transports = any.results;
    this.loading = false;
  }

  goToPage(n: number): void {
    this.page = n;
    console.log('gotopage');
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getInstance());
    this.getTransports(params);
  }

  onNext(): void {
    this.page++;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getInstance());
    this.getTransports(params);
  }

  onPrev(): void {
    this.page--;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getInstance());
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
}
