function addRegisterPromise(newUser) {
    return new Promise(function (resolve, reject) {
        fetch('/user/addNewUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(function (user) { resolve(user); });
            }
            else {
                return res.json().then(function (user) { alert(user.error); });
            }
        });
    });
}
