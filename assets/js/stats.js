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
        console.log(`pasados ${pasados}`);

        console.log(`eventos pasados ${cont}`)
        cont.forEach((e) => console.log(e))
        console.log(`eventos futuros ${cont2}`);
        cont2.forEach((e) => console.log(e))
        //TABLA SUPERIOR
        //Events with larger capacity
        let eventosOrdenados = todos.sort((a, b) => (b.capacity) - (a.capacity));
        eventosOrdenados = eventosOrdenados.slice(0, 3);
        console.log('eventosOrdenadosTop3 events with larger capacity (past and future events');
        eventosOrdenados.forEach((e) => console.log(e));

        //events with the larger percentaje of  attendance
        let eventsWithHighestAttendance = pasados.sort((a, b) => (b.assistance) - (a.assistance));
        const topAttendance = eventsWithHighestAttendance.slice(0, 3);
        console.log(' eventsWithHighestAttendanceTop3- events with highest asistance-- only past events')
        topAttendance.forEach((e) => console.log(e));

        //Events with the lowest percentage of attendance
        let eventsWithLowestAttendance = pasados.sort((a, b) => (a.assistance) - (b.assistance));
        const bottomAttendance = eventsWithLowestAttendance.slice(0, 3);
        console.log('eventsWithLowestAttendance - evednts with lowest assistance- only past events')
        bottomAttendance.forEach((e) => console.log(e))



        const tbody = ` <tbody id="tbody1">

        <tr>
            <td>${topAttendance[0].name} </td>
            <td>${bottomAttendance[0].name} </td>
            <td>${eventosOrdenados[0].name}</td>

        </tr>

        <tr>
            <td>${topAttendance[1].name}</td>
            <td>${bottomAttendance[1].name}</td>
            <td>${eventosOrdenados[1].name}</td>

        </tr>
        
        <tr>
            <td>${topAttendance[2].name}</td>
            <td>${bottomAttendance[2].name}</td>
            <td>${eventosOrdenados[2].name}</td>

        </tr>
    </tbody>`

        const table1 = document.getElementById('tbody1');
        table1.innerHTML = tbody;
        // DOS TABLAS INFERIORES
        //falta upcoming events by category (category, revenues, %of attendance))


        //falta past events by category     (category, revenues, %of attendance)





        

        //final del try catch, de la funcion fetchEvents

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchEvents();


