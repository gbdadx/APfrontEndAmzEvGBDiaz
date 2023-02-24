
const fechaBase = eventos.currentDate;
const pasados = [];
for (let i of eventos.events) {
    if (i.date < fechaBase) {
        pasados.push(i);
        console.log(i)
    }

}

/* pruebas con tarjetas*/
const contenedorTarjetas = document.getElementById("galeria")
let tarjetas = '';
for (const uno of pasados) {
    tarjetas += `<div class="col-12 col-md-5 col-lg-3 card" >
                        <div class="card-header">
                            <img src="${uno.image}" class="card-img-top" alt="${uno.name}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${uno.name}</h5>
                            <p class="card-text">${uno.description}</p>
                        </div>
                        <div class="card-footer px-2">
                        <span>Price: $ ${uno.price}</span>
                            <a href="./details.html" class="btn btn-primary ">Details</a>
                        </div>
                </div>`
}
contenedorTarjetas.innerHTML = tarjetas;