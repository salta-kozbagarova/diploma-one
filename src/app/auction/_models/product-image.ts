import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class ProductImage implements Model {
    productId: number;
    image: string;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}
