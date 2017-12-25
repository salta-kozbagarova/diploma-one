import { Transport } from "../_interfaces";
import { ProductImage } from "../../_models";
import { Country, Region, City, User } from "../../../_models";

export class Car implements Transport {
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
