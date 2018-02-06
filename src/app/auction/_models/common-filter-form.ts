import { AdministrativeDivision, SearchRadius } from "../../_models";
import { Category } from "./";

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

    private static instance: CommonFilterForm = new CommonFilterForm();

    private constructor(){
        this.address__id = 1;
        this.address__name = 'Казахстан';
        this.radius = 1;
        this.category__id = 1;
        this.category__name = 'Транспорт';
        this.category__code = 'transport';
        this.price = [0,85000000];
        this.only_with_image = false;
        this.header_and_description = false;
        this.only_quantity = false;
    }

    static getInstance(): CommonFilterForm{
        if(!!localStorage.getItem('commonFilter')){
            this.instance = this.getCommonFilter();
            if(this.instance.only_quantity == true){
                this.instance.only_quantity = false;
            }
        } else{
            this.instance = new CommonFilterForm();
        }
        return this.instance;
    }

    static reset(): void{
        localStorage.removeItem('commonFilter');
    }

    static getCommonFilter(): CommonFilterForm{
        return JSON.parse(localStorage.getItem('commonFilter'));
    }

    static getFilterParams() {
        this.instance = this.getInstance();
        return {
            q: this.instance.q ? this.instance.q : '',
            address__id: this.instance.address__id,
            radius: this.instance.radius,
            category__code: this.instance.category__code,
            price: this.instance.price,
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
            price: this.instance.price,
            only_with_image: this.instance.only_with_image,
            header_and_description: this.instance.header_and_description,
            only_quantity: true
        };
    }
}
