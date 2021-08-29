export { };

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
  image: string;
  price: number;
  quantity: number;
  store: string;

  constructor(name: string, description: string, image: string, price: number, quantity: number, store: string) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.store = store;
    this.id = uuidv4();
  }
}

export class Products {
  allProducts: Array<Product>;

  constructor() {
    this.allProducts = readAllProducts();
  }

  addNewProduct(product: Product) {
    this.allProducts.push(product);
    this.writeProduct();
  }

  deleteProduct(id: string): string {
    const store = this.allProducts.find(product => product.id === id).store
    this.allProducts = this.allProducts.filter(product => product.id !== id)
    this.writeProduct();
    return store
  }

  editProduct(id: string, store: string, body: Product) {
    const product = this.findProductById(id)
    product.name = body.name;
    product.description = body.description;
    product.image = `../images/${store}/${body.image.split('\\')[2]}`
    product.quantity = body.quantity;
    product.price = body.price;
    this.writeProduct();
  }

  editProductCart(cartBuy) {
    cartBuy.forEach(cart => {
      const product = this.allProducts.find(product => product.id === cart.id);
      product.quantity -= +cart.number
    });
    this.writeProduct();
  }

  findProductById(id: string): Product {
    const product = this.allProducts.find(product => product.id === id);
    return product
  }

  findStore(store: string) {
    const findStore = this.allProducts.filter(product => product.store === store);
    return findStore
  }

  searchProduct(searchTermReg: any, store: string) {
    const findStore = this.findStore(store)
    const productName = findStore.filter(elem => searchTermReg.test(elem.name))
    return productName
  }

  writeProduct() {
    fs.writeFileSync(allProductsJSON, JSON.stringify(this.allProducts));
  }
}