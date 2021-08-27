async function addProductCart(id, name, description, image, price) {

    const btnSeeCart = document.querySelector('.btn-sent-cart') as HTMLButtonElement;

    btnSeeCart.disabled = false


    const inputCount = document.getElementById(`${id}`) as HTMLInputElement;
    const number = inputCount.value

    const addCart = document.querySelector('.addCart') as HTMLElement

    let total = +number * price

    const date = new Date();
    const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

    const addCartForNow = {
        id: id,
        date: dateString,
        name: name,
        description: description,
        image: image,
        price: price,
        number: number,
        total: total,
    }

    const responseUser = await axios.get('/user/readCookie')
    let idUser = responseUser.data.user.id

    let count = responseUser.data.user.cart.length

    const response:any = await addCartPromise(addCartForNow, idUser)
    const {ok} = response

    if (ok) {
        count++;
        addCart.innerText = `${count}`
    }

}

function addCartPromise(addCartForNow, idUser) {
    return new Promise((resolve, reject) => {
        fetch(`/user/addCartForNow/${idUser}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addCartForNow)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { swal('Oops!', `${user.error}`, `error`) })
            }
        })
    })
}

