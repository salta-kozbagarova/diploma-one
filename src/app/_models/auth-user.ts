export class AuthUser {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    token: string;

    constructor(id, username, firstname, lastname, email, token){
        this.username = username;
        this.email = email;
        this.token = token;
    }
}