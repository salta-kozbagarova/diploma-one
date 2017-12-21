import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class AuctionType implements Model {
    id: number;
    name: string;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}
