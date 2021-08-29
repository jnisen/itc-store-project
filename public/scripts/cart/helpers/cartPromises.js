function buyCartPromise(store) {
    return new Promise(function (resolve, reject) {
        fetch("/user/buyCart/" + store, {
            method: 'POST'
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(function (user) { resolve(user); });
            }
            else {
                return res.json().then(function (user) { swal('Oops!', "" + user.error, "error"); });
            }
        });
    });
}
function editCartPromise(idProduct, newNumber) {
    return new Promise(function (resolve, reject) {
        fetch("/user/editCartNow/" + idProduct, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNumber)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(function (user) { resolve(user); });
            }
            else {
                return res.json().then(function (user) { swal('Oops!', "" + user.error, "error"); });
            }
        });
    });
}
