class User {
    email: string;
    password: string;
    username: string;
    cart: Array<Cart>

    constructor(email: string, password: string, username: string, cart: Array<Cart>) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.cart = []
    }
}