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
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;

    constructor(params?: any){
        if(params){
            this.id = params.id;
            this.name = params.name;
        }
    }
}
