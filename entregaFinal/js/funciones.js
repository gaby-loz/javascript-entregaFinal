//GENERAR INTERFAZ HTML

function cursosjquerry(cursosDisponibles, id){
    $(id).empty();

    for (const curso of cursosDisponibles){
        $(id).append(`<div class="card" style="width:18rem; padding:2rem;">
                    <img src="http://via.placeholder.com/150" class="card-img-rop" alt="imagen"></img>
                    <div class="card-body>
                    <h5 class="card-title">${curso.nombreCurso}</h5>
                    <p class="card-text">${curso.precioCurso}</p>
                    <span class="badge bg-info">${curso.categoria}</span>                    
                    <a href="#" id='${curso.id}' class="btn btn-primary btn-compra">COMPRAR</a>
                    </div>
                    </div>`
                    )
    }
    $('.btn-compra').on("click", comprarCursos);
}




//MANEJADOR DE COMPRA DE PRODUCTOS
function comprarCursos(e){
    e.preventDefault();

//OBTENER ID DEL BOTÓN PRESIONADO
const idCurso = e.target.id;

//OBTENER OBJETO DEL CURSO CORRESPONDIENTE AL ID
const seleccionado = carrito.find(p => p.id == idCurso);

//SI NO SE ENCONTRO EL ID BUSCAR CORRESPONDIENTE AL ID
if (seleccionado == undefined){
    
    carrito.push(cursosDisponibles.find(p => p.id == idCurso));
} else{
    //SI SE ENCONTRÓ AGREGAR CANTIDAD
    seleccionado.agregarCantidad(1);
}

// carrito.push(seleccionado);

// //FUNCION QUE SE EJECUTA CUANDO SE CARGA EL DOM
// $(document).ready (function(){
//     if("carrito" in localStorage){
//         const arrayLiterales = JSON.parse(localStorage.getItem("carrito"));
//         for(const literal of arrayLiterales){

//             carrito.push(new cursos(literal.id, literal.nombreCurso, literal.precioCurso, literal.categoria))
        
//         }
        
//     }
// });

//GUARDAR EN LOCALSTORAGE 
localStorage.setItem("carrito", JSON.stringify(carrito));

//GENERAR SALIDA CURSO
carritoUI(carrito);
}

//FUNCION PARA RENDERIZAR INTERFAZ DEL CARRITO
function carritoUI(cursosDisponibles){
    //CAMBIAR INTERIOR DEL INDICADOR DE CANTIDAD DE CURSOS
    $('#carritoCantidad').html (cursosDisponibles.length);

    //VACIAR EL INTERIOR DEL CUERPO DEL CARRITO
    $('#carritoCursos').empty();

    for(const curso of cursosDisponibles){
        $('#carritoCursos').append(registroCarrito(curso));
    }

    //ASOCIAR EVENTOS A LA INTERFAZ GENERADA
    $(".btn-add").click(addCantidad);
    $(".btn-delete").click(eliminarCarrito);
    $(".btn-restar").click(restarCantidad);
}

//FUNCION PARA GENERAR LA ESTRUCTURA DEL REGISTRO HTML
function registroCarrito(curso) {
            return  `<p> ${curso.nombreCurso} 
                    <span class="badge bg-warning"> Precio Unitario: $ ${curso.precioCurso}</span>
                    <span  class="badge bg-dark">${curso.cantidad}</span>
                    <span  class="badge bg-success"> Precio total: $ ${curso.subtotal()}</span>
                    <a id="${curso.id}" class="btn btn-info btn-add">+</a>
                    <a id="${curso.id}" class="btn btn-warning btn-restar">-</a>
                    <a id="${curso.id}" class="btn btn-danger btn-delete">x</a>
                   
                    </p>`
}

//FUNCION PARA RENDERIZAR UN SELECT USANDO UN ARRAY
function renderSelect (lista, id){
    
    //VACIAR CONTENIDO DE LA LISTA
    $(id).empty();

    //GENERAMOS UN OPTION POR CADA ELEMENTO DE LA LISTA
    for (const item of lista){
        $(id).append(`<option value='${item}'>${item}</option>`)
    }
}

//MANEJADOR PARA ELIMINAR CARRITO
function eliminarCarrito(e){
    console.log("target" +e.target.id);
    let posicion= carrito.findIndex(c => c.id == e.target.id);
    carrito.splice(posicion, 1);
    console.log(carrito);

    carritoUI(carrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

//MANEJADOR PARA AGREGAR CANTIDAD
function addCantidad() {
    let curso = carrito.find(c => c.id == this.id);
    curso.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = curso.cantidad;
    $(this).parent().children()[2].innerHTML = curso.subtotal();

//GUARDAR EN STORAGE
localStorage.setItem("carrito", JSON.stringify(carrito));
}

//MANEJADOR PARA SUMAR CANTIDAD
function restarCantidad(){
    let curso =carrito.find(c => c.id == this.id);

    if(curso.cantidad > 1){
        curso.agregarCantidad(-1);

        let registroUI = $(this).parent().children();
        registroUI[1].innerHTML = curso.cantidad;
        registroUI[2].innerHTML = curso.subtotal();

        //MODIFICAR TOTAL
        $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);

        //GUARDAR EN EL STORAGE
        localStorage.setItem("carrito", JSON.stringify(carrito));


    }

}