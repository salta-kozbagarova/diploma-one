import { Model } from "../../_interfaces";
import { User } from "../../_models";
import { environment } from "../../../environments/environment";

export class ProductImage implements Model {
    productId: number;
    image: string;
    is_main: boolean;
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;

    // get image(){
    //     return environment.imageUrl + this._image;
    // }
}
