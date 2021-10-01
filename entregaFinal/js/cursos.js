//CREACIÓN DE CURSOS
//CREACIÓN DE CURSOS

class cursos{
    constructor(id,nombreCurso,precioCurso,categoria, cantidad){
        this.id = parseInt(id);
        this.nombreCurso = nombreCurso;
        this.precioCurso = parseFloat(precioCurso);
        this.categoria = categoria;
        this.cantidad = cantidad || 1;
    }

    agregarCantidad(valor){
        this.cantidad += valor;
    }

    subtotal (){
        return this.cantidad * this.precioCurso;
    }
}