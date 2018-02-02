import { AdministrativeDivision, SearchRadius } from "../../_models";
import { Category } from "./";

export class CommonFilterForm {
    q: string;
    address__id: number;
    address__name: string;
    radius: number;
    category__id: number;
    category__name: string;
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
        this.price = [0,85000000];
        this.only_with_image = false;
        this.header_and_description = false;
        this.only_quantity = true;
    }

    static getInstance(): CommonFilterForm{
        if(!!localStorage.getItem('commonFilter')){
            this.instance = this.getCommonFilter();
        } else{
            this.instance = new CommonFilterForm();
        }
        return this.instance;
    }

    static reset(): void{
        // this.q = null;
        // this.address__id = 1;
        // this.address__name = 'Казахстан';
        // this.radius = 1;
        // this.price = [0,85000000];
        // this.only_with_image = false;
        // this.header_and_description = false;
        // this.only_quantity = true;
        localStorage.removeItem('commonFilter');
    }

    static getCommonFilter(): CommonFilterForm{
        return JSON.parse(localStorage.getItem('commonFilter'));
    }
}
