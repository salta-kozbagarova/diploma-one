import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CategoryService } from '../../_services';
import { Category } from '../../_models';

declare var $:any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getSubcategories(this.categoryService.getCurrentCategory()).subscribe(categories => this.categories = categories);
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
