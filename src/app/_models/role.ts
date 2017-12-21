import { User } from "./index";
import { Model } from "../_interfaces";

export class Role implements Model {
    id: number;
    name: string;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}
