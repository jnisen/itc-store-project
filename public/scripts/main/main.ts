const form = <HTMLElement>document.querySelector('#main')
const btnTrash = <HTMLElement>document.querySelector('.main__products__product--actions--trash')
const btnOpenModalToEdit = <HTMLElement>document.querySelector('.main__products__product--actions--edit')
const btnEdit = <HTMLButtonElement>document.querySelector('.btn-edit')
const inputSearch = <HTMLInputElement>document.querySelector('#search')

form.addEventListener('submit', addProductOnDom)
btnEdit.addEventListener('click', editProduct)
inputSearch.addEventListener('keyup', searchProduct)


//
let idProduct;

async function addProductOnDom(ev) {
    ev.preventDefault();
    const store = location.search.substr(1).split("=")[2]
    let { name, description, image, quantity, price } = ev.target.elements

    name = isNaN(name.value) ? name.value : parseInt(name.value)
    description = isNaN(description.value) ? description.value : parseInt(description.value)
    image = `../images/${store}/${image.value.split('\\')[2]}`
    quantity = quantity.valueAsNumber
    price = price.valueAsNumber


    const addNewProduct = {
        name: name,
        description: description,
        image: image,
        quantity: quantity,
        price: price,
        store: store,
    }

    const response: any = await addProductPromise(addNewProduct, store)
    const { ok, allProducts } = response
    swal(`${ok}`, "", "success")
    renderAllProducts(allProducts)

    bgModal.classList.remove('bg-active')
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

}



async function renderAllProducts(allProducts) {
    let html: string = "";
    const rootProducts = document.querySelector('#rootProducts')

    const responseUser = await axios.get('/user/readCookie')
    let role = responseUser.data.user.role


    const btnAdd = document.querySelector('.btn-add') as HTMLButtonElement

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

    allProducts.forEach(products => {

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
    });



    rootProducts.innerHTML = html

    if (role === 'public') {

        const addCart = document.querySelector('.addCart') as HTMLElement
        addCart.innerText = `${responseUser.data.user.cart.length}`
    }

}

function deleteProduct(id) {

    swal({
        title: "Do you want to delete this product?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: {
            cancel: true,
            confirm: "Confirm"
        },
        dangerMode: true,
    })
        .then(async (isConfirm) => {
            if (isConfirm) {
                const response = await axios.delete(`product/deleteProduct/${id}`)
                const { data } = response
                swal(`${data.ok}`, "", "success")
                getAllProducts()
            } else {
                swal("Delete Cancelled!", "", "success");
            }
        });

}

async function findProduct(id) {
    //popup
    const bgModal = document.querySelector('.modal-bg')
    const btnModalInput = <HTMLButtonElement>document.querySelector('.btn-modal')

    bgModal.classList.add('bg-active')
    btnEdit.style.display = 'block'
    btnModalInput.style.display = 'none'

    const response = await axios.get(`product/getProduct/${id}`)
    const { data } = response

    //Inputs
    const image = document.querySelector('#img')
    image.setAttribute("src", `${data.Product.image}`)
    let inputName = document.querySelector('#name') as HTMLInputElement
    let inputDescription = <HTMLElement>document.querySelector('#description') as HTMLInputElement
    let inputStock = <HTMLElement>document.querySelector('#quantity') as HTMLInputElement
    let inputPrice = <HTMLElement>document.querySelector('#price') as HTMLInputElement

    inputName.value = data.Product.name
    inputDescription.value = data.Product.description
    inputStock.value = data.Product.quantity
    inputPrice.value = data.Product.price


    idProduct = id


}

async function editProduct() {

    const inputName = document.querySelector('#name') as HTMLInputElement
    const inputDescription = <HTMLElement>document.querySelector('#description') as HTMLInputElement
    const inputStock = <HTMLElement>document.querySelector('#quantity') as HTMLInputElement
    const inputPrice = <HTMLElement>document.querySelector('#price') as HTMLInputElement
    const inputImage = <HTMLElement>document.querySelector('#image') as HTMLInputElement


    const editProduct = {
        name: inputName.value,
        description: inputDescription.value,
        image: inputImage.value,
        quantity: inputStock.valueAsNumber,
        price: inputPrice.valueAsNumber,

    }
    const store = location.search.substr(1).split("=")[2]

    const response = await editProductPromise(editProduct, store)
    swal(`${response.ok}`, "", "success")

    getAllProducts()

    bgModal.classList.remove('bg-active')

}

async function searchProduct(ev) {
    ev.preventDefault()
    const store = location.search.substr(1).split("=")[2]

    const searchProduct = inputSearch.value

    if (searchProduct.length > 0) {
        const response = await axios.get(`product/searchProduct/${store}/${searchProduct}`)
        if (response.data.length === 1) renderAllProducts([response.data.allProducts])
        else renderAllProducts(response.data.allProducts)
    } else {
        getAllProducts()
    }



}

async function sendProduct(id: string) {
    const store = location.search.substr(1).split("=")[2]
    window.location.href = `product.html?id=${id}?store=${store}`
}


//Read URL

function readURL(input): void {
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