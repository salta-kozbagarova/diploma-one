import { Product } from "../_interfaces";
import { ProductImage } from "./index";
import { Country, Region, City, User } from "../../_models";

export class Car implements Product {
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

    getName(): string{
        return this.name;
    }
}
