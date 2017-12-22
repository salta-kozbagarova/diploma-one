import { AuctionType, AuctionComment } from "./index";
import { Product } from "../_interfaces";
import { Model } from "../../_interfaces";
import { User } from "../../_models";
import { environment } from "../../../environments/environment";

export class Auction implements Model {
    id: number;
    endDate: string;
    auctionType: AuctionType;
    startPrice: string;
    currentPrice: string;
    name: string;
    image: string;
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

    // get startPrice(): string{
    //     return this._startPrice + environment.currencySign;
    // }

    // set startPrice(startPrice: string){
    //     this._startPrice = startPrice;
    // }

    // get currentPrice(): string{
    //     return this._currentPrice + environment.currencySign;
    // }

    // set currentPrice(currentPrice: string){
    //     this._currentPrice = currentPrice;
    // }
}
