import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AdministrativeDivision, SearchRadius } from '../../../_models';
import { AdministrativeDivisionService, SearchRadiusService } from '../../../_services';
import { CategoryService, AuctionService } from '../../_services';
import { Category, CommonFilterForm } from '../../_models';
import { Subject }    from 'rxjs/Subject';

declare var $:any;
@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit, AfterViewInit {

  admDivisions: AdministrativeDivision[];
  commonFilterForm: CommonFilterForm;
  private searchTerms = new Subject<CommonFilterForm>();
  searchRadiuses: SearchRadius[];
  categories: Category[];
  resultCount: number;
  priceFilter: any;
  @Output() getSearchResult: EventEmitter<any> = new EventEmitter();
  locationConatiner = '<div class="card" style="overflow-y:auto;"><ul class="list-group"></ul></div>';
  locationItem = '<li class="list-group-item list-group-item-action" style="padding:.3em .9em;font-size:.9em;cursor:pointer;"><span class="locationText"></span><i class="fa fa-chevron-right float-right text-primary mt-1" aria-hidden="true"></i></li>';
  categoryContainer = '<div class="card" style="overflow-y:auto;"><ul class="list-group"></ul></div>';
  categoryItem = '<li class="list-group-item list-group-item-action" style="padding:.3em .9em;font-size:.9em;cursor:pointer;"><span class="categoryText"></span><i class="fa fa-chevron-right float-right text-primary mt-1" aria-hidden="true"></i></li>';
  constructor(private admDivisionService: AdministrativeDivisionService,
              private searchRadiusService: SearchRadiusService,
              private categoryService: CategoryService,
              private auctionService: AuctionService) {
    this.commonFilterForm = new CommonFilterForm();
  }

  ngOnInit() {
    this.getAdmDivisions();
    this.getSearchRadiuses();
    this.getCategories();
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
        max: 85000000,
        step: 10000,
        value: [!!that.commonFilterForm.price ? that.commonFilterForm.price[0] : 0, !!that.commonFilterForm.price ? that.commonFilterForm.price[1] : 85000000]
      }).on('slideStop',changePrice).data('slider');
    });
  }

  searchForCount(): void {
    this.searchTerms.next(this.commonFilterForm);
    this.auctionService.searchForCount(this.searchTerms).subscribe(count => {
      this.resultCount = count;
    });
  }

  reset(){
    this.commonFilterForm.reset();
    this.priceFilter.setValue([0,85000000]);
  }

  onQueryChange(){
    this.searchForCount();
  }

  onPhotoChange(){
    this.searchForCount();
  }

  onSearchMoreChange(){
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
            lastColumn.find('.categoryText').last().text(category.name);
          });
          modContent = $('#categoryModal .modal-content');
          newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))+15;
          $('#categoryModal .modal-content').width(newWidth + 'em');
        }
      });
      $('body').on('click', '#categoryModal li', function(){
        that.commonFilterForm.category__id=$(this).data('id');
        that.commonFilterForm.category__name=$(this).find('.categoryText').text();
        $('#categoryModal').modal('hide');
        that.searchForCount();
      });
    });
  }

  showResult(){
    console.log('this is result');
    this.commonFilterForm.only_quantity = false;
    console.log(this.commonFilterForm);
    this.auctionService.getByParams(this.commonFilterForm).subscribe(data => {
      console.log(data);
      this.getSearchResult.emit(data);
      this.commonFilterForm.only_quantity = true;
    });
  }
}
