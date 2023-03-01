
/**  categorias,  */
// asi busque originalmente las categorias, antes de los metodos de orden superior
let categorias = []; //arreglo de categorias
for (let i of eventos.events) {
    if (!categorias.includes(i.category))
        categorias.push(i.category);
}
console.log('categorias');
console.log(categorias);
console.log('array auxiliar luego del get elment by class name')
const cajon = document.getElementsByClassName("caja");
console.log(`longitud categorias: ${categorias.length}`);
console.log(`longitud cajon: ${cajon.length}`);

for (let i = 0; i < categorias.length; i++) { //esto es lo que modifica la label de los checkboxes
    cajon[i].innerHTML = categorias[i];
    console.log(cajon[i]);
}


// asi busque con los metodos de orden superior- varios metodos 
//el map me hizo un arreglo con las categorias,categorias2,  pero estan repetidas
console.log('categorias2')
let categorias2 = eventos.events.map(cat => cat.category)//me hace un arreglo por cada elemento , solo con la categoria
console.log(categorias2);

// map y luego foreach
console.log('luegodel foreach sobre categorias2')
const resultado = [];
categorias2.forEach((item) => {
    //pushes only unique element
    if (!resultado.includes(item)) {
        resultado.push(item);
    }
})
console.log(resultado);

//con map y luego filter
let result = categorias2.filter((item, index) => {
    return categorias2.indexOf(item) === index;
})
console.log('luego del filter sobre categorias2')
console.log(result)


// el fgilter en el console.log
console.log(categorias2.filter((item, index) => {
    return categorias2.indexOf(item) === index;
}))

// con map, y luego con Set y spread operator (categorias2 viene de un map)
console.log('con Set y spread')
const conjunto = new Set(categorias2);
resultad = [...conjunto]
console.log(resultad)










/*
const contenedorCajas = document.getElementById("caja")//tomo el elemento caja del html
let cajas = '';

function armadoCheck(cadena, categors) {//hace un string  del array de categorias, le pone el texto de la etiqueta y el valor del checkbox


    for (let i = 0; i < categors.length; i++) {
        cadena += `<div class="form-check form-check-inline">
                        <label class="form-check-label form-control-sm" >${categors[i]} 

                        <input class="form-check-input" type="checkbox" " value=${categors[i]}></label>

                    </div>`
    }
    return cadena;
}
*/
cajas = armadoCheck(cajas, categorias);
contenedorCajas.innerHTML = cajas;
/** seleccionar las tarjetas a mostrar, por categoria */


