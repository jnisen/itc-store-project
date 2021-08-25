
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
    let html:string = ''

    const {name, description, image, quantity, price} = data.Product

    html+= `<div>
    <span>${name}</span>
    <span>${description}</span>
            <img src="${image}" width="400" height="400" alt="${name}">
            <span>${quantity}</span>
            <span>${price}</span>
            </div>`

    rootProducts.innerHTML = html

}


async function returnHomePage() {
    const store = location.search.substr(1).split("=")[2]
    const response = await axios.get('/user/readCookie')
    const {data} = response
   window.location.href = `main.html?email=${data.email}?store=${store}`
}

//http://localhost:3000/main.html?email=jnisen@gmail.com?store=football