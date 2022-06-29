console.log("hola little rockstar");
// funcion para crear los cards


let estado = "";
// arreglo donde se guardara actividad y estado
let actividades = [];
let estadoA = [];
let arrayEstado;


start = () => {
    console.log("Inicio Start()");




    if (localStorage.length != 0) {

        let arrayAuxiliarActividad = localStorage.getItem('actividad: ');
        arrayAuxiliarActividad = arrayAuxiliarActividad.slice(0, arrayAuxiliarActividad.length - 1);
        let ArrayActividades = arrayAuxiliarActividad.split(',');


        let arrayAuxiliarEstado = localStorage.getItem('estado: ')
        arrayAuxiliarEstado = arrayAuxiliarEstado.slice(0, arrayAuxiliarEstado.length - 1)
        arrayEstado = arrayAuxiliarEstado.split(',');

        for (let index = 0; index < ArrayActividades.length; index++) {
            /*  render(arrayActi[index], arrayEstado[index]); */

            render(arrayEstado[index], ArrayActividades[index]);

        }

    }


}


// funcion contructora de objetos
function Lista_tareas(tarea) {

    this.actividad = tarea;
}

function listaEstado(estado) {
    this.estado = estado;
}




accion = () => {
    console.log("Inicio Accion");

    let nombre = document.getElementById("i_texto").value;
    let estado1 = document.getElementById("prioridad1").checked;
    let estado2 = document.getElementById("prioridad2").checked;
    let estado3 = document.getElementById("prioridad3").checked;
    //verificamos que hay algo escrito
    if (nombre != "") {
        //verifico que alguna opcion fue seleccionado
        if (estado1 || estado2 || estado3) {
            //dependiendo del estado seleccionado de asigna un estado a la variable
            if (estado1) {
                estado = "pendiente";
            }
            if (estado2) {
                estado = "despues";
            }
            if (estado3) {
                estado = "hecha";
            }
            //se llama al contructor y se pasan parametros
            constructor(nombre, estado)

            // se llama al metodo para generar los cards y se pasa estado y nombre
            render(estado, nombre);

            //se almancena en localstorage
            almacenadorLocalStorage();


            // se limpia el input
            reset();
        } else {
            // alerta por si no se selecciona nungun input
            alert("selecciona algo");
        }
    } else {
        // alerta por si no se escribe en el input
        alert("escribe algo");
    }
};

constructor = (nombre, estado) => {
    console.log("Inicio COnstructor");
    let Objetotarea = new Lista_tareas(nombre);
    let Objetoestado = new listaEstado(estado);
    actividades.push(Objetotarea);
    estadoA.push(Objetoestado);

}



almacenadorLocalStorage = () => {
    console.log("Inici oLocalStrg");
    //es diferente de vacio
    console.log("es diferente de vacio");
    let arrayLocalStorage = "";
    let arrayLocalStorage2 = "";


    // ALMACENAR ACTIVIDADES
    // recorremos el array por posiciones
    for (const iterator of actividades) {
        /* console.log(iterator); */
        //recorremos los obejtos
        for (const prop in iterator) {
            /* console.log(iterator.actividad) */

            arrayLocalStorage = arrayLocalStorage + iterator.actividad + ",";
        }
    }
    console.log("Se esta almacenando la activiad: " + arrayLocalStorage);
    localStorage.setItem('actividad: ', arrayLocalStorage)




    // recorremos el array por posiciones
    for (const iterator of estadoA) {
        /* console.log(iterator); */
        //recorremos los obejtos
        for (const prop in iterator) {
            /* console.log(iterator.actividad) */

            arrayLocalStorage2 = arrayLocalStorage2 + iterator.estado + ",";
        }
    }
    console.log("Se esta almacenando el estado: " + arrayLocalStorage2);
    localStorage.setItem('estado: ', arrayLocalStorage2)




};


recuperador = () => {
    console.log("Inici recuperador");
    if (localStorage.length != 0) {

        console.log("recuperador de actividades");
        let keyActividad = localStorage.getItem('actividad: ');
        keyActividad = keyActividad.slice(0, -1);
        keyActividad = keyActividad.split(',');


        let nombre = [];


        for (let index = 0; index < keyActividad.length; index++) {

            nombre.push(keyActividad[index]);

        }



        console.log("recuperador de estados");
        let keyEstado = localStorage.getItem('estado: ');
        keyEstado = keyEstado.slice(0, -1);
        keyEstado = keyEstado.split(',');

        let estado = [];

        for (let index = 0; index < keyEstado.length; index++) {

            estado.push(keyEstado[index]);

        }



        for (let index = 0; index < keyActividad.length; index++) {
            constructor(nombre[index], estado[index])

        }




    }


}
let numero = 0;
render = (estado, nombre) => {
    console.log("Inici render");
    let padre = document.getElementById('conenedorPadre');
    let hijo = document.createElement("section");


    const atributo = document.createAttribute('id');
    atributo.value = `card${numero}`;
    hijo.setAttributeNode(atributo)




    hijo.innerHTML = ` <input type="radio" name="radio" class="icon" id="icon${numero}"> <div class="card_actv ${estado}"> <h3>${nombre}</h3> <p class="">Estado:<span class="estadoSpan">${estado}</span></p></div>  `;
    padre.appendChild(hijo);
    numero++;


};

// fn para limpiar
reset = () => {
    document.getElementById("i_texto").value = "";
};

eliminar = () => {
    console.log("Inici eliminar");
    let totalRadios = 0;
    for (let index = 0; index < actividades.length; index++) {
        totalRadios = totalRadios + 1;
    }
    console.log("Existen un total de :" + totalRadios);

    if (actividades.length != 0) {
        for (let index = 0; index <= actividades.length; index++) {



            let auuu = `icon${index}`;


            let busca = document.querySelector(auuu);
            console.log("buscando: " + busca);
            if (document.querySelector(`icon${auuu}`) == null) {
                console.log("no existe");

            } else {
                console.log("existe");
            }
            /*  else {
                            console.log("existe");
                            if (document.getElementById(`${aux}`).checked) {
                                console.log(index + " esta activo ");
                                let objetoborrar = document.getElementById(`card${auxi2}`)
                                objetoborrar.remove();


                            } else {
                                console.log(index + " no checado");
                            }
                        } */


        }

    } else {
        console.log("No se ejecutara nada pues no hay objetos");
    }




}






recuperador();
start();