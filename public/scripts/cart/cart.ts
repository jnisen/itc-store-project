const btnReturn = document.querySelector('.btn-return');

btnReturn.addEventListener('click', returnMainPage)

async function getCart(event) {
    event.preventDefault();
    try {
        const store = location.search.substr(1).split("=")[1]

        const seeCart = await axios.get(`/user/seeCartStore/${store}`)
        const { data } = seeCart

        renderCart(data.cart)
    } catch (e) {
        alert(e)
    }
}

function renderCart(data) {

    const cartRoot = document.querySelector('#cartRoot') as HTMLElement

    try {

        let totalCart: number = 0;

        let html: string = ''
        if (data.length > 0) {
            html += `<div class="cartRoot__table"><table id="cart">
        <thead>
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>SubTotal</th>
        <th><th>
    <tr>
    </thead>
    <tbody>`


            data.forEach(cart => {

                const { id, name, description, image, number, price, total } = cart

                totalCart += number * price

                html += `<tr>
                      <td> <img src="${image}" alt="${name}" style = "width:70px; height:70px"</td>
                        <td>${name}</td>
                        <td>${description}</td>
                        <td>${number}</td>
                        <td>₪ ${price}</td>
                        <td>₪ ${total}</td>
                        <td><i class="fa fa-edit btn-edit" onclick='editQuantityCart("${id}","${number}")' title="Edit Item" style="cursor:pointer"></i></td>   
                        <td><i class="fa fa-trash" onclick='deleteProductOnCart("${id}")' title="Delete Item" style="cursor:pointer"></i></td>   
                 </tr> `
            });

            html += `       </tbody>
                    <tfoot>
                            <tr>
                        <th id="total" colspan="5" style="text-align:right;">Total :</th>
                             <td> ₪ ${totalCart}</td>
                            <th colspan="2" ></th>
                         </tr>
                    </tfoot>
                    </table>
                 </div>
                    <div class="cartRoot__finalstep">
                        <button onclick='buyCart()'>Buy Cart</button>
                 </div>`




        } else {
            setInterval(function () { returnMainPage() }, 1000);

        }

        cartRoot.innerHTML = html
    } catch (e) {
        alert(e)
    }
}




async function returnMainPage() {

    try {
        const responseUser = await axios.get('/user/readCookie')
        const { data } = responseUser

        const email = data.user.email
        const store = data.user.store

        const location = window.location.origin
        window.location.replace(`${location}/main.html?email=${email}?store=${store}`)
    } catch (e) {
        alert(e)
    }
    // window.location.href = `http://localhost:3000/main.html?email=${email}?store=${store}`


}

