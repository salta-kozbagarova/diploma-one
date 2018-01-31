import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class AuctionType implements Model {
    id: number;
    name: string;
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;
}
