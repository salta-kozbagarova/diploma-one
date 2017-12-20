export class AuthUser {
    username: string;
    email: string;
    token: string;

    constructor(username, email, token){
        this.username = username;
        this.email = email;
        this.token = token;
    }
}