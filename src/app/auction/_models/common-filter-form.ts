import { AdministrativeDivision, SearchRadius } from "../../_models";
import { Category } from "./";
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export class CommonFilterForm {
    q: string;
    address__id: number;
    address__name: string;
    radius: number;
    category__id: number;
    category__name: string;
    category__code: string;
    price: number[];
    only_with_image: boolean;
    header_and_description: boolean;
    only_quantity: boolean;
    @Inject(PLATFORM_ID) private static platformId: Object;

    private static instance: CommonFilterForm = new CommonFilterForm();

    private constructor(){
        this.address__id = 1;
        this.address__name = 'Казахстан';
        this.radius = 1;
        this.category__id = 1;
        this.category__name = 'Транспорт';
        this.category__code = 'transport';
        this.price = [0,850000000];
        this.only_with_image = false;
        this.header_and_description = false;
        this.only_quantity = false;
    }

    static getInstance(): CommonFilterForm{
        this.instance = this.getCommonFilter();
        if(!!this.instance){
            if(this.instance.only_quantity == true){
                this.instance.only_quantity = false;
            }
        } else{
            this.instance = new CommonFilterForm();
        }
        return this.instance;
    }

    static reset(): void{
        //if(isPlatformBrowser(this.platformId)){
            localStorage.removeItem('commonFilter');
        //}
    }

    static getCommonFilter(): CommonFilterForm{
        let res = null;
        try{
            //if(isPlatformBrowser(this.platformId)){
                res = JSON.parse(localStorage.getItem('commonFilter'));
            //}
        } catch(e){
            return null;
        }
        return res;
    }

    static getFilterParams() {
        this.instance = this.getInstance();
        return {
            q: this.instance.q ? this.instance.q : '',
            address__id: this.instance.address__id,
            radius: this.instance.radius,
            category__code: this.instance.category__code,
            current_price_min: this.instance.price[0],
            current_price_max: this.instance.price[1],
            only_with_image: this.instance.only_with_image,
            header_and_description: this.instance.header_and_description,
            only_quantity: false
        };
    }

    static getFilterParamsWithCount() {
        this.instance = this.getInstance();
        return {
            q: this.instance.q ? this.instance.q : '',
            address__id: this.instance.address__id,
            radius: this.instance.radius,
            category__code: this.instance.category__code,
            current_price_min: this.instance.price[0],
            current_price_max: this.instance.price[1],
            only_with_image: this.instance.only_with_image,
            header_and_description: this.instance.header_and_description,
            only_quantity: true
        };
    }
}
