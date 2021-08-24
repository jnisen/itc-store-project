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

export function writeAllUsers(writeToJSON) {
  fs.writeFileSync(allStoresJSON, JSON.stringify(writeToJSON));
}

