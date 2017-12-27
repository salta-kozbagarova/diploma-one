import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransportService } from '../_services';
import { Category } from '../../_models';

declare var $:any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  categories: Category[];

  constructor(private transportService: TransportService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.transportService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('body').on('mouseenter', '.subcategory', function() {
        $(this).find('.icon-sm').css({height: '32px',width: '32px'});
      });
      $('body').on('mouseleave', '.subcategory', function() {
        $(this).find('.icon-sm').css({height: '30px',width: '30px'});
      });
    });
  }
}
