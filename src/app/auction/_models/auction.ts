import { AuctionType, AuctionComment, Category } from "./index";
import { Product } from "../_interfaces";
import { Model } from "../../_interfaces";
import { User, AdministrativeDivision } from "../../_models";
import { environment } from "../../../environments/environment";

export class Auction implements Model {
    id: number;
    end_date: number;
    bargain_type: AuctionType;
    start_price: string;
    current_price: string;
    name: string;
    description: string;
    image: string;
    products: Product[];
    seen: number;
    participants: User[];
    participants_count: number;
    comments: AuctionComment[];
    category: Category;
    address: AdministrativeDivision;
    full_address: string;
    created_by: User;
    updated_by: User;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_deleted: boolean;

    get author(): User{
        return this.created_by;
    }

    hasPhoto(): boolean{
        return this.image !== null;
    }

    // getFormattedDate?(date: string): string{
    //     var d = new Date(date);
    //     var year = d.getFullYear();
    //     var month = d.getMonth().toString();
    //     month = month.length == 1 ? '0' + month : month;
    //     var day = d.getDate().toString();
    //     day = day.length == 1 ? '0' + day : day;
    //     var h = d.getHours().toString();
    //     h = h.length == 1 ? '0' + h : h;
    //     var m = d.getMinutes().toString();
    //     m = m.length == 1 ? '0' + m : m;
    //     var s = d.getSeconds().toString();
    //     s = s.length == 1 ? '0' + s : s;
    //     return year + '.' + month + '.' + day + ' ' + h + ':' + m + ':' + s;
    // }
}