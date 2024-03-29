
let eventos = {};
const todos = [];
let tarjetas = '';
const contenedorTarjetas = document.getElementById("galeria");
let categorias = []; //arreglo de categorias
let categories = '';
const cajon = document.getElementById("caja");

//inicio fetch (si no pongo todo adentro, no renderiza ni las categorias ni las cards)
async function fetchEvents() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        const data = await response.json();
        eventos.currentDate = data.currentDate;
        eventos.events = data.events;

        //inicio del contenido (previo, lo que arma check, cards y logica)
        function armadoGaleria(cadena, array) {
            for (const uno of array) {
                const cardId = `card-${uno._id}`;// crear un unico ID para cada tarjeta

                if (uno.date < eventos.currentDate) {
                    cadena += `<div class="col-12 col-sm-5 col-md-4 col-lg-3 col-xxl-2 card" id="${cardId}">
                            <div class="card-header" style="background-image:url(${uno.image}); background-size: cover;">
                           
                            </div>
                            <div class="card-body alert-secondary" >
                            <h5 class="card-title">${uno.name}</h5>
                            <p class="card-text d-inline-block text-truncate" style="max-width: 200px;">${uno.description}</p>
                            </div>
                            <div class="card-footer px-2 alert-secondary" >
                            <span id="Past event"> Passed</span>
                             <a href="#" class="btn btn-secondary more-info-btn  btn-sm" data-event="${encodeURIComponent(JSON.stringify(uno))}">More info</a> 
                             </div>
                        </div>`
                } else {

                    cadena += `<div class="col-12 col-sm-5 col-md-4 col-lg-3 col-xxl-2 card" id="${cardId}">
                        <div class="card-header" style="background-image:url(${uno.image}); background-size: cover;">
                           
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${uno.name}</h5>
                            <p class="card-text d-inline-block text-truncate" style="max-width: 200px;">${uno.description}</p>
                        </div>
                        <div class="card-footer px-2 d-flex bg-white">
                        <span> ${uno.date}</span>
                        <a href="#" class="btn btn-secondary more-info-btn  btn-sm" data-event="${encodeURIComponent(JSON.stringify(uno))}">More info</a>

                        </div>
                </div>`};


            }
            return cadena;
        }
        function agregaTarjeta(arreglo) {
            for (let i of eventos.events) {
                arreglo.unshift(i);
            }
            return arreglo;
        }

        agregaTarjeta(todos);

        contenedorTarjetas.innerHTML = armadoGaleria(tarjetas, todos);
        /**checboxes*/
        for (let i of eventos.events) {
            if (!categorias.includes(i.category))
                categorias.push(i.category);
        }

        for (let i = 0; i < categorias.length; i++) { //esto es lo que modifica la label de los checkboxes
            categories += `<div class="form-check form-check-inline form-control-sm col-5 col-sm-3 col-md-2 col-lg-1">
                                <label class="form-check-label form-control-sm" >
                                <input class="form-check-input" type="checkbox"  value=${categorias[i]}>${categorias[i]}</label>
                            </div>`;
        
        }
        cajon.innerHTML = categories;

        /**seleccionar cards con los checkboxes y la barra de busqueda*/
        const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', event => {
                const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

                if (checkedCheckboxes.length === 0) {
                    contenedorTarjetas.innerHTML = armadoGaleria('', todos);
                    goToDetails();

                } else {
                    const checkedValues = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
                    const filteredEvents = todos.filter(event => checkedValues.includes(event.category));

                    if (filteredEvents.length === 0) {
                        contenedorTarjetas.innerHTML = nothingFoundCard;

                    } else {
                        contenedorTarjetas.innerHTML = armadoGaleria('', filteredEvents);
                    }
                    goToDetails();

                }
            });
            goToDetails();
        });

        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        searchButton.addEventListener('click', event => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            const checkedValues = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);

            if (checkedValues.length === 0 && searchTerm === '') {
                contenedorTarjetas.innerHTML = armadoGaleria('', todos);
                goToDetails();

            } else {
                const filteredEvents = [];

                for (const event of todos) {
                    const includesCategory = checkedValues.length === 0 || checkedValues.includes(event.category);

                    const includesSearchTerm = searchTerm === '' || event.name.toLowerCase().includes(searchTerm);

                    if (includesCategory && includesSearchTerm) {
                        filteredEvents.push(event);
                    }
                }

                if (filteredEvents.length === 0) {
                    contenedorTarjetas.innerHTML = nothingFoundCard;
                } else {
                    contenedorTarjetas.innerHTML = armadoGaleria('', filteredEvents);
                }
            }
            goToDetails();
        });
        const nothingFoundCard = `<div class="col-12 card">
        <div class="card-body d-flex alert-warning flex-column justify-content-center align-items-center" >
        <h2 class="card-title">Sorry, we didnt find any results matching this search.</h2>
                                <p class="card-text">try with other words or categories.</p>
                                <div>
                                    <input type="button" class="btn-outline-warning" style=" border:0px; border-radius:10px;padding:15px;"  value="refresh" onclick="location.reload()">
                                </div>
                             </div>
                            
                            </div>`

        /**  more info button */
        function goToDetails() {
            const moreInfoButtons = document.querySelectorAll('.more-info-btn');
            return moreInfoButtons.forEach(button => {
                button.addEventListener('click', event => {
                    event.preventDefault();
                    const eventData = JSON.parse(decodeURIComponent(button.dataset.event));
                    window.location.href = `./details.html?event=${encodeURIComponent(JSON.stringify(eventData))}`;
                });
            });
        }


        //final del try catch, de la funcion fetchEvents
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchEvents();
// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 500px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
