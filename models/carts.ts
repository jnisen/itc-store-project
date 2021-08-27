const fs = require("fs");
const path = require("path");
const allCartsJSON = path.resolve(__dirname, "./data/carts.json");

export class Cart {
  id: string
  cart: Array<Products>
  date: Date
}

export const readAllCarts = () => {
  try {
    const stores = fs.readFileSync(allCartsJSON);
    return JSON.parse(stores);
  } catch (error) {
    console.error(error);
  }
};


export function addCart(newCart) {
  const allCarts = readAllCarts()
  allCarts.push(newCart)
  writeAllCarts(allCarts)
}

export function writeAllCarts(writeToJSON) {
  fs.writeFileSync(allCartsJSON, JSON.stringify(writeToJSON));
}