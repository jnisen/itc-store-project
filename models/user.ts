export {};

const fs = require("fs");
const path = require("path");
const allUsersJson = path.resolve(__dirname, "./data/users.json");
const { v4: uuidv4 } = require("uuid");

export const readAllUsers = () => {
    try {
      const users = fs.readFileSync(allUsersJson);
      return JSON.parse(users);
    } catch (error) {
      console.error(error);
    }
  };


export class User {
    username: string;
    email: string;
    password: string;
    id: string;
    role: string;
    store: string
    cart: Array<Cart>;
    cartBuy: Array<Cart>; //want to be optional

    constructor(username: string,email: string, password: string) {
        this.username = username;  
        this.email = email;
        this.password = password;
        this.id = uuidv4();
        
    }
}



export class Users{
    allUsers: Array<User>;

    constructor(){
        this.allUsers = readAllUsers();
    }

    addCart(id:string, body){
      const user = this.findUserById(id);
      user.cart.push(body);
      this.writeAllUsers()

    }

    addNewUser(user:User){
      this.allUsers.push(user);
      this.writeAllUsers();
    }

    buyCart(idUser:string){
      const user = this.findUserById(idUser);
      if (user.cartBuy === undefined) user.cartBuy = user.cart
      else user.cartBuy.push(user.cart)
      user.cart = []
      this.writeAllUsers()
    }

    editCar(idUser:string, body, id){
      const user = this.findUserById(idUser);
      const findProductOnCart = user.cart.find(product=>product.id === id)
      findProductOnCart.number = body.number;
      this.writeAllUsers();
      
    }

    deleteProductOnCart(idProduct, idUser){
      let user = this.findUserById(idUser);
      user.cart = user.cart.filter(product=>product.id !== idProduct)
      this.writeAllUsers();
      return user
    }

    findUserById(id:string){
      const user = this.allUsers.find(user=>user.id === id);
      return user
    }

    writeAllUsers(){
      fs.writeFileSync(allUsersJson, JSON.stringify(this.allUsers));
    }
}