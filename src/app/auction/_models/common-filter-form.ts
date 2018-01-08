import { AdministrativeDivision, SearchRadius } from "../../_models";
import { Category } from "./";

export class CommonFilterForm {
    q: string;
    location: AdministrativeDivision;
    radius: SearchRadius;
    category: Category;
    price: number[];
    only_photo: boolean;
    header_and_description: boolean;
    only_quantity: boolean;

    constructor(){
        this.location = new AdministrativeDivision();
        this.location.id = 1;
        this.location.name = 'Казахстан';
        this.radius = new SearchRadius();
        this.radius.id = 1;
        this.radius.radius = 0;
        this.radius.metric = 'км';
        this.radius.name = '0км';
        this.category = new Category();
        this.category.id = 1;
        this.category.name = 'Транспорт';
        this.price = [0,85000000];
        this.only_photo = false;
        this.header_and_description = false;
        this.only_quantity = true;
    }

    reset(): void{
        this.q = null;
        this.location = new AdministrativeDivision();
        this.location.id = 1;
        this.location.name = 'Казахстан';
        this.radius = new SearchRadius();
        this.radius.id = 1;
        this.radius.radius = 0;
        this.radius.metric = 'км';
        this.radius.name = '0км';
        this.price = [0,85000000];
        this.only_photo = false;
        this.header_and_description = false;
        this.only_quantity = true;
    }
}
