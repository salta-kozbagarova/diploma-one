import { Component, OnInit, AfterViewInit } from '@angular/core';
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
    console.log('searchForCount');
    this.searchTerms.next(this.commonFilterForm);
    this.auctionService.searchForCount(this.searchTerms).subscribe(count => {
      this.resultCount = count;
      console.log('got it');
    });
    // if(!term){
    //   this.getTransports();
    // }else{
    //   this.searchTerms.next(term);
    //   this.transportService.search(this.searchTerms).subscribe(data => this.transports = data);
    // }
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
      this.admDivisions = admDivisions;
      $('#locationModal .card-group').append(
        this.locationConatiner
      );
      var level = null;
      var old_level = null;
      var lastColumn = $('#locationModal .list-group').last();
      this.admDivisions.forEach(admDivision => {
        if(admDivision.administrative_level_id === 1){
          lastColumn.append(this.locationItem);
          lastColumn.find('li').last().attr('data-id',admDivision.id);
          lastColumn.find('.locationText').last().text(admDivision.name);
          level = admDivision.administrative_level_id;
        }
      });
      $('#locationModal .card').last().attr('data-level',level);
      old_level = level;
      var that = this;
      $('body').on('mouseover', '#locationModal li', function(){
        let parent_id = $(this).data('id');
        var level = null;
        var card = null;
        that.admDivisions.forEach(admDivision => {
          if(admDivision.parent_id === parent_id){
            if(admDivision.administrative_level_id !== null){
              level = admDivision.administrative_level_id;
            }
          }
        });
        if(level === null){
          if($(this).closest('.card').attr('data-level') != old_level){
            card = $('#locationModal').find('[data-level="' + old_level + '"]');
            if(card.length > 0){
              let modContent = $('#locationModal .modal-content');
              let newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))-15;
              $('#locationModal .modal-content').width(newWidth + 'em');
              card.remove();
            }
          }
          return;
        }
        old_level = level;
        card = $('#locationModal').find('[data-level="' + level + '"]');
        if(card.length > 0){
          let modContent = $('#locationModal .modal-content');
          let newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))-15;
          $('#locationModal .modal-content').width(newWidth + 'em');
          card.remove();
        }
        $('#locationModal .card-group').append(
          that.locationConatiner
        );
        var lastColumn = $('#locationModal .list-group').last();
        that.admDivisions.forEach(admDivision => {
          if(admDivision.parent_id === parent_id){
            lastColumn.append(that.locationItem);
            lastColumn.find('li').last().attr('data-id',admDivision.id);
            lastColumn.find('.locationText').last().text(admDivision.name);
          }
        });
        $('#locationModal .card').last().attr('data-level',level);
        let modContent = $('#locationModal .modal-content');
        let newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))+15;
        $('#locationModal .modal-content').width(newWidth + 'em');
      });
      $('body').on('click', '#locationModal li', function(){
        that.commonFilterForm.location.id=$(this).data('id');
        that.commonFilterForm.location.name=$(this).find('.locationText').text();
        $('#locationModal').modal('hide');
        that.searchForCount();
      });
    });
  }

  getSearchRadiuses(){
    this.searchRadiusService.getSearchRadiuses().subscribe(searchRadiuses => {
      this.searchRadiuses = searchRadiuses;
    });
  }

  onRadiusChange(){
    this.searchForCount();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      $('#categoryModal .card-group').append(
        this.categoryContainer
      );
      var level = null;
      var old_level = null;
      var lastColumn = $('#categoryModal .list-group').last();
      this.categories.forEach(category => {
        if(category.level === 1){
          lastColumn.append(this.categoryItem);
          lastColumn.find('li').last().attr('data-id',category.id);
          lastColumn.find('.categoryText').last().text(category.name);
          level = category.level;
        }
      });
      $('#categoryModal .card').last().attr('data-level',level);
      old_level = level;
      var that = this;
      $('body').on('mouseover', '#categoryModal li', function(){
        let parent_id = $(this).data('id');
        var level = null;
        var card = null;
        that.categories.forEach(category => {
          if(category.parent_id === parent_id){
            if(category.level !== null){
              level = category.level;
            }
          }
        });
        if(level === null){
          if($(this).closest('.card').attr('data-level') != old_level){
            card = $('#categoryModal').find('[data-level="' + old_level + '"]');
            if(card.length > 0){
              let modContent = $('#categoryModal .modal-content');
              let newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))-15;
              $('#categoryModal .modal-content').width(newWidth + 'em');
              card.remove();
            }
          }
          return;
        }
        old_level = level;
        card = $('#categoryModal').find('[data-level="' + level + '"]');
        if(card.length > 0){
          let modContent = $('#categoryModal .modal-content');
          let newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))-15;
          $('#categoryModal .modal-content').width(newWidth + 'em');
          card.remove();
        }
        $('#categoryModal .card-group').append(
          that.categoryContainer
        );
        var lastColumn = $('#categoryModal .list-group').last();
        that.categories.forEach(category => {
          if(category.parent_id === parent_id){
            lastColumn.append(that.categoryItem);
            lastColumn.find('li').last().attr('data-id',category.id);
            lastColumn.find('.categoryText').last().text(category.name);
          }
        });
        $('#categoryModal .card').last().attr('data-level',level);
        let modContent = $('#categoryModal .modal-content');
        let newWidth = Math.round(modContent.width()/parseFloat($("body").css("font-size")))+15;
        $('#categoryModal .modal-content').width(newWidth + 'em');
      });
      $('body').on('click', '#categoryModal li', function(){
        that.commonFilterForm.category.id=$(this).data('id');
        that.commonFilterForm.category.name=$(this).find('.categoryText').text();
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
    });
  }
}
