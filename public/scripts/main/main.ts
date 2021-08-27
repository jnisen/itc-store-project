
interface Product{
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

    if (data.allStores) renderAllProducts(data.allStores.allProducts)

    // const responseUser = await axios.get('/user/readCookie')
    // let role = responseUser.data.user.role

}

async function renderAllProducts(allProducts:Array<Product>) {
    let html: string = "";
    const rootProducts = document.querySelector('#rootProducts')


    const btnAdd = document.querySelector('.btn-add') as HTMLButtonElement

    const responseUser = await axios.get('/user/readCookie')
    let role = responseUser.data.user.role

    if (role === 'admin') {
        btnAdd.style.display = 'block'
    } else {
        btnAdd.style.display = 'none'
        html += `<div>
                <span>Carrito<i class="fas fa-shopping-cart"></i><span>
                <span class="addCart" style="color:brown">0</span>  
                <button onclick='toCarrito(event)'>See Cart</button>
                </div>
                <div class="main__products">`
    }

    allProducts.forEach(async products => {

        if (products.quantity == 0) {
            await axios.delete(`product/deleteProduct/${products.id}`)
        } else {

            html += `
                <div class="main__products__product" >
                     <img src="${products.image}" alt="${products.name}" style = "width:200px; height:200px" onclick='sendProduct("${products.id}")'>
                         <div class = "main__products__product--name">
                             <span>${products.name} - ${products.description}</span>
                         </div>
                         <div class="main__products__product--numbers">`

            if (role === 'admin') {
                html += `<span class="stock">Stock: ${products.quantity}</span>`
            } else {
                html += `<span>Count: <input type="number" id="${products.id}" name="countproducts" value="1" min="1" max="${products.quantity}">`
            }
            html += `<span>₪ ${products.price}</span>
                         </div>
                         <div class="main__products__product--actions">
                        
                         `

            if (role === 'admin') {
                html += `  <i class="fas fa-user-edit main__products__product--actions--edit" onclick='findProduct("${products.id}")'></i>
                          <i class="fas fa-trash main__products__product--actions--trash" onclick='deleteProduct("${products.id}")'></i> `
            } else {
                html += `<button class="btnadduser${products.id}" onclick='addProductCart("${products.id}","${products.name}","${products.description}","${products.image}","${products.price}")'>Add Cart</button>
                    <button class= 'btnedituser${products.id}' onclick='editQuantityCart("${products.id}")' hidden >Edit Quantity</button>`
            }

            html += `</div></div>`
        }
    });



    rootProducts.innerHTML = html

    if (role === 'public') {

        const addCart = document.querySelector('.addCart') as HTMLElement
        addCart.innerText = `${responseUser.data.user.cart.length}`
    }

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