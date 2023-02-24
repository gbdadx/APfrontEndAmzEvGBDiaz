
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

const todos = [];
for (let i of eventos.events) {
    
        todos.push(i);
        console.log(i)
    }


/* pruebas con tarjetas */
const tarjetas = document.getElementsByClassName("card");
for (let i of tarjetas) {
    console.log(i)

}

/* tarjeta
<div class="col-12 col-md-5 col-lg-3 card" >
            <img src="./assets/img/BulkResizePhotos.com (1)/Cinema.jpg" class="card-img-top" alt="cinema">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text </p>

                <a href="./details.html" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        */




