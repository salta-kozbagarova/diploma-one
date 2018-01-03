import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('.span2').slider({
        min: 5000,
        max: 80000000,
        step: 100,
        value: [750000, 5500000],
        selection: 'before',
        tooltip: 'show'
      });
    });
  }
}
