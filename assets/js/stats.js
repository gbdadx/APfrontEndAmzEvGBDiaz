let eventos = {};
const pasados = []
const futuros = []
const todos = [];
let categorias = []; //arreglo de categorias
let categorias2 = [];
let categories = '';

//inicio fetch (si no pongo todo adentro, no renderiza nada)
async function fetchEvents() {
    try {
        const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        const data = await response.json();
        eventos.currentDate = data.currentDate;
        eventos.events = data.events;

        //inicio del contenido 
        function armarArrayFuturo(fut) {
            for (let i of eventos.events) {
                if (i.date > eventos.currentDate)
                    fut.push(i);
            }
            return fut;
        }
        function armarArrayPasado(pas) {
            for (let i of eventos.events) {
                if (i.date < eventos.currentDate)
                    pas.push(i);
            }
            return pas;
        }
        function armarArrayTodos(tos) {
            for (let i of eventos.events) {
                tos.push(i);

            }
        }
        armarArrayPasado(pasados);
        armarArrayFuturo(futuros);
        armarArrayTodos(todos);

        //categorias pasados
        for (let i of pasados) {

            if (!categorias.includes(i.category))
                categorias.push(i.category);

        }
        //categorias futuros
        for (let j of futuros) {

            if (!categorias2.includes(j.category))
                categorias2.push(j.category);

        }
        categorias.sort();
        categorias2.sort();
        console.log(categorias);
        console.log(categorias2);

        // para stats

        const cont = Array(categorias.length).fill(0);//inicializa el array con ceros, lo habia hecho con un bucle pero no funciono
        const cont2 = Array(categorias2.length).fill(0);
        pasados.forEach(evento => {
            const { category, price, assistance } = evento;
            const index = categorias.indexOf(category);//si no encuentra la categoy en categorias, da -1
            if (index !== -1) {
                cont[index] += price * assistance;
            }
        });

        futuros.forEach(evento => {
            const { category, price, estimate } = evento;
            const index = categorias2.indexOf(category);//si no encuentra la categoy en categorias, da -1
            if (index !== -1 && typeof estimate === 'number' && !isNaN(estimate)) {
                cont2[index] += price * estimate;
            }
        });

        console.log(`eventos pasados`)
        cont.forEach((e) => console.log(e))
        console.log(`eventos futuros `);
        cont2.forEach((e) => console.log(e))
        //TABLA SUPERIOR
        //Events with larger capacity
        let evOrd = pasados.sort((a, b) => (b.capacity) - (a.capacity));
        evOrd = evOrd.slice(0, 3);
        console.log('eventosOrdenadosTop3 events with larger capacity (past and future events');
        evOrd.forEach((e) => console.log(e));

        function perAtt(a, c) {
            let percent = a * 100 / c;
            return Number.parseFloat(percent).toFixed(2);
        }


        //events with the larger percentaje of  attendance
        let eventsWithHighestPercentageAttendance = pasados.sort((a, b) => (perAtt(b.assistance, b.capacity)) - (perAtt(a.assistance, a.capacity)));
        const topAtt = eventsWithHighestPercentageAttendance.slice(0, 3);
        console.log('eventsWithHighestPercentageAttendance- events with highest % asistance-- only past events')
        topAtt.forEach((e) => console.log(e));

        //Events with the lowest percentage of attendance
        let eventsWithLowestPercentageAttendance = pasados.sort((a, b) => ((perAtt(a.assistance, a.capacity)) - perAtt(b.assistance, b.capacity)));
        const botAtt = eventsWithLowestPercentageAttendance.slice(0, 3);
        console.log('eventsWithLowestPercentageAttendance - evednts with lowest assistance- only past events')
        botAtt.forEach((e) => console.log(e))



        const tbody = ` <tbody id="tbody1">
      <tr>
            <td class="text-center">${topAtt[0].name} </td>  
            <td class="text-center">${botAtt[0].name} (%${perAtt(botAtt[0].assistance, botAtt[0].capacity)}) </td>  
            <td class="text-center">${evOrd[0].name} (${evOrd[0].capacity})</td>

        </tr>
        <tr>
            <td class="text-center">${topAtt[1].name}</td>  
            <td class="text-center">${botAtt[1].name} (%${perAtt(botAtt[1].assistance, botAtt[1].capacity)}) </td>            
            <td class="text-center">${evOrd[1].name} (${evOrd[1].capacity})</td>

        </tr>
    
        <tr>
            <td class="text-center">${topAtt[2].name}</td>
            <td class="text-center">${botAtt[2].name} (%${perAtt(botAtt[2].assistance, botAtt[2].capacity)}) </td>            
              <td class="text-center">${evOrd[2].name} (${evOrd[2].capacity})</td>

        </tr>
    </tbody>`

        const table1 = document.getElementById('tbody1');
        table1.innerHTML = tbody;
        // DOS TABLAS INFERIORES //////////////////////////////////
        //arrays acumuladores



        let arrBook = ['Books', 0, 0, 0];
        let arrCine = ['Cinema', 0, 0, 0];
        let arrConc = ['Concert', 0, 0, 0];
        let arrFood = ['Food', 0, 0, 0];
        let arrMuse = ['Museum', 0, 0, 0];
        let arrPart = ['Party', 0, 0, 0];
        let arrRace = ['Race', 0, 0, 0];



        for (let e of futuros) {

            if (e.category === 'Books') { arrBook[1] += e.price * e.estimate; arrBook[2] += e.estimate; arrBook[3] += e.capacity; }
            else if (e.category === 'Cinema') { arrCine[1] += e.price * e.estimate; arrCine[2] += e.estimate; arrCine[3] += e.capacity; }
            else if (e.category === 'Concert') { arrConc[1] += e.price * e.estimate; arrConc[2] += e.estimate; arrConc[3] += e.capacity; }
            else if (e.category === 'Food') { arrFood[1] += e.price * e.estimate; arrFood[2] += e.estimate; arrFood[3] += e.capacity; }
            else if (e.category === 'Museum') { arrMuse[1] += e.price * e.estimate; arrMuse[2] += e.estimate; arrMuse[3] += e.capacity; }
            else if (e.category === 'Party') { arrPart[1] += e.price * e.estimate; arrPart[2] += e.estimate; arrPart[3] += e.capacity; }
            else if (e.category === 'Race') { arrRace[1] += e.price * e.estimate; arrRace[2] += e.estimate; arrRace[3] += e.capacity; }

        }

        console.log(categorias2)
        function getPAt(arr) {
            let num = ((arr[2] * 100) / arr[3]);
            if (num > 0) return Number.parseFloat(num).toFixed(2);
            else return 0;

        }

        const tbody2 = `<tbody id="tbody2">
       
        <tr>
            <td>${categorias[0]}</td>   
            <td class="text-end">${arrBook[1]} </td> 
            <td class="text-end">% ${getPAt(arrBook)} </td>
        </tr>
        <tr>
            <td>${categorias[1]}</td>   
            <td class="text-end">${arrCine[1]}</td> 
            <td class="text-end">% ${getPAt(arrCine)}</td>
        </tr>
        <tr>
            <td>${categorias[2]}</td>   
            <td class="text-end">${arrConc[1]} </td>   
            <td class="text-end">% ${getPAt(arrConc)}</td>
        </tr>
        <tr>
            <td>${categorias[3]}</td>   
            <td class="text-end">${arrFood[1]} </td>   
            <td class="text-end">% ${getPAt(arrFood)} </td>
        </tr>
        <tr>
            <td>${categorias[4]}</td>   
            <td class="text-end">${arrMuse[1]}</td> 
            <td class="text-end">% ${getPAt(arrMuse)}</td>
        </tr>
           
        <tr>
            <td>${categorias[5]}</td>   
            <td class="text-end">${arrPart[1]} </td>   
            <td class="text-end">% ${getPAt(arrPart)}  </td>
        </tr>
        <tr>
            <td>${categorias[6]}</td>   
            <td class="text-end">${arrRace[1]} </td>   
            <td class="text-end">% ${getPAt(arrRace)}   </td>
        </tr>
        </tbody>`

        const table2 = document.getElementById('tbody2');
        table2.innerHTML = tbody2;
        //falta past events by category     (category, revenues, %of attendance)
        function inicializarArray(arr) {
            arr[1] = 0;
            arr[2] = 0;
            arr[3] = 0;
        }
        inicializarArray(arrFood);
        inicializarArray(arrBook);
        inicializarArray(arrPart);
        inicializarArray(arrRace);
        inicializarArray(arrConc);
        inicializarArray(arrMuse);
        inicializarArray(arrCine);
        console.log(arrBook)

        for (let e of pasados) {
            if (e.category === 'Food') {
                arrFood[1] += e.price * e.assistance; arrFood[2] += e.assistance; arrFood[3] += e.capacity;
            }
            else if (e.category === 'Books') { arrBook[1] += e.price * e.assistance; arrBook[2] += e.assistance; arrBook[3] += e.capacity; }
            else if (e.category === 'Party') { arrPart[1] += e.price * e.assistance; arrPart[2] += e.assistance; arrPart[3] += e.capacity; }
            else if (e.category === 'Concert') { arrConc[1] += e.price * e.assistance; arrConc[2] += e.assistance; arrConc[3] += e.capacity; }
            else if (e.category === 'Museum') { arrMuse[1] += e.price * e.assistance; arrMuse[2] += e.assistance; arrMuse[3] += e.capacity; }
            else if (e.category === 'Race') { arrRace[1] += e.price * e.assistance; arrRace[2] += e.assistance; arrRace[3] += e.capacity; }
            else if (e.category === 'Cinema') { arrCine[1] += e.price * e.assistance; arrCine[2] += e.assistance; arrCine[3] += e.capacity; }

        }
        const tbody3 = `<tbody id="tbody3">
        <tr>
            <td>${categorias[0]}</td>   
            <td class="text-end">${arrFood[1]} </td>   
            <td class="text-end">% ${getPAt(arrFood)} </td>
        </tr>
               
        <tr>
            <td>${categorias[1]}</td>   
            <td class="text-end">${arrBook[1]} </td> 
            <td class="text-end">% ${getPAt(arrBook)} </td>
        </tr>

        <tr>
            <td>${categorias[2]}</td>   
            <td class="text-end">${arrPart[1]} </td>   
            <td class="text-end">% ${getPAt(arrPart)}  </td>
        </tr>
        <tr>
            <td>${categorias[3]}</td>   
            <td class="text-end">${arrRace[1]} </td>   
            <td class="text-end">% ${getPAt(arrRace)}   </td>
        </tr>
        <tr>
            <td>${categorias[4]}</td>   
            <td class="text-end">${arrConc[1]} </td>   
            <td class="text-end">% ${getPAt(arrConc)}</td>
        </tr>
        <tr>
            <td>${categorias[5]}</td>   
            <td class="text-end">${arrMuse[1]}</td> 
            <td class="text-end">% ${getPAt(arrMuse)}</td>
         </tr>
    <tr>
            <td>${categorias[6]}</td>   
            <td class="text-end">${arrCine[1]}</td> 
            <td class="text-end">% ${getPAt(arrCine)}</td>
         </tr>
        </tbody>`

        const table3 = document.getElementById('tbody3');
        table3.innerHTML = tbody3;

        //final del try catch, de la funcion fetchEvents

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchEvents();


