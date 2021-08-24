export {};

const fs = require("fs");
const path = require("path");
const allUsersJson = path.resolve(__dirname, "./data/products.json");
const { v4: uuidv4 } = require("uuid");

export const readAllProducts = () => {
    try {
      const products = fs.readFileSync(readAllProducts);
      return JSON.parse(products);
    } catch (error) {
      console.error(error);
    }
  };


export class Product {
    id: string;
    name: string;
    description: string;
    image: string; //url
    price: number;
    quantity: number;
    store:string; 

    constructor(id: string, name: string, description:string,image: string, price: number, quantity: number, store:string) {
       this.id = id;
       this.name = name;
       this.description = description;
       this.image = image;
       this.price = price;
       this.quantity = quantity;
       this.store = store;
    }
}

export class Products{
    allProducts: Array<Product>;

    constructor(){
        this.allProducts = readAllProducts();
    }

    addNewUser(product:Product){
      this.allProducts.push(product);
      this.writeProduct();
    }

    findProductById(id:string){
      const product = this.allProducts.find(product=>product.id === id);
      return product
    }

    writeProduct(){
      fs.writeFileSync(allUsersJson, JSON.stringify(this.allProducts));
    }
}