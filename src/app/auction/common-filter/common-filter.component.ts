import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AdministrativeDivision, SearchRadius } from '../../_models';
import { AdministrativeDivisionService, SearchRadiusService } from '../../_services';
import { CategoryService, AuctionService, CommonFilterFormService } from '../_services';
import { Category, CommonFilterForm } from '../_models';
import { Subject }    from 'rxjs/Subject';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

declare var $:any;
@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit, AfterViewInit {

  admDivisions: AdministrativeDivision[];
  commonFilterForm: CommonFilterForm;
  count$: Observable<number>;
  private searchTerms = new Subject<any>();
  searchRadiuses: SearchRadius[];
  categories: Category[];
  resultCount: number;
  priceFilter: any;
  curCategoryCode: string;
  curCategory: Category;
  @Output() onLoad: EventEmitter<boolean> = new EventEmitter();
  locationConatiner = '<div class="card" style="overflow-y:auto;"><ul class="list-group"></ul></div>';
  locationItem = '<li class="list-group-item list-group-item-action" style="padding:.3em .9em;font-size:.9em;cursor:pointer;"><span class="locationText"></span><i class="fa fa-chevron-right float-right text-primary mt-1" aria-hidden="true"></i></li>';
  categoryContainer = '<div class="card" style="overflow-y:auto;"><ul class="list-group"></ul></div>';
  categoryItem = '<li class="list-group-item list-group-item-action" style="padding:.3em .9em;font-size:.9em;cursor:pointer;"><span class="categoryText"></span><i class="fa fa-chevron-right float-right text-primary mt-1" aria-hidden="true"></i></li>';
  constructor(private admDivisionService: AdministrativeDivisionService,
              private searchRadiusService: SearchRadiusService,
              private categoryService: CategoryService,
              private auctionService: AuctionService,
              private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private commonFilterFormService: CommonFilterFormService) {
    this.commonFilterForm = this.commonFilterFormService.getCommonFilterForm();
    this.commonFilterFormService.commonFilterForm.subscribe(data => {
      this.commonFilterForm = data;
      this.searchForCount();
    });
  }

  ngOnInit() {
    this.count$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: any) => this.auctionService.getSearchResultCount(term))
    );
    this.getAdmDivisions();
    this.getSearchRadiuses();
    this.getCategories();
    this.searchForCount();
    this.showResult();
  }

  ngAfterViewInit(){
    var that = this;
    $(document).ready(function(){
      var changePrice = function(){
        that.commonFilterForm.price = that.priceFilter.getValue();
        that.searchForCount();
      }
      that.priceFilter = $('.priceFilter').slider({
        min: 0,
        max: 850000000,
        step: 10000,
        value: [!!that.commonFilterForm.price ? that.commonFilterForm.price[0] : 0, !!that.commonFilterForm.price ? that.commonFilterForm.price[1] : 85000000]
      }).on('slideStop',changePrice).data('slider');
    });
  }

  searchForCount(): void {
    this.count$.subscribe(count => {
      console.log('getting count');
      this.resultCount = count;
    });
    this.searchTerms.next(CommonFilterForm.getFilterParamsWithCount());
  }

  reset(){
    CommonFilterForm.reset();
    //this.priceFilter.setValue([0,85000000]);
  }

  onQueryChange(){
    this.changeFilterForm();
    this.searchForCount();
  }

  onPhotoChange(){
    this.changeFilterForm();
    this.searchForCount();
  }

  onSearchMoreChange(){
    this.changeFilterForm();
    this.searchForCount();
  }

  getAdmDivisions(){
    this.admDivisionService.getAdmDivisions().subscribe(admDivisions => {
      this.admDivisions = admDivisions.results;
      $('#locationModal .card-group').append(
        this.locationConatiner
      );
      var lastColumn = $('#locationModal .list-group').last();
      this.admDivisions.forEach(admDivision => {
        if(admDivision.administrative_level_id === 1){
          lastColumn.append(this.locationItem);
          lastColumn.find('li').last().attr('data-id',admDivision.id);
          lastColumn.find('.locationText').last().text(admDivision.name);
        }
      });
      var that = this;
      $('body').on('mouseover', '#locationModal li', function(){
        var admDivisionId = $(this).data('id');
        var card = null;
        var cardToDel = [];
        card = $(this).closest('.card');
        while(card.next().length > 0){
          cardToDel.push(card.next());
          card = card.next();
        }
        var modContent = $('#locationModal .modal-content');
        var newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))-(15*cardToDel.length);
        $('#locationModal .modal-content').width(newWidth + 'em');
        cardToDel.forEach(elToDel => elToDel.remove());
        var subdivisions = [];
        that.admDivisions.forEach(admDivision => {
          if(admDivision.id === admDivisionId){
            subdivisions = admDivision.subdivisions;
          }
        });
        if(subdivisions.length > 0){
          $('#locationModal .card-group').append(
            that.locationConatiner
          );
          var lastColumn = $('#locationModal .list-group').last();
          subdivisions.forEach(admDivision => {
            lastColumn.append(that.locationItem);
            lastColumn.find('li').last().attr('data-id',admDivision.id);
            lastColumn.find('.locationText').last().text(admDivision.name);
          });
          let modContent = $('#locationModal .modal-content');
          let newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))+15;
          $('#locationModal .modal-content').width(newWidth + 'em');
        }
      });
      $('body').on('click', '#locationModal li', function(){
        that.commonFilterForm.address__id=$(this).data('id');
        that.commonFilterForm.address__name=$(this).find('.locationText').text();
        $('#locationModal').modal('hide');
        that.changeFilterForm();
        that.searchForCount();
      });
    });
  }

  getSearchRadiuses(){
    this.searchRadiusService.getSearchRadiuses().subscribe(searchRadiuses => {
      this.searchRadiuses = searchRadiuses.results;
    });
  }

  onRadiusChange(){
    this.changeFilterForm();
    this.searchForCount();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.results;
      $('#categoryModal .card-group').append(
        this.categoryContainer
      );
      var lastColumn = $('#categoryModal .list-group').last();
      this.categories.forEach(category => {
        if(category.parent_id === null){
          lastColumn.append(this.categoryItem);
          lastColumn.find('li').last().attr('data-id',category.id);
          lastColumn.find('li').last().attr('data-code',category.code);
          lastColumn.find('.categoryText').last().text(category.name);
        }
      });
      var that = this;
      $('body').on('mouseover', '#categoryModal li', function(){
        var categoryId = $(this).data('id');
        var card = null;
        var cardToDel = [];
        card = $(this).closest('.card');
        while(card.next().length > 0){
          cardToDel.push(card.next());
          card = card.next();
        }
        var modContent = $('#categoryModal .modal-content');
        var newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))-(15*cardToDel.length);
        $('#categoryModal .modal-content').width(newWidth + 'em');
        cardToDel.forEach(elToDel => elToDel.remove());
        var subcategories = null;
        that.categories.forEach(category => {
          if(category.id === categoryId){
            subcategories = category.subcategories;
          }
        });
        if(subcategories.length > 0){
          $('#categoryModal .card-group').append(
            that.categoryContainer
          );
          var lastColumn = $('#categoryModal .list-group').last();
          subcategories.forEach(category => {
            lastColumn.append(that.categoryItem);
            lastColumn.find('li').last().attr('data-id',category.id);
            lastColumn.find('li').last().attr('data-code',category.code);
            lastColumn.find('li').last().attr('data-parent-code',category.parent_code);
            lastColumn.find('.categoryText').last().text(category.name);
          });
          modContent = $('#categoryModal .modal-content');
          newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))+15;
          $('#categoryModal .modal-content').width(newWidth + 'em');
        }
      });
      $('body').on('click', '#categoryModal li', function(){
        that.commonFilterForm.category__id=$(this).data('id');
        that.commonFilterForm.category__code=$(this).data('code');
        that.commonFilterForm.category__name=$(this).find('.categoryText').text();
        $('#categoryModal').modal('hide');
        that.changeFilterForm();
        that.searchForCount();
        let parent = $(this).data('parent-code');
        let urlString = null;
        if(!parent){
          urlString = that.router.serializeUrl(that.router.createUrlTree(['../../../'+$(this).data('code')], {relativeTo: that.route}));
        } else{
          urlString = that.router.serializeUrl(that.router.createUrlTree(['../../../'+parent,$(this).data('code')], {relativeTo: that.route}));
        }
        that.location.replaceState(urlString);
      });
    });
  }

  changeFilterForm(){
    this.commonFilterFormService.setCommonFilterForm(this.commonFilterForm);
  }

  showResult(){
    this.auctionService.emitByParams(CommonFilterForm.getFilterParams());
    this.onLoad.emit(true);
  }
}
