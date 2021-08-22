export {};

const fs = require("fs");
const path = require("path");
const allUsersJson = path.resolve(__dirname, "./data/users.json");

const readAllUsers = () => {
    try {
      const users = fs.readFileSync(allUsersJson);
      return JSON.parse(users);
    } catch (error) {
      console.error(error);
    }
  };


export class User {
    email: string;
    role: string;
    password: string;
    username: string;
    cart?: Array<Cart>; //want to be optional

    constructor(email: string,  role:string, password: string, username: string) {
        this.email = email;
        this.role = role;
        this.password = password;
        this.username = username;
        this.cart = [];
    }
}



export class Users{
    allUsers: Array<User>;

    constructor(){
        this.allUsers = readAllUsers();
    }

    addNewUser(user){
      this.allUsers.push(user);
      this.writeAllUsers();
    }

    writeAllUsers(){
      fs.writeFileSync(allUsersJson, JSON.stringify(this.allUsers));
    }
}