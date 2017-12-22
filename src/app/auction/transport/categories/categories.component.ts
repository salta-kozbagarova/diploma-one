import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuctionService } from '../../_services';
import { Category } from '../../_models';

declare var $:any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  categories: Category[];

  testCat: Category = {id: 1, name: 'Транспорт', image: 'car.png', link: 'transports', parentId: null, subcategories: null, createdBy: null, updatedBy: null, createdAt: '20171218T1345', updatedAt: '20171218T1345', isActive: true, isDeleted: false};

  constructor(private auctionService: AuctionService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.auctionService.getSubcategoriesFor(this.testCat).subscribe(categories => this.categories = categories);
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
