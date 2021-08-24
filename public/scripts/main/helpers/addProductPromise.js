function addProductPromise(newProduct, store) {
    return new Promise(function (resolve, reject) {
        fetch("/product/addNewProduct/" + store, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(function (product) { resolve(product); });
            }
            else {
                return res.json().then(function (product) { alert(product.error); });
            }
        });
    });
}
