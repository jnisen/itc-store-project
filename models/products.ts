export {};

const fs = require("fs");
const path = require("path");
const allProductsJSON = path.resolve(__dirname, "./data/products.json");
const { v4: uuidv4 } = require("uuid");

export const readAllProducts = () => {
    try {
      const products = fs.readFileSync(allProductsJSON);
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

    constructor(name: string, description:string,image: string, price: number, quantity: number, store:string) {
       this.name = name;
       this.description = description;
       this.image = image;
       this.price = price;
       this.quantity = quantity;
       this.store = store;
       this.id = uuidv4();
    }
}

export class Products{
    allProducts: Array<Product>;

    constructor(){
        this.allProducts = readAllProducts();
    }

    addNewProduct(product: Product){
      this.allProducts.push(product);
      this.writeProduct();
    }

    findProductById(id:string){
      const product = this.allProducts.find(product=>product.id === id);
      return product
    }

    findStore(store:string){
      const findStore = this.allProducts.filter(product=>product.store === store);
      return findStore
    }

    writeProduct(){
      fs.writeFileSync(allProductsJSON, JSON.stringify(this.allProducts));
    }
}