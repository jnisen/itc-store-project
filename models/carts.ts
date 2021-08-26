export class Cart {
    id:string
    cart: Array<Products>
    date: Date
    
}


const fs = require("fs");
const path = require("path");
const allStoresJSON = path.resolve(__dirname, "./data/carts.json");



export const readAllStores = () => {
    try {
      const stores = fs.readFileSync(allStoresJSON);
      return JSON.parse(stores);
    } catch (error) {
      console.error(error);
    }
  };


  export function addCart(newCart){
        
      console.log(newCart);
      writeAllCarts(newCart)
  }

  export function writeAllCarts(writeToJSON) {
    fs.writeFileSync(allStoresJSON, JSON.stringify(writeToJSON));
  }