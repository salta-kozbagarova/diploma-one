import { User } from "./";

export class AuthUser {
    user: User
    token: string;

    constructor(user, token){
        this.user = user;
        this.token = token;
    }
}