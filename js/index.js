
//Instanciando cusos

cursosDisponibles.push(new cursos ("1", "Diferencia sexual", 50, categorias[0]));
cursosDisponibles.push(new cursos ("2", "Introducción a Zizek", 60, categorias[1]));
cursosDisponibles.push(new cursos ("3", "Crítica a Paul B. Preciado", 70, categorias[0]));

console.log(cursosDisponibles);



cursosjquerry(cursosDisponibles, '#cursoContenedor');

$(".btn-compra").click(function(e){
    $("#cantidadCursos").show(800);
})


