import { Model } from "../../_interfaces";
import { User } from "../../_models";
import { Auction } from './index';

export class AuctionComment implements Model {
    id:number;
    auction_id: number;
    auction: Auction;
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;

    getAuthor(): User{
        return this.created_by;
    }
}
