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
