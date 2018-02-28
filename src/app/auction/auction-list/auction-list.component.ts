import { Component, OnInit } from '@angular/core';
import { AuctionService, TransportService, CategoryService } from '../_services';
import { Auction, CommonFilterForm } from '../_models';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  auctions: Auction[];
  private searchTerms = new Subject<string>();
  sortParam: string;
  sortAsc = false;

  loading = false;
  count = 0;
  page = 1;
  limit = 10;

  constructor(private transportService: TransportService,
              private auctionService: AuctionService,
              private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    this.auctionService.searchResult.subscribe(data => this.showResult(data));
    this.route.params.subscribe(res => {
      console.log('rooooooooute chacking biiiish ya');
      console.log(res);
      let params = {};
      let firstParam = null;
      let indToDel;
      for(let ind in res){
        indToDel = ind;
        firstParam = res[ind];
        console.log('firstparam: ' + firstParam);
        break;
      }
      let first = true;
      for(let ind in res){
        if(first == true){
          first = false;
          continue;
        }
        console.log('copying object');
        console.log(ind);
        console.log(typeof ind);
        params[ind] = res[ind];
      }
      console.log('object copied');
      let curCategoryCode = null;
      this.categoryService.getCategory(firstParam).subscribe(data => {
        if(!data.id){
          this.router.navigate(['**'], {relativeTo: this.route, skipLocationChange: true});
        }
        let subcodes = [];
        if(data.subcategories.length > 0){
          subcodes = data.subcategories.map(function(elem){
            return elem.code;
          });
          for(let ind in params){
            if(subcodes.includes(params[ind])){
              curCategoryCode = params[ind];
              return false;
            }
          }
          if(!curCategoryCode){
            this.router.navigate(['**'], {relativeTo: this.route, skipLocationChange: true});
          }
        }
      });
    });
  }

  ngOnInit() {
    //this.getTransports();
  }

  // Push a search term into the observable stream.
  // TODO: probably getTransport functionality should be in seacrh method
  search(term: string): void {
    if(!term){
      this.getAuctions();
    }else{
      this.transportService.search(this.searchTerms).subscribe(data => {
        this.auctions = data.results;
      });
      this.searchTerms.next(term);
    }
  }

  getAuctions(nextLink?){
    this.loading = true;
    this.auctionService.getByParams(nextLink).subscribe(data => {
      this.count = data.count;
      this.auctions = data.results;
      this.loading = false;
    });
  }

  showResult(data: any){
    this.loading = true;
    this.page = 1;
    this.count = data.count;
    this.auctions = data.results;
    this.loading = false;
  }

  goToPage(n: number): void {
    this.page = n;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getFilterParams());
    this.getAuctions(params);
  }

  onNext(): void {
    this.page++;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getFilterParams());
    this.getAuctions(params);
  }

  onPrev(): void {
    this.page--;
    let params = {limit: this.limit, offset: (this.page*10)-10};
    Object.assign(params, CommonFilterForm.getFilterParams());
    this.getAuctions(params);
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
