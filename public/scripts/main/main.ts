//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")

//addEventListener
btnReturn.addEventListener("click", returnLoginPage)


interface Product {
    id: string;
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

    const responseAllProducts = await axios.get(`/store/getStore/${store}`) // te dice que productos hay disponobles.
    const { data } = responseAllProducts

    const responseUser = await axios.get(`/user/readCookie`)
    let role = responseUser.data.user.role

    if (role === 'admin') {
        if (data.allStores) renderAllProductsAdmin(data.allStores.allProducts, store)
    } else {
        if (data.allStores) renderAllProductsUser(data.allStores.allProducts, store)
    }

}



async function renderAllProductsAdmin(allProducts: Array<Product>, store) {
    let html: string = "";

    const rootProducts = document.querySelector('#rootProducts')



    html += ` <div class="actions">
                    <input type="button" value="Add Product" class="btn-add"  onclick ='openModal()'>
                    <input type="button" value="Historial" class="btn-historial" onclick ='seeHistorial("${store}")'>
              </div>
    <div class = "rootProducts__admin">`

    allProducts.forEach(async products => {

        html += `
                <div class="rootProducts__admin__products">
                     <img src="${products.image}" alt="${products.name}" class="image" style = "width:200px; height:200px" onclick='sendProduct("${products.id}")'>   
                             <span class="name">${products.name}</span>
                             <span class="description">${products.description}</span>`
        if (products.quantity === 0) {
            html += `            <span class="stock red">Stock: ${products.quantity}</span>`
        } else {
            html += `            <span class="stock green">Stock: ${products.quantity}</span>`
        }
        html += `     
                             <span class="price">Price: ₪ ${products.price}</span>
                            <i class="fas fa-user-edit edit" onclick='findProduct("${products.id}")'></i>
                            <i class="fas fa-trash delete" onclick='deleteProduct("${products.id}")'></i> 
                        
                </div>
                `
    });

    html += `</div>`
    rootProducts.innerHTML = html

    const btnAdd = document.querySelector('.btn-add') as HTMLButtonElement
    btnAdd.style.display = 'block'

}

async function renderAllProductsUser(allProducts: Array<Product>, store) {
    let html: string = "";
    const rootProducts = document.querySelector('#rootCarts')

    html += `<div class="carrito">
                    <span>Carrito<i class="fas fa-shopping-cart"></i><span>
                    <span class="addCart" style="color:brown">0</span>  
                    <button onclick='toCarrito(event)' class="btn-sent-cart" disabled>See Cart</button>
                </div>
                <div class="rootCarts__productsUser">`


    allProducts.forEach(async products => {

        if (products.quantity > 0) {



            html += `
                
                <div class="rootCarts__productsUser__product">
                    
                    <span class="name">${products.name}</span>
                    <span class="description">${products.description}</span>
                    <img src="${products.image}" alt="${products.name}" class="image" style = "width:200px; height:200px" onclick='sendProduct("${products.id}")'>

                    <span class="stock">
                            Count: <input type="number" id="${products.id}" class="count" name="countproducts" value="1" min="1" max="${products.quantity}">
                    </span>
                    <span class="price">Price: ₪ ${products.price}</span>
                    <button class="btnadduser${products.id} btn-cart" onclick='addProductCart("${products.id}","${products.name}","${products.description}","${products.image}","${products.price}","${store}")'>Add Cart</button>
                </div>`
        }
    });


    rootProducts.innerHTML = html

    const addCart = document.querySelector('.addCart') as HTMLElement
    const btnSeeCart = document.querySelector('.btn-sent-cart') as HTMLButtonElement

    const seeCart = await axios.get(`/user/seeCartStore/${store}`)
    const { data } = seeCart

    if (data.cart.length > 0) {
        addCart.innerText = `${data.cart.length}`
        btnSeeCart.disabled = false

    } else {
        btnSeeCart.disabled = true
    }


}


async function sendProduct(id: string) {
    const store = location.search.substr(1).split("=")[2]
    const localhost = window.location.origin
    window.location.replace(`${localhost}/product.html?id=${id}?store=${store}`)
    // window.location.href = `product.html?id=${id}?store=${store}`
}

//Read URL

function readURL(input: any): void {
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
    const store = location.search.substr(1).split("=")[2]
    const localhost = window.location.origin
    window.location.replace(`${localhost}/cart.html?store=${store}`)
    // window.location.href = `cart.html?store=${store}`
}

function returnLoginPage() {
    const localhost = window.location.origin
    window.location.replace(`${localhost}/login.html`)
    // window.location.href = 'login.html'
}