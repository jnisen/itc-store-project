export {};

const fs = require("fs");
const path = require("path");
const allUsersJson = path.resolve(__dirname, "./data/users.json");
const { v4: uuidv4 } = require("uuid");

const readAllUsers = () => {
    try {
      const users = fs.readFileSync(allUsersJson);
      return JSON.parse(users);
    } catch (error) {
      console.error(error);
    }
  };


export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    cart?: Array<Cart>; //want to be optional

    constructor(username: string,email: string, password: string , role:string) {
        this.id = uuidv4();
        this.username = username;  
        this.email = email;
        this.password = password;
        this.role = role;
        
    }
}



export class Users{
    allUsers: Array<User>;

    constructor(){
        this.allUsers = readAllUsers();
    }

    addNewUser(user:User){
      this.allUsers.push(user);
      this.writeAllUsers();
    }

    writeAllUsers(){
      fs.writeFileSync(allUsersJson, JSON.stringify(this.allUsers));
    }
}