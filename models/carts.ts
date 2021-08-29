const fs = require("fs");
const path = require("path");
const allCartsJSON = path.resolve(__dirname, "./data/carts.json");

export class Cart {
  id: string
  cart: Array<Products>
  date: Date
  store: string
}



export const readAllCarts = () => {
  try {
    const allCarts = fs.readFileSync(allCartsJSON);
    return JSON.parse(allCarts);
  } catch (error) {
    console.error(error);
  }
};


export function addCart(newCart) {
  const allCarts = readAllCarts()
  allCarts.push(newCart)
  writeAllCarts(allCarts)
}

export function seeAllCartsStore(store) {
  const allCarts = readAllCarts()
  const carts = []
  allCarts.forEach(cart => {
    cart.cart.forEach(cartsbuys => {
      carts.push(cartsbuys)
    });
  })
  return carts

}

export function writeAllCarts(writeToJSON) {
  fs.writeFileSync(allCartsJSON, JSON.stringify(writeToJSON));
}

