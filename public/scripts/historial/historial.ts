const btnReturn  = document.querySelector('.btn-return');

btnReturn.addEventListener('click', returnMainPage)


async function getHistorial(ev) {
    ev.preventDefault();

    const store = location.search.substr(1).split("=")[1]

    const response = await axios.get(`cart/historialCart/${store}`)

    renderAllCartsStore(response.data.allCarts)

    



}

function renderAllCartsStore(allCarts){
    let html:string =''
    const historialRoot = document.querySelector('#historialRoot')

    let totalStore:number = 0
    
    html += `<div class="historial__table"><table id="historial">
        <thead>
    <tr>
        <th>Date</th>
        <th>Buyer</th>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>SubTotal</th>
    <tr>
    </thead>
    <tbody>`


    allCarts.forEach(cart => {

            const { date, name, description, image, total, username} = cart

            totalStore += total 

            html += `<tr>
                    <td>${date}</td>
                    <td>${username}</td>
                      <td> <img src="${image}" alt="${name}" style = "width:70px; height:70px"</td>
                        <td>${name}</td>
                        <td>${description}</td>
                        <td>₪ ${total}</td>   
                 </tr> `
        });

        html += `       </tbody>
                    <tfoot>
                            <tr>
                        <th id="total" colspan="5" style="text-align:right;">Total :</th>
                             <td> ₪ ${totalStore}</td>
                         </tr>
                    </tfoot>
                    </table>
                 </div>`



                 historialRoot.innerHTML = html


}


async function returnMainPage(){
    
    const responseUser = await axios.get('/user/readCookie')
    const {data} = responseUser
    
    const email = data.user.email
    const store = data.user.store

    window.location.href = `http://localhost:3000/main.html?email=${email}?store=${store}`


}