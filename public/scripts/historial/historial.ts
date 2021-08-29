const btnReturn = document.querySelector('.btn-return');
const btnGraph = document.querySelector('.btn-graph');

btnReturn.addEventListener('click', returnMainPage)
btnGraph.addEventListener('click', sendGraph)


async function getHistorial(ev) {
    ev.preventDefault();

    try {
        const store = location.search.substr(1).split("=")[1]

        const response = await axios.get(`cart/historialCart/${store}`)

        renderAllCartsStore(response.data.allCarts)

    } catch (e) { alert(e) }
}

function renderAllCartsStore(allCarts) {
    try {

        let html: string = ''
        const historialRoot = document.querySelector('#historialRoot')

        if (!historialRoot) throw new Error('I wont be able to draw')

        let totalStore: number = 0

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

            const { date, name, description, image, total, username } = cart

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

    } catch (e) { alert(e) }
}


async function returnMainPage() {

    try {
        const responseUser = await axios.get('/user/readCookie')
        const { data } = responseUser

        const email = data.user.email
        const store = data.user.store

        const location = window.location.origin
        window.location.replace(`${location}/main.html?email=${email}?store=${store}`)

        // window.location.href = `http://localhost:3000/main.html?email=${email}?store=${store}`
    } catch (e) {
        alert(e)
    }
}

async function sendGraph() {
    try{
    const location = window.location.origin
    window.location.replace(`${location}/graph.html`)
}catch(e){ alert(e)}
}