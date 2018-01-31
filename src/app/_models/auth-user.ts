export class AuthUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    token: string;

    constructor(id, username, firstname, lastname, email, token){
        this.username = username;
        this.email = email;
        this.token = token;
    }
}