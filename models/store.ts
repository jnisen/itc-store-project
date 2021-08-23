export {};

const fs = require("fs");
const path = require("path");
const allStoresJSON = path.resolve(__dirname, "./data/stores.json");
const { v4: uuidv4 } = require("uuid");

export const readAllUsers = () => {
    try {
      const stores = fs.readFileSync(allStoresJSON);
      return JSON.parse(stores);
    } catch (error) {
      console.error(error);
    }
  };


//prefijada
  
export class Store{
    id:string;
    section:string;
    products:Array<Products>;
} 


export class Stores{
    allStores: Array<Store>;

    constructor(){
        this.allStores = allStoresJSON();
    }

    addNewProduct(product:Product, section:string){
      const store = this.allStores.find(store => store.section = section)  
      store.products.push(product);
      this.writeAllUsers();
    }

    writeAllUsers(){
      fs.writeFileSync(allStoresJSON, JSON.stringify(this.allStores));
    }
}
