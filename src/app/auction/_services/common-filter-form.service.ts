import { Injectable, Output, EventEmitter } from '@angular/core';
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
  @Output() commonFilterForm: EventEmitter<CommonFilterForm> = new EventEmitter();

  constructor(private http: HttpClient,
              private router: Router,
              private categoryService: CategoryService) { }

  getCommonFilterForm(): CommonFilterForm {
    this.curCategoryCode = this.router.url.split('/').pop();
    let commonFilterForm = CommonFilterForm.getInstance();
    commonFilterForm.category__code = this.curCategoryCode;
    this.setCommonFilterForm(commonFilterForm);
    this.categoryService.getCategory(this.curCategoryCode).subscribe(data => {
      commonFilterForm.category__id = data.id;
      commonFilterForm.category__name = data.name;
      this.setCommonFilterForm(commonFilterForm);
    });
    return commonFilterForm;
  }

  setCommonFilterForm(commonFilterForm: CommonFilterForm) {
    localStorage.setItem('commonFilter', JSON.stringify(commonFilterForm));
    this.commonFilterForm.emit(commonFilterForm);
  }
}
