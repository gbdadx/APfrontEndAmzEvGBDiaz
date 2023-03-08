const evento = JSON.parse(decodeURIComponent(location.search.substring(1)).split('=')[1]);
console.log(evento)


document.getElementById("foto").style.backgroundImage = `url(${evento.image})`;

document.getElementById('name').innerHTML = evento.name;

document.getElementById('category').innerHTML = `Category: ${evento.category}`;
document.getElementById('date').innerHTML = `Date: ${evento.date}`;

document.getElementById('description').innerHTML = evento.description;

document.getElementById('price').innerHTML = `Price: $ ${evento.price} `;

document.getElementById('place').innerHTML = `Place: ${evento.place}`;

document.getElementById('capacity').innerHTML = `Capacity: ${evento.capacity}`;
document.getElementById('assistance').innerHTML = `Assitance: ${evento.assistance}`;


/* cambiar color tarjetas de eventos pasados */


const contElem = document.getElementById("date").innerText.substring(6);
const cont2 = document.getElementById("cont2");
const cont1 = document.getElementById("cont1");

console.log(contElem < eventos.currentDate);
if (contElem < eventos.currentDate) {
    cont1.style.backgroundColor = "Lavender";

    cont2.style.backgroundColor = "Lavender";
}




