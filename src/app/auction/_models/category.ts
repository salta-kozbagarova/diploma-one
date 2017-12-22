import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class Category implements Model {
    id: number;
    name: string;
    image: string;
    link: string;
    parentId: number;
    subcategories: Category[];
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}