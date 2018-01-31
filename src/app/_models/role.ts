import { User } from "./index";
import { Model } from "../_interfaces";

export class Role implements Model {
    id: number;
    name: string;
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;
}
