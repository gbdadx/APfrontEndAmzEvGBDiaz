
const fechaBase = eventos.currentDate;
const e = eventos.events;
const todos = [];
function probando(arreglo) {
    for (let i of e) {
        if (i.date < fechaBase) {
            i.description = `<p style="background-color:MediumSeaGreen; text-align:center;padding:10px; color:white">Finished </p> `;
        }
        arreglo.push(i);
    }
    return arreglo;
}
probando(todos);

/* pruebas con tarjetas*/

tarjetas = armadoGaleria(tarjetas, todos);
contenedorTarjetas.innerHTML = tarjetas;


/** console.log categorias */

const categorias = [];
for (let i of eventos.events) {
    if (!categorias.includes(i.category))
        categorias.push(i.category);


}
console.log(categorias)


