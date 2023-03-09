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
if (evento.assistance !== undefined) {
    document.getElementById('assistance').innerHTML = `Assitance: ${evento.assistance}`;
}


/* cambiar color tarjetas de eventos pasados */


const contElem = document.getElementById("date").innerText.substring(6);
const cont2 = document.getElementById("cont2");
const cont1 = document.getElementById("cont1");

console.log(contElem < evento.currentDate);
if (contElem < evento.currentDate) {
    cont1.style.backgroundColor = "Lavender";

    cont2.style.backgroundColor = "Lavender";
}



/* desaparecer el detalle al hacer click en la tarjeta */



function hideText() {
    const cont2 = document.getElementById("cont2");
    const cont1 = document.getElementById("cont1");
    const foto = document.getElementById("foto");

    cont2.style.display = "none";
    cont1.style.width = "120%";
    cont1.style.height = "120vh";
    foto.style.width = "100%";
    foto.style.height = "110vh";
    foto.style.backgroundImage = `url(${evento.image})`;

}
function showText() {
    const cont2 = document.getElementById("cont2");
    cont2.style.display = "block";
    cont2.style.position = "fixed";
    cont2.style.zIndex=4;
    foto.style.zIndex=-1;
    cont2.style.backgroundColor=" rgba(255,255, 255, 0.9)";


}

/* reaparecer el detalle al hacer cllick en la imagen*/
