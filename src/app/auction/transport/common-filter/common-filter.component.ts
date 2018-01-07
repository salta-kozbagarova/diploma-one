import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdministrativeDivision, SearchRadius } from '../../../_models';
import { AdministrativeDivisionService, SearchRadiusService } from '../../../_services';
import { CategoryService } from '../../_services';
import { Category } from '../../_models';

declare var $:any;
@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit, AfterViewInit {

  tstarr = [0,1,23];
  admDivisions: AdministrativeDivision[];
  searchRadiuses: SearchRadius[];
  categories: Category[];
  resultCount: number;
  locationConatiner = '<div class="card" style="overflow-y:auto;"><ul class="list-group"></ul></div>';
  locationItem = '<li class="list-group-item list-group-item-action" style="padding:.3em .9em;font-size:.9em;cursor:pointer;"><span class="locationText"></span><i class="fa fa-chevron-right float-right text-primary mt-1" aria-hidden="true"></i></li>';
  categoryContainer = '<div class="card" style="overflow-y:auto;"><ul class="list-group"></ul></div>';
  categoryItem = '<li class="list-group-item list-group-item-action" style="padding:.3em .9em;font-size:.9em;cursor:pointer;"><span class="categoryText"></span><i class="fa fa-chevron-right float-right text-primary mt-1" aria-hidden="true"></i></li>';
  constructor(private admDivisionService: AdministrativeDivisionService,
              private searchRadiusService: SearchRadiusService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAdmDivisions();
    this.getSearchRadiuses();
    this.getCategories();
  }

  ngAfterViewInit(){
    $(document).ready(function(){
      $('.priceFilter').slider({
        min: 0,
        max: 85000000,
        step: 10000,
        value: [0,85000000]
      });
    });
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
        $('#location').attr('data-id',$(this).data('id'));
        $('#location').val($(this).find('.locationText').text());
        $('#locationModal').modal('hide');
      });
    });
  }

  getSearchRadiuses(){
    this.searchRadiusService.getSearchRadiuses().subscribe(searchRadiuses => {
      this.searchRadiuses = searchRadiuses;
      console.log(this.searchRadiuses);
      this.searchRadiuses.forEach(searchRadius => {
        $('#radius').append('<option value="' + searchRadius.radius + '">' + '+ ' + searchRadius.radius + searchRadius.metric + '</option>');
      });
      $('#radius').find('option').first().attr('selected',true);
    });
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
        $('#category').attr('data-id',$(this).data('id'));
        $('#category').val($(this).find('.categoryText').text());
        $('#categoryModal').modal('hide');
      });
    });
  }

  showResult(){
    console.log('this is result');
  }
}
