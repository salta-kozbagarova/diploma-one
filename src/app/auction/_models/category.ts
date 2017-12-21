import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class Category implements Model {
    name: string;
    image: string;
    link: string;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}
