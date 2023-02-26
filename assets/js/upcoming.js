
const fechaBase = eventos.currentDate;
const futuros = [];
function upcoming(arreglo) {
    for (let i of eventos.events) {
        if (i.date > fechaBase) {
            arreglo.push(i);
        }
    }
    return arreglo;

}
upcoming(futuros);

/* pruebas con tarjetas*/

tarjetas = armadoGaleria(tarjetas, futuros);
contenedorTarjetas.innerHTML = tarjetas;
