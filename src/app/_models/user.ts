import { Role, UserPhone } from "./index";

export class User {
    id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    login: string;
    roles: Role[];
    phonenumbers: UserPhone[];

    get mainUserPhone(): UserPhone{
        var phone = this.phonenumbers.filter(obj => {return obj.is_main == true})[0];
        return phone;
    }
}