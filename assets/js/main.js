
const fechaBase = eventos.currentDate;
const e = eventos.events;

const todos = [];
function agregaTarjeta(arreglo) {
    for (let i of e) {
        if (i.date < fechaBase) {

            i.description = `<p style="background-color:MediumSeaGreen; text-align:center;padding:10px; color:white">Finished </p> `;
            
        } 
         arreglo.unshift(i);
    }
    return arreglo;
}
agregaTarjeta(todos);

/* pruebas con tarjetas*/

tarjetas = armadoGaleria(tarjetas, todos);
contenedorTarjetas.innerHTML = tarjetas;


