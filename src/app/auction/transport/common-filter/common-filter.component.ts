import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit, AfterViewInit {

  resultCount: number;

  constructor() { }

  ngOnInit() {
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

  showResult(){
    console.log('this is result');
  }
}
