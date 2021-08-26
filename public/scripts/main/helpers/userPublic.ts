let count = 0;
async function addProductCart(id, name, description, image, price){

    const pathBtnEdit = `.btnedituser${id}`
    const pathBtnAdd = `.btnadduser${id}`

    const btnAddUser = document.querySelector(pathBtnAdd) as HTMLButtonElement;
    const btnEditUser = document.querySelector(pathBtnEdit) as HTMLButtonElement;

    btnEditUser.hidden = false;
    btnAddUser.hidden = true;

    const inputCount = document.getElementById(`${id}`) as HTMLInputElement;
    const number = inputCount.value

    const addCart = document.querySelector('.addCart') as HTMLElement
    count++;
    addCart.innerText= `${count}`

    let total = +number * price

    const addCartForNow = {
        id:id,
        name:name,
        description:description,
        image:image,
        price:price,
        number:number,
        total: total,
    }
    
    const responseUser = await axios.get('/user/readCookie')
    let idUser =  responseUser.data.user.id
    
   const response  = await addCartPromise(addCartForNow,idUser)
    

}


async function editQuantityCart(id){

    const inputCount = document.getElementById(`${id}`) as HTMLInputElement;

    const newNumber = {
        number:inputCount.value
    }

    const responseUser = await axios.get('/user/readCookie')
    let idUser =  responseUser.data.user.id

   const response = await editCartPromise(idUser, id, newNumber)
    console.log(response)
}

//clousures

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
                return res.json().then(user => { swal ( 'Oops!',`${user.error}` , `error`) })
            }
        })
    })
}

function editCartPromise(idUser,idProduct, newNumber) {
    return new Promise((resolve, reject) => {
        fetch(`/user/editCartNow/${idUser}/${idProduct}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNumber)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(user => { resolve(user) });
            } else {
                return res.json().then(user => { swal ( 'Oops!',`${user.error}` , `error`) })
            }
        })
    })
}