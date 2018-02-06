import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Category } from '../_models';
import { catchError, map, tap } from 'rxjs/operators';
import { CategoryService } from '../_services';
import { Router } from '@angular/router';
import { CommonFilterForm } from '../_models';

@Injectable()
export class CommonFilterFormService {

  curCategoryCode: string;
  commonFilterForm: CommonFilterForm;

  constructor(private http: HttpClient,
              private router: Router,
              private categoryService: CategoryService) { }

  getCommonFilterForm(): CommonFilterForm {
    this.curCategoryCode = this.router.url.split('/').pop();
    this.commonFilterForm = CommonFilterForm.getInstance();
    this.commonFilterForm.category__code = this.curCategoryCode;

    this.categoryService.getCategory(this.curCategoryCode).subscribe(data => {
      this.commonFilterForm.category__id = data.id;
      this.commonFilterForm.category__name = data.name;
      localStorage.setItem('commonFilter', JSON.stringify(this.commonFilterForm));
    });
    return this.commonFilterForm;
  }
}
