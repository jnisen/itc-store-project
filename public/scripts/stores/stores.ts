//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")
const clickContainer  = <HTMLElement>document.querySelector(".container")

//addEventListener
btnReturn.addEventListener("click", returnLoginPage)
clickContainer.addEventListener("click", sendToMainSports)


async function sendToMainSports(ev){
    ev.preventDefault();

    let store;

    
    if (ev.target.className.indexOf('container__store_') === -1) return

    if(ev.target.className === 'container__store__1 container__store'){
         store = {store:"football"}
    }else{
         store = {store:"tennis"}
    }
    
    const response = await axios.post('/user/addSection', store)
    const data = response.data
    alert(data.ok)
    
    const params = new URLSearchParams(window.location.search);
    const emailUser = params.get('email');
    
    window.location.href = `main.html?email=${emailUser}?store=${store.store}`
}


function returnLoginPage() {
    window.location.href = 'login.html'
}