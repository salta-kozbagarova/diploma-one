import { Transport } from "../_interfaces";
import { ProductImage } from "../../_models";
import { User } from "../../../_models";

export class Car implements Transport {
    id: number;
    name: string;
    description: string;
    images: ProductImage[];
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
