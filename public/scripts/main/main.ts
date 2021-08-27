
interface Product{
    id:string;
    name: string,
    description: string,
    image: string,
    quantity: number,
    price: number,
    store: string,
}

async function getAllProducts() {
    const h1 = document.querySelector('.h1') as HTMLElement
    const title = document.getElementsByTagName('title') as HTMLCollection
    const store = location.search.substr(1).split("=")[2]
    const capitalizeStore = store.charAt(0).toUpperCase() + store.slice(1)
    h1.innerText = `Welcome to the ${capitalizeStore} Store`
    title[0].innerHTML = `${capitalizeStore} Store`

    const responseAllProducts = await axios.get(`/store/getStore/${store}`)
    const { data } = responseAllProducts

    const responseUser = await axios.get('/user/readCookie')
    let role = responseUser.data.user.role

    if (role === 'admin'){
        if (data.allStores) renderAllProductsAdmin(data.allStores.allProducts)
    } else{
        if (data.allStores) renderAllProductsUser(data.allStores.allProducts,role)
    }

}


async function renderAllProductsAdmin(allProducts:Array<Product>) {
    let html: string = "";

    const rootProducts = document.querySelector('#rootProducts')

    const btnAdd = document.querySelector('.btn-add') as HTMLButtonElement
    btnAdd.style.display = 'block'
    btnAdd.style.margin = '2em auto'
    btnAdd.style.cursor = 'pointer'
   

    allProducts.forEach(async products => {

        // if (products.quantity == 0) {
        //     await axios.delete(`product/deleteProduct/${products.id}`)
        // } else {
            html += `
                <div class="rootProducts__productsAdmin">
                     <img src="${products.image}" alt="${products.name}" class="image" style = "width:200px; height:200px" onclick='sendProduct("${products.id}")'>   
                             <span class="name">${products.name}</span>
                             <span class="description">${products.description}</span>
                            <span class="stock">Stock: ${products.quantity}</span>
                             <span class="price">Price: ₪ ${products.price}</span>
                            <i class="fas fa-user-edit edit" onclick='findProduct("${products.id}")'></i>
                            <i class="fas fa-trash delete" onclick='deleteProduct("${products.id}")'></i> 
                        
                </div>`   
    });

    rootProducts.innerHTML = html

}


async function renderAllProductsUser(allProducts:Array<Product>, responseUser) {
    let html: string = "";
    const rootProducts = document.querySelector('#rootCarts')

    const btnAdd = document.querySelector('.btn-add') as HTMLButtonElement

        btnAdd.style.display = 'none'
        html += `<div class="carrito">
                    <span>Carrito<i class="fas fa-shopping-cart"></i><span>
                    <span class="addCart" style="color:brown">0</span>  
                    <button onclick='toCarrito(event)'>See Cart</button>
                </div>
                <div class="rootCarts__productsUser">`
    

    allProducts.forEach(async products => {

        // if (products.quantity == 0) {
        //     await axios.delete(`product/deleteProduct/${products.id}`)
        // } else {

            html += `
                
                <div class="rootCarts__productsUser__product">
                    
                    <span class="name">${products.name}</span>
                    <span class="description">${products.description}</span>
                    <img src="${products.image}" alt="${products.name}" class="image" style = "width:200px; height:200px" onclick='sendProduct("${products.id}")'>

                    <span class="stock">
                            Count: <input type="number" id="${products.id}" class="count" name="countproducts" value="1" min="1" max="${products.quantity}">
                    </span>
                    <span class="price">Price: ₪ ${products.price}</span>
                    <button class="btnadduser${products.id} btn-cart" onclick='addProductCart("${products.id}","${products.name}","${products.description}","${products.image}","${products.price}")'>Add Cart</button>
                    <button class= 'btnedituser${products.id}' onclick='editQuantityCart("${products.id}")' hidden >Edit Quantity</button>
                </div>`
        }
    );


    rootProducts.innerHTML = html

  

        const addCart = document.querySelector('.addCart') as HTMLElement
        addCart.innerText = `${responseUser.data.user.cart.length}`
    

}



async function sendProduct(id: string) {
    const store = location.search.substr(1).split("=")[2]
    window.location.href = `product.html?id=${id}?store=${store}`
}


//Read URL

function readURL(input:any): void {
    const image = document.querySelector('#img') as HTMLImageElement
    if (input.files && input.files[0]) {
        let reader: FileReader = new FileReader();

        reader.onload = (e) => {
            try {

                image.setAttribute("src", `${e.target.result}`)
            } catch (error) {
                console.error(error);
            }
            return e.target.result
        }
        reader.readAsDataURL(input.files[0])
    }
}


function toCarrito(event) {
    event.preventDefault();
    window.location.href = 'cart.html'
}