import { User } from "../../_models";
import { ProductImage } from "../_models";
import { Model } from "../../_interfaces";

export interface Product extends Model {
    id: number;
    name: string;
    description: string;
    images: ProductImage[];
}
