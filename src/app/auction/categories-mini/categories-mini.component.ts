import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CategoryService, CommonFilterFormService, AuctionService } from '../_services';
import { Category, CommonFilterForm } from '../_models';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var $:any;
@Component({
  selector: 'app-categories-mini',
  templateUrl: './categories-mini.component.html',
  styleUrls: ['./categories-mini.component.css']
})
export class CategoriesMiniComponent implements OnInit, AfterViewInit {

  categories: Category[];
  
  currCatCode: string;

  commonFilterForm: CommonFilterForm;

  constructor(private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private auctionService: AuctionService,
              private commonFilterFormService: CommonFilterFormService) {
    this.commonFilterForm = this.commonFilterFormService.getCommonFilterForm();
    this.commonFilterFormService.commonFilterForm.subscribe(data => {
      this.commonFilterForm = data;
      this.currCatCode = this.commonFilterForm.category__code;
      this.getCategories();
    });
  }

  ngOnInit() {
    this.currCatCode = this.router.url.split('/').pop();
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getSubcategories(this.currCatCode).subscribe(categories => {
      this.categories = categories.results;
    });
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

  changeCategory(category){
    let urlString = this.router.serializeUrl(this.router.createUrlTree(['../../../../cat/', category.parent_code, category.code], {relativeTo: this.route}));
    this.location.replaceState(urlString);
    this.commonFilterForm.category__id=category.id;
    this.commonFilterForm.category__code=category.code;
    this.commonFilterForm.category__name=category.name;
    this.commonFilterFormService.setCommonFilterForm(this.commonFilterForm);
    this.auctionService.emitByParams(CommonFilterForm.getFilterParams());
  }
}
