//btn
const btnReturn = <HTMLElement>document.querySelector("#btn-return")


btnReturn.addEventListener("click", returHistorial)


async function getGraph(ev) {
    ev.preventDefault();

    try {
        const store = location.search.substr(1).split("=")[1]

        const response = await axios.get(`cart/historialCart/${store}`)

        renderGraph(response.data.allCarts)
    } catch (e) {
        alert(e)
    }

}

function renderGraph(data) {
    try {

        const arrayTotal = []
        const products = []

        const res = Array.from(data.reduce(
            (m, { name, total }) => m.set(name, (m.get(name) || 0) + total), new Map
        ), ([name, total]) => ({ name, total }));

        res.forEach(element => {
            products.push(element.name);
            arrayTotal.push(element.total)
        });

        const ctx = document.getElementById('myChart').getContext('2d') 
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: products,
                datasets: [{
                    label: 'Sales Graph by Product in ₪',
                    backgroundColor: ['rgb(0,191,255)', 'rgba(75, 192, 192, 1)'],
                    borderColor: 'rgb(255, 99, 132)',
                    data: arrayTotal,

                }]
            },

            options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0
                        }
                    }]
                }
            }

        });
    } catch (e) {
        alert(e)
    }
}

function returHistorial() {
    try{
    const location = window.location.origin
    window.location.replace(`${location}/historial.html`)
}catch(e){ alert(e)}
}