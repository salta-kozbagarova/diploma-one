import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuctionService, CategoryService } from '../_services';
import { Category } from '../_models';

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
    this.getRootCategories();
  }

  getRootCategories(){
    this.categoryService.getRootCategories().subscribe(categories => {
      this.categories = categories.results.filter(category => {
        return category.parent_id == null;
      });
    });
  }

  setCurrentCategory(category: number|Category){
    this.categoryService.setCurrentCategory(category);
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('body').on('mouseenter', '.category', function() {
        $(this).find('.icon-sm').css({height: '52px',width: '52px'});
      });
      $('body').on('mouseleave', '.category', function() {
        $(this).find('.icon-sm').css({height: '50px',width: '50px'});
      });
    });
  }
}
