const form = <HTMLElement>document.querySelector('#main')
const btnTrash = <HTMLElement>document.querySelector('.main__products__product--actions--trash')

form.addEventListener('submit', addProductOnDom)



async function addProductOnDom(ev) {
    ev.preventDefault();

    let { name, description, image, quantity, price } = ev.target.elements

    name = name.value
    description = description.value
    image = image.value
    quantity = quantity.valueAsNumber
    price = price.valueAsNumber

    const store = location.search.substr(1).split("=")[2]

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
    alert(ok)
    renderAllProducts(allProducts)

    bgModal.classList.remove('bg-active')
}


async function getAllProducts() {
    const store = location.search.substr(1).split("=")[2]
    const response = await axios.get(`/store/getStore/${store}`)
    const { data } = response
    if (data.allStores) renderAllProducts(data.allStores.allProducts)

}




function renderAllProducts(allProducts) {
    let html: string = "";
    const rootProducts = document.querySelector('#rootProducts')

    console.log(allProducts)

    allProducts.forEach(products => {
        html += `
        <div class="main__products">
                     <div class="main__products__product">
                     <img src="${products.image}" alt="${products.name}"  style = "width:200px; height:200px">
                         <div class = "main__products__product--name">
                             <span>${products.name} - ${products.description}</span>
                         </div>
                         <div class="main__products__product--numbers">
                             <span>Stock: ${products.quantity}</span>
                             <span>₪ ${products.price}</span>
                         </div>
                         <div class="main__products__product--actions">
                         <i class="fas fa-user-edit main__products__product--actions--edit" onclick='editProduct("${products.id}")'></i>
                         <i class="fas fa-trash main__products__product--actions--trash" onclick='deleteProduct("${products.id}")'></i> 
                         </div>
                     </div>
        </div>
                 `
    });

    rootProducts.innerHTML = html
}


async function deleteProduct(id) { 
    try {
        if (confirm("Do you want to delete this product?")) {
            alert('Delete product')
            await axios.delete(`product/deleteProduct/${id}`)
            getAllProducts()
        } else {
            alert('Delete Cancelled!')
        }
    } catch (e) {
        alert(e)
    }
}