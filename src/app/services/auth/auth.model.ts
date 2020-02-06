export class Credential {
    email: string;
    password: string;

    constructor(email: string, pwd: string) {
        this.email = email;
        this.password = pwd;
    }
}
