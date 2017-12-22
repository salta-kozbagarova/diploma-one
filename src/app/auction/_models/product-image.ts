import { Model } from "../../_interfaces";
import { User } from "../../_models";
import { environment } from "../../../environments/environment";

export class ProductImage implements Model {
    productId: number;
    image: string;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;

    // get image(){
    //     return environment.imageUrl + this._image;
    // }
}
