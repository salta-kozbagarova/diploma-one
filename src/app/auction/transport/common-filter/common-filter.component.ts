import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AddressService } from '../../../_services';
import { Address } from '../../../_models';

declare var $:any;
@Component({
  selector: 'app-common-filter',
  templateUrl: './common-filter.component.html',
  styleUrls: ['./common-filter.component.css']
})
export class CommonFilterComponent implements OnInit, AfterViewInit {

  address: Address;
  resultCount: number;
  locationConatiner = '<div class="card" style="overflow-y:auto;"><ul class="list-group"></ul></div>';
  locationItem = '<li class="list-group-item list-group-item-action" style="padding:.3em .9em;font-size:.9em;"><span class="locationText"></span><i class="fa fa-chevron-right float-right text-primary mt-1" aria-hidden="true"></i></li>';
  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.getAddresses();
  }

  ngAfterViewInit(){
    $(document).ready(function(){
      $('.priceFilter').slider({
        min: 0,
        max: 85000000,
        step: 10000,
        value: [0,85000000]
      });
      
      $('.modal-select li').mouseover(function(){
        $('.modal-select .card-group').append(
          this.locationConatiner
        );
        var lastColumn = $('.modal-select .list-group').last();
        this.address.countries.forEach(country => {
          lastColumn.append(this.locationItem);
          lastColumn.find('li').last().data('id',country.id);
          lastColumn.find('.locationText').last().text(country.name);
        });
      });
    });
  }

  getAddresses(){
    this.addressService.getAddressHierarchy().subscribe(address => {
      this.address = address;
      $('.modal-select .card-group').append(
        this.locationConatiner
      );
      var lastColumn = $('.modal-select .list-group').last();
      this.address.countries.forEach(country => {
        lastColumn.append(this.locationItem);
        lastColumn.find('li').last().data('id',country.id);
        lastColumn.find('.locationText').last().text(country.name);
      });
    });
  }

  showResult(){
    console.log('this is result');
  }
}
