
async function getCart(event){
    event.preventDefault();

    const responseUser = await axios.get('/user/readCookie')
    let idUser =  responseUser.data.user.id

    const getProduct = await axios.get(`/user/getAllProducts/${idUser}`)
    const {data} = getProduct

   renderCart(data.cart)
}

function renderCart(data){

    const cartRoot = document.querySelector('#cartRoot') as HTMLElement 

    let html:string = ''
    if (data.length > 0) {
        html += `<table id="cart">
        <thead>
    <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
        <th><th>
    <tr>
    </thead>
    <tbody>`


        data.forEach(cart => {

            const { id, name, description, image, number, price, total} = cart

            html += `<tr>
                      <td> <img src="${image}" alt="${name}" style = "width:70px; height:70px"</td>
                        <td>${name}</td>
                        <td>${description}</td>
                        <td>${number}</td>
                        <td>${price}</td>
                        <td>${total}</td>
                        <td><i class="fa fa-edit" onclick='editProduct("${id}")' title="Edit Item" style="cursor:pointer"></i></td>   
                        <td><i class="fa fa-trash" onclick='deleteProductOnCart("${id}")' title="Delete Item" style="cursor:pointer"></i></td>   
                 </tr> `
        });

        html += `</tbody></table>
                 <button onclick='buyCart()'>Buy Cart</button> `
    } else {
        let html = ''
    }

    cartRoot.innerHTML = html
}


async function deleteProductOnCart(id){

    const responseUser = await axios.get('/user/readCookie')
    let idUser =  responseUser.data.user.id

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
                const response = await axios.delete(`/user/deleteProductOnCart/${id}/${idUser}`)
                const {data} = response
                const {ok, cart} = data
                swal(`${ok}`, "", "success")
                renderCart(cart)
                //si el cart esta vacio, vuelva a la pagina de atras
            } else {
                swal("Delete Cancelled!", "", "success");
            }
        });
}


async function buyCart(){
    const responseUser = await axios.get('/user/readCookie')
    let idUser =  responseUser.data.user.id

    const response = await buyCartPromise(idUser)
    swal(`${response.ok}`, {
        icon: "success",
        button: false,
    });
}


function buyCartPromise(idUser) {
    return new Promise((resolve, reject) => {
        fetch(`/user/buyCart/${idUser}`, {
            method: 'POST',
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { swal ( 'Oops!',`${user.error}` , `error`) })
            }
        })
    })
}