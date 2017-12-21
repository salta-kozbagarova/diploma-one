import { Model } from "../../_interfaces";
import { User } from "../../_models";
import { Auction } from './index';

export class AuctionComment implements Model {
    id:number;
    auction: Auction;
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;

    getAuthor(): User{
        return this.createdBy;
    }
}
