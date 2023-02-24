

/** pruebas */
for (let i of eventos.events) {
    console.log(i);
}

console.log(`imprime el primer evento${eventos.events[0]}`)
console.log()
for (let i of eventos.events) {
    console.log(`imprime fecha de cada evento${i.date}`);
}
const fechaBase = eventos.currentDate;
const futuros = [];

for (let i of eventos.events) {
    if (i.date > fechaBase) {
        futuros.push(i);
        console.log(i)
    }

}
console.log(`fecha base: ${eventos.currentDate}`)
for (let i of futuros) {
    console.log(`elemento ${i._id}, categoria: ${i.category}, fecha:${i.date}`)
}

