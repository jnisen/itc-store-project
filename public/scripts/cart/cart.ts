const btnReturn  = document.querySelector('.btn-return');

btnReturn.addEventListener('click', returnMainPage)

async function getCart(event) {
    event.preventDefault();

    const store = location.search.substr(1).split("=")[1]
   
    const seeCart = await axios.get(`/user/seeCartStore/${store}`)
    const {data} = seeCart

    renderCart(data.cart) 
}

function renderCart(data) {

    const cartRoot = document.querySelector('#cartRoot') as HTMLElement

    let totalCart:number = 0;

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
        setInterval(function(){returnMainPage()}, 1000);
        
    }

    cartRoot.innerHTML = html

}


async function deleteProductOnCart(id) {



    const store = location.search.substr(1).split("=")[1]

    swal({
        title: "Do you want to delete this product?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: {
            cancel: true,
            confirm: "Confirm"
        },
        dangerMode: true
    })
        .then(async (isConfirm) => {
            if (isConfirm) {
                const response = await axios.delete(`/user/deleteProductOnCart/${id}/${store}`)
                const { data } = response
                const { ok, cart } = data
                swal(`${ok}`, "", "success")
                renderCart(cart)
                //si el cart esta vacio, vuelva a la pagina de atras
            } else {
                swal("Delete Cancelled!", "", "success");
            }
        });
}


async function editQuantityCart(id:string, number:string){
    
    const store = location.search.substr(1).split("=")[1]

    swal(`You have ${number} , change the quantity here:`, {
        content: "input",
        buttons: {
            cancel: true,
            confirm: "Confirm"
        },
      }).then(async (value) => {
        if(value === null){
            swal("Edit Cancelled!", "", "success");
        }else{

            const newNumber = {
                number:+value,
                store:store,

            }
            const response = await editCartPromise(id, newNumber)
            renderCart(response)
    }
      });
}




async function buyCart() {
    const store = location.search.substr(1).split("=")[1]

    const response = await buyCartPromise(store)
    swal(`${response.ok}`, {
        icon: "success",
        button: false,
    });

    setInterval(function(){window.location.href = 'login.html'}, 2000);

   
}


function buyCartPromise(store) {
    return new Promise((resolve, reject) => {
        fetch(`/user/buyCart/${store}`, {
            method: 'POST',
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { swal('Oops!', `${user.error}`, `error`) })
            }
        })
    })
}


function editCartPromise(idProduct, newNumber) {
    return new Promise((resolve, reject) => {
        fetch(`/user/editCartNow/${idProduct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNumber)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { swal('Oops!', `${user.error}`, `error`) })
            }
        })
    })
}


async function returnMainPage(){
    
    const responseUser = await axios.get('/user/readCookie')
    const {data} = responseUser
    
    const email = data.user.email
    const store = data.user.store

    window.location.href = `http://localhost:3000/main.html?email=${email}?store=${store}`


}

