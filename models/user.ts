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
    cart?: Array<Cart>; //want to be optional

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

    addNewUser(user:User){
      this.allUsers.push(user);
      this.writeAllUsers();
    }

    findUserById(id:string){
      const user = this.allUsers.find(user=>user.id === id);
      return user
    }

    writeAllUsers(){
      fs.writeFileSync(allUsersJson, JSON.stringify(this.allUsers));
    }
}