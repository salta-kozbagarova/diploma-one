import { User, Country, Region, City } from "../../_models";
import { ProductImage } from "../_models";

export interface Product {
    id: number;
    name: string;
    description: string;
    images: ProductImage[];
    country: Country;
    region: Region;
    city: City;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}
