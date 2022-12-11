
//Objetos y Arrays. Métodos de Arrays.   (ok)
//Funciones y condicionales.             (ok)
//Generación del DOM de forma dinámica. Eventos.        (ok)
//Sintaxis avanzada.        (ok)   
//Al menos una librería de uso relevante para el proyecto.  (ok)
//Manejo de promesas con fetch.   (ok)
//Carga de datos desde un JSON local o desde una API externa.  (ok)



//consulta asincronica utilizando promesas
const consultarProductos= async () => {
    const response = await fetch('./json/productos.json')
    const productos = await response.json()
    return productos  
}


const stockProductos = []



consultarProductos().then(productos =>{
    productos.forEach((producto) => {
        stockProductos.push(producto)
        const {id, nombre, descripcion, precio, img} = producto
        contenedorProductos.innerHTML += `
    
        <div class="card card-producto">
            <img src=${img} class="card-img-top" alt="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="card-text">$${precio}</p>
                <button onclick="agregarAlCarrito(${id})"class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>
        `
        
    })
})


let carrito= []


//cuando carga el dom obtengo carrito del localstorage
//actualizo carrito
document.addEventListener('DOMContentLoaded',() =>{
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    actualizarCarrito()
})



//obtengo elementos del html
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('contenedor-carrito')

const vaciarCarrito = document.getElementById('vaciar-carrito')

const precioTotal =document.getElementById('precioTotal')

const confirmarCompra = document.getElementById('confirmar-carrito')




/*CARRITO */

document.getElementById('exampleModalLabel').innerHTML= `Estos son tus productos`



//busco en stockProductos el objeto y lo guardo en variable / metodo find
// creo variable con una copia del objeto y le agrego atributo cantidad / uso spread operator
// busco su indice findIndex, si no esta (-1) lo agrego al carrito 
//si exite le modifico la cantidad
//actualizo carrito
function agregarAlCarrito (item){

    Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Agregado al carrito',
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })

    const prodSelecionado = stockProductos.find( (prod) => prod.id === item)

    const prodCarrito = {...prodSelecionado, cantidad:1}

    const existe = carrito.findIndex((prod)=> prod.id === prodCarrito.id)

    if(existe === -1){
        carrito.push(prodCarrito) 
        
    }
    else{
        carrito[existe].cantidad++
    }
    actualizarCarrito()

}

// obtengo el objeto con .find si la cantidad es mayor a uno se la resto una unidad
//actualizo carrito
//sino .filter trae todos los productos menos al que sea distinto
//actualizo carrito
function eliminarDelCarrito (item){
    const prodSelecionado = carrito.find( (prod) => prod.id === item)
    if(prodSelecionado.cantidad > 1){
        prodSelecionado.cantidad--
        actualizarCarrito()
    }
    else{
        carrito = carrito.filter((prod) => prod.id !== item)
        actualizarCarrito()
    }
}


//guardo en localstorage
function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}



// contenedorCarrito.innerHTML cuando se ejecuta esta vacio y se va llenando
//itero por array carrito e inyecto en html / se usa desestructuracion
//si el carrito esta vacio inyecto msj en html
// guardo en localstorage
function actualizarCarrito() {

    contenedorCarrito.innerHTML=""
        
    carrito.forEach((producto)=>{
        const {id, nombre, precio, cantidad, img} = producto
        contenedorCarrito.innerHTML += `

        <div class="card mb-2 ">
            <div class="row g-0">
                <div class="col-5 col-sm-4">
                    <img src=${img} class="img-fluid w-100 img-carrito" alt="card-horizontal-image">
                </div>
                <div class="col-7 col-sm-8">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-start">${nombre}</h5>
                        <p class="card-text text-start">Cantidad: ${cantidad}</p>
                        <p class="card-text text-start">$${precio}</p>
                        <button onclick="eliminarDelCarrito(${id})" class="btn btn-danger w-50 align-self-end">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        `
    })

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class="text-center">¡El carrito esta vacio!</p>`
    }
        
    //array.reduce suma con acumulador en 0, la cantidad por el precio del objeto
    precioTotal.innerText = carrito.reduce((acumulador, prod) => acumulador + prod.cantidad * prod.precio, 0)
    
    guardarStorage()
}


//agrego escucha de evento 
//vacio contenido de carrito
//actualizo carrito
vaciarCarrito.addEventListener('click',() => {
    carrito.length= []
    actualizarCarrito()
})


// alertas de carrito con escucha de evento
// finalizada la compra se da mensaje , se vacia el carrito
//actualizo carrito
confirmarCompra.addEventListener('click', () => {
    if (carrito.length === 0){
        Swal.fire({
            icon: 'error',
            title: 'Tu carrito esta vacio!',
            text: 'Compra algo para continuar',
            confirmButtonText: "Aceptar"
        })
    }
    else{
        Swal.fire({
            icon: 'success',
            title: 'Tu compra fue realizada con exito!',
            text: 'Gracias por confiar en nosotros, te estara llegando un mail con el resumen de tu compra',
            confirmButtonText: "Aceptar"
        })

        carrito.length= 0
        actualizarCarrito()
    }
})