
//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")


btnReturn.addEventListener("click", returnHomePage)


async function getProduct(ev) {
    ev.preventDefault();
    const pathId = location.search.substr(1).split("=")[1]
    const id = pathId.split("?")[0]
    const response = await axios.get(`product/getProduct/${id}`)
    const { data } = response

    renderProduct(data)
}

function renderProduct(data) {

    const rootProducts = document.querySelector('#rootProduct') as HTMLDivElement
    let html: string = ''

    const { name, description, image, quantity, price } = data.Product

    html += `<img src="${image}" width="400" height="400" alt="${name}" class="name">
            <div class="rootProduct__info">
            <span class="name">Name: ${name}</span>
            <span class="description">Description: ${description}</span>
            <span class="price">Price: ₪ ${price}</span>
            <span class="quantity">Stock: ${quantity}</span>
            </div>
            </div>`

    rootProducts.innerHTML = html

}


async function returnHomePage() {
    const store = location.search.substr(1).split("=")[2]
    const response = await axios.get('/user/readCookie')
    const { data } = response
    const localhost = window.location.origin
    window.location.replace(`${localhost}/main.html?email=${data.user.email}?store=${store}`)
    //    window.location.href = `main.html?email=${data.user.email}?store=${store}`
}

