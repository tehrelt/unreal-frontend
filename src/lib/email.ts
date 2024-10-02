export class Email {

    user: string
    host: string 

    constructor(email: string) {
        this.user = email.split('@')[0]
        this.host = email.split('@')[1]
    }
}
