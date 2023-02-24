

/** pruebas */

const fechaBase = eventos.currentDate;
const pasados = [];
for (let i of eventos.events) {
    if (i.date < fechaBase) {
        pasados.push(i);
        console.log(i)
    }

}

console.log(`fecha base: ${eventos.currentDate}`)
for (let i of pasados) {
    console.log(`elemento ${i._id}, categoria: ${i.category}, fecha:${i.date}`)
}