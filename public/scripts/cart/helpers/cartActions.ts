async function deleteProductOnCart(id) {

    try {


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
                } else {
                    swal("Delete Cancelled!", "", "success");
                }
            });
    } catch (e) {
        alert(e)
    }
}


async function editQuantityCart(id: string, number: string) {

    try {

        const store = location.search.substr(1).split("=")[1]

        swal(`You have ${number} , change the quantity here:`, {
            content: "input",
            buttons: {
                cancel: true,
                confirm: "Confirm"
            },
        }).then(async (value) => {
            if (value === null) {
                swal("Edit Cancelled!", "", "success");
            } else {

                const newNumber = {
                    number: +value,
                    store: store,

                }
                const response = await editCartPromise(id, newNumber)
                renderCart(response)
            }
        });
    } catch (e) {
        alert(e)
    }
}




async function buyCart() {

    try {
        const store = location.search.substr(1).split("=")[1]

        const response = await buyCartPromise(store)
        swal(`${response.ok}`, {
            icon: "success",
            button: false,
        });

        setInterval(function () {
            const location = window.location.origin
            window.location.replace(`${location}/login.html`)
            // window.location.href = 'login.html'
        }, 2000);
    } catch (e) { alert(e) }

}


