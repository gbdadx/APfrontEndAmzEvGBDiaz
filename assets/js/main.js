/**
 
 */
/**
 * armado de tarjetas y galeria
 */

const contenedorTarjetas = document.getElementById("galeria");
let tarjetas = '';
function armadoGaleria(cadena, array) {
    for (const uno of array) {
        const cardId = `card-${uno._id}`;// crear un unico ID para cada tarjeta

        if (uno.date < eventos.currentDate) {
            cadena += `<div class="col-12 col-md-5 col-lg-3 card" id="${cardId}">
                        <div class="card-header" style="background-image:url(${uno.image}); background-size: cover;">
                           
                        </div>
                        <div class="card-body " style="background-color: Lavender;">
                            <h5 class="card-title">${uno.name}</h5>
                            <p class="card-text" style="background-color:LightSeaGreen; text-align:center;padding:10px; color:white">Finished </p> 
                        </div>
                        <div class="card-footer px-2 " style="background-color: Lavender;">
                        <span> ${uno.date}</span>
                        <a href="#" class="btn btn-primary more-info-btn" data-event="${encodeURIComponent(JSON.stringify(uno))}">More info</a> 
                             </div>
                </div>`
        } else {

            cadena += `<div class="col-12 col-md-5 col-lg-3 card" id="${cardId}">
                        <div class="card-header" style="background-image:url(${uno.image}); background-size: cover;">
                           
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${uno.name}</h5>
                            <p class="card-text">${uno.description}</p>
                        </div>
                        <div class="card-footer px-2">
                        <span> ${uno.date}</span>
                        <a href="#" class="btn btn-primary more-info-btn" data-event="${encodeURIComponent(JSON.stringify(uno))}">More info</a>

                        </div>
                </div>`};


    }
    return cadena;
}


const fechaBase = eventos.currentDate;

const todos = [];
function agregaTarjeta(arreglo) {
    for (let i of eventos.events) {
        arreglo.unshift(i);
    }
    return arreglo;
}

agregaTarjeta(todos);

contenedorTarjetas.innerHTML = armadoGaleria(tarjetas, todos);

goToDetails();


/**  
 * categorias, contenedor de checkboxes 
 */

let categorias = []; //arreglo de categorias
let categories = '';
const cajon = document.getElementById("caja");

for (let i of eventos.events) {
    if (!categorias.includes(i.category))
        categorias.push(i.category);
}

for (let i = 0; i < categorias.length; i++) { //esto es lo que modifica la label de los checkboxes
    categories += `<div class="form-check form-check-inline">
    <label class="form-check-label form-control-sm" ><span class="caja"></span>

        <input class="form-check-input" type="checkbox"  value=${categorias[i]}>${categorias[i]}</label>
</div>`;

}

cajon.innerHTML = categories;



/**
 * seleccionar cards con los checkboxes y la barra de busqueda
 */

// obtener todos los checkboxes
const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]');
let filteredEventsCheckboxes;
// agrega un eventlistener 'change' a cada checkbox   solo busca por check
categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', event => {
        // obtiene todos los checkboxes marcados-seleccionados
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

        if (checkedCheckboxes.length === 0) {
            // si ningun checkbox esta seleccionado, muestra todos los eventos
            contenedorTarjetas.innerHTML = armadoGaleria('', todos);
            goToDetails();

        } else {
            // consigue el valor de cada checkbox marcado
            const checkedValues = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);

            // filtra eventos basado en categorias marcadas-seleccionadas
            const filteredEvents = todos.filter(event => checkedValues.includes(event.category));

            if (filteredEvents.length === 0) {
                //no hay ningun filteredEvent ==> ningun evento coincide con la categoria marcada, no muestra nada
                contenedorTarjetas.innerHTML = nothingFoundCard;

            } else {
                // actualiza la galeria con los eventos filtrados
                contenedorTarjetas.innerHTML = armadoGaleria('', filteredEvents);
                goToDetails();

            }
        }
    });
});

// obtiene los elementos input y buton de search
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// agrega eventListener al boton search --- busca por barra de busqueda y check
searchButton.addEventListener('click', event => {
    // obtiene el texto de busqueda ingresado por el usuario
    const searchTerm = searchInput.value.trim().toLowerCase();
    // obtiene todos los checkboxes
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    // obtiene el valor de los checkboxes seleccionados/marcados
    const checkedValues = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);

    if (checkedValues.length === 0 && searchTerm === '') {
        // si ningun checkbox esta tildado y ninguna palabra fue buscada, muestra todos los eventos
        contenedorTarjetas.innerHTML = armadoGaleria('', todos);
        goToDetails();

    } else {
        // eventos filtrados en base a los chek y palabra en search
        const filteredEvents = [];

        for (const event of todos) {
            const includesCategory = checkedValues.length === 0 || checkedValues.includes(event.category);

            const includesSearchTerm = searchTerm === '' || event.name.toLowerCase().includes(searchTerm);

            if (includesCategory && includesSearchTerm) {
                filteredEvents.push(event);
            }
        }

        if (filteredEvents.length === 0) {
            // si ningun evento coincide con el criterio de filtrado, muestra un mensaje
            contenedorTarjetas.innerHTML = nothingFoundCard;
        } else {
            // sino, actualiza la galeria con los eventos filtrados
            contenedorTarjetas.innerHTML = armadoGaleria('', filteredEvents);
            goToDetails();


        }
    }
});
const nothingFoundCard = `<div class="col-12 card">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center"style="background-color: Lavender;" >
                                <h2 class="card-title">Sorry, we didnt find any results matching this search.</h2>
                                <p class="card-text">Maybe it can help: try with other words or categories.</p>
                                <div>
                                    <input type="button" btn-light style=" border:0px; border-radius:10px;padding:15px;"  value="refresh" onclick="location.reload()">
                                </div>
                             </div>
                            
                            </div>`

/**
 * more info button
 */

// obtener todos los botones 'moreinfo'
function goToDetails() {
    const moreInfoButtons = document.querySelectorAll('.more-info-btn');

    // agregar un addEventListener a cada boton 'moreinfo'
    return moreInfoButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();

            // extraer la data del evento de cada atributo data-evento
            const eventData = JSON.parse(decodeURIComponent(button.dataset.event));

            // re-dirige a DETAILS con la data del evento en la URL
            window.location.href = `./details.html?event=${encodeURIComponent(JSON.stringify(eventData))}`;
        });
    });

}

/**
 * boton refrescar la pagina, recargar
 */
