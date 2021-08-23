

class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    store:string; //definir que store estoy

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

class Products{
    //json 
}