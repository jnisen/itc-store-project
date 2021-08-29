//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")
const clickContainer = <HTMLElement>document.querySelector(".container")

//addEventListener
btnReturn.addEventListener("click", returnLoginPage)
clickContainer.addEventListener("click", sendToMainSports)

async function renderPage(ev){
    ev.preventDefault()
    
    const responseUser = await axios.get('/user/readCookie')
    let role = responseUser.data.user.role
    
    const inputMessage = document.querySelector('.message') as HTMLElement

    if (role === 'public') {
            
        inputMessage.innerText = 'Welcome To Jonathans Store, pick which store do you want to buy'
    }else{
        inputMessage.innerText = `Welcome ${responseUser.data.user.username} , pick which store do you want to work`
    }


}



async function sendToMainSports(ev) {
    ev.preventDefault();

    try {
        let store;
       

        if (ev.target.className.indexOf('container__store_') === -1) return

        if (ev.target.className === 'container__store__1 container__store') {
            store = { store: "football" }
        } else {
            store = { store: "tennis" }
        }

        const response = await axios.post('/user/addSection', store)

        const params = new URLSearchParams(window.location.search);
        const emailUser = params.get('email');

        const responseAllProducts = await axios.get(`/store/getStore/${store.store}`)
        const { data } = responseAllProducts

        const responseUser = await axios.get('/user/readCookie')
        let role = responseUser.data.user.role
        

        if (role === 'public') {
           
            if (data.allStores === undefined) throw new Error('No stock available')
            swal(`${response.data.ok}`, { icon: "success", button: false });
                setInterval(function () {
                    window.location.href = `main.html?email=${emailUser}?store=${store.store}`
                }, 1000);
            
        } else {
            swal(`${response.data.ok}`, { icon: "success", button: false });
            setInterval(function () {
                window.location.href = `main.html?email=${emailUser}?store=${store.store}`
            }, 1000);
        }
    } catch (e) {
        swal('Oops!', `${e}`, `error`)
    }

}


function returnLoginPage() {
    window.location.href = 'login.html'
}