import { Transport } from "../_interfaces";
import { ProductImage } from "../../_models";
import { User } from "../../../_models";

export class Car implements Transport {
    id: number;
    name: string;
    description: string;
    images: ProductImage[];
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;

    getName(): string{
        return this.name;
    }
}
