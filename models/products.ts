interface Cart {
    id:string,
    cart: Array<Products>
    date: Date,
}


class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;

    constructor(id: string, name: string, description:string,image: string, price: number, quantity: number) {
       this.id = id;
       this.name = name;
       this.description = description;
       this.image = image;
       this.price = price;
       this.quantity = quantity;
    }
}

class Products{
    //json 
}