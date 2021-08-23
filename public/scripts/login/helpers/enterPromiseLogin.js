function enterPromiseLogin(user) {
    return new Promise(function (resolve, reject) {
        fetch('/user/cookie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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
