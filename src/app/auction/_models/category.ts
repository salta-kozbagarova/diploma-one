import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class Category implements Model {
    id: number;
    code: string;
    name: string;
    image: string;
    link: string;
    parent_id: number;
    subcategories: Category[];
    level: number;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;

    constructor(params?: any){
        if(params){
            this.id = params.id;
            this.name = params.name;
        }
    }
}
