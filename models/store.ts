import { Product } from "./products";

export { };

const fs = require("fs");
const path = require("path");
const allStoresJSON = path.resolve(__dirname, "./data/stores.json");
const { v4: uuidv4 } = require("uuid");

interface Store {
  id: string;
  section: string;
  products: Array<Products>;

}

export const readAllStores = () => {
  try {
    const stores = fs.readFileSync(allStoresJSON);
    return JSON.parse(stores);
  } catch (error) {
    console.error(error);
  }
};



export function addProductToStore(body) {
  const allStores: any = readAllStores()
  const findStore = allStores.find(store => store.store === body.store);
  const {store, ...rest} = body;
  if (findStore === undefined) {
    const newStore = {
      id: uuidv4(),
      store: body.store,
      allProducts: [rest]
    }
    allStores.push(newStore)
  } else {
    findStore.allProducts.push(rest);
  }
  writeAllUsers(allStores)

}

export function deleteProductToStore(id:string, findStore:string){
  let allStores: any = readAllStores()
  const store = allStores.find(store => store.store === findStore)
  const index = store.allProducts.findIndex(a=>a.id === id)
  store.allProducts.splice(index,1)
  writeAllUsers(allStores)
}

export function editProductToStore(id:string, store:string, body:Product){
  let allStores: any = readAllStores()
  const findStore = allStores.find(allstores => allstores.store === store)
  const findProduct = findStore.allProducts.find(product => product.id === id)
  findProduct.name = body.name;
  findProduct.description = body.description;
  findProduct.image = `../images/${store}/${body.image.split('\\')[2]}`
  findProduct.quantity = body.quantity;
  findProduct.price = body.price;
 writeAllUsers(allStores)
}

export function removeStock(cartBuy,store){
  let allStores: any = readAllStores()
  const getStore = allStores.find(st => st.store === store)
  
  cartBuy.forEach(element => {
     const product = getStore.allProducts.find(product => product.id === element.id);
     product.quantity-= +element.number
   });

   writeAllUsers(allStores)
}

export function writeAllUsers(writeToJSON) {
  fs.writeFileSync(allStoresJSON, JSON.stringify(writeToJSON));
}



