
const fechaBase = eventos.currentDate;
const pasados = [];

function passed(arreglo) {
    for (let i of eventos.events) {
        if (i.date < fechaBase) {
            i.description = `<p style="background-color:Tomato; padding:10px; color:white">Finished </p> `;
            arreglo.push(i);
        }
    }
    return arreglo;

}
passed(pasados);

/* pruebas con tarjetas*/

tarjetas = armadoGaleria(tarjetas, pasados);
console.log(pasados);
contenedorTarjetas.innerHTML = tarjetas;

