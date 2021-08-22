interface Cart {
    id:string,
    cart: Array<Products>
}


class Products {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;

    constructor(id: string, name: string, image: string, price: number, quantity: number) {
       this.id = id;
       this.name = name;
       this.image = image;
       this.price = price;
       this.quantity = quantity;
    }
}