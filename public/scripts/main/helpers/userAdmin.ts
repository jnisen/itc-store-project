const form = <HTMLElement>document.querySelector('#main')
const btnTrash = <HTMLElement>document.querySelector('.main__products__product--actions--trash')
const btnOpenModalToEdit = <HTMLElement>document.querySelector('.main__products__product--actions--edit')
const btnEdit = <HTMLButtonElement>document.querySelector('.btn-edit')
const inputSearch = <HTMLInputElement>document.querySelector('#search')

form.addEventListener('submit', addProductOnDom)
btnEdit.addEventListener('click', editProduct)
inputSearch.addEventListener('keyup', searchProduct)


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


function deleteProduct(id:string) {

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


async function findProduct(id:string) {
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
        if (response.data.length === 1) renderAllProductsAdmin([response.data.allProducts])
        else renderAllProductsAdmin(response.data.allProducts)
    } else {
        getAllProducts()
    }



}