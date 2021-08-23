//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")
//const clickFootball = <HTMLElement>document.querySelector(".container__store__1")
const clickContainer  = <HTMLElement>document.querySelector(".container")

//addEventListener
btnReturn.addEventListener("click", returnLoginPage)
//clickFootball.addEventListener("click", sendToMainFootball)
clickContainer.addEventListener("click", sendToMainSports)

// async function sendToMainFootball(ev){
//     ev.preventDefault()

//     const response = await axios.post('/user/addSection', {store:'football'})
//     const data = response.data
//     alert(data.ok)
    
//     const params = new URLSearchParams(window.location.search);
//     const emailUser = params.get('email');
    
//     window.location.href = `main.html?email=${emailUser}/football`

// }

async function sendToMainSports(ev){
    ev.preventDefault();

    let store;

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
    
    window.location.href = `main.html?email=${emailUser}/${store.store}`
}






function returnLoginPage() {
    window.location.href = 'login.html'
}