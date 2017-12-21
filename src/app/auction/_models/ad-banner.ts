import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class AdBanner implements Model {
    id: number;
    name: string;
    image: string;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}
