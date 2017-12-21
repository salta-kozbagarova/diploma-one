import { AuctionType, AuctionComment } from "./index";
import { Product } from "../_interfaces";
import { Model } from "../../_interfaces";
import { User } from "../../_models";

export class Auction implements Model {
    id: number;
    endDate: string;
    auctionType: AuctionType;
    startPrice: number;
    currentPrice: string;
    products: Product[];
    seen: number;
    participants: User[];
    participantsCount: number;
    comments: AuctionComment[];
    createdBy: User;
    updatedBy: User;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
}
