class User {
    email: string;
    role: string;
    password: string;
    username: string;
    cart?: Array<Cart>; //want to be optional

    constructor(email: string,  role:string, password: string, username: string, cart?: Array<Cart>) {
        this.email = email;
        this.role = role;
        this.password = password;
        this.username = username;
        this.cart = cart
    }
}



class allUsers{
    allUsers: Array<User>;

    constructor(allUsers: Array<User>){
        //
    }
}