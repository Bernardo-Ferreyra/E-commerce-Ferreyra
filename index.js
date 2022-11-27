
// uso de JSON y Storage, manejo de DOM y escucha de eventos        ok
//uso Operador Ternario / AND / OR      ok
// Usa el operador spread para replicar objetos o arrays        ok




// objetos en array de stock y array de carrito vacio

const stockProductos = [
{id:01, nombre:"Fender Stratocaster", marca: "fender", descripcion:"fender estratocaster", tipo:"guitarra electrica", precio:950, img:"./img/stratocaster.jpg" } ,
{id:02, nombre:"Fender Telecaster", marca: "fender", descripcion:"fender telecaster", tipo:"guitarra electrica", precio:920, img:"./img/telecaster.jpg" } ,
{id:03, nombre:"Fender Mustang", marca: "fender", descripcion:"fender mustang", tipo:"guitarra electrica", precio:880, img:"./img/mustang.webp" } ,
{id:04, nombre:"Fender Jazzmaster", marca: "fender", descripcion:"fender jazzmaster", tipo:"guitarra electrica", precio:990, img:"./img/jazzmaster.webp" } ,
{id:05, nombre:"Fender Jaguar", marca: "fender", descripcion:"fender jaguar", tipo:"guitarra electrica", precio:790, img:"./img/jaguar.jpg" } ,
{id:06, nombre:"Gibson Lespaul", marca: "gibson", descripcion:"gibson les-paul", tipo:"guitarra electrica", precio:1050, img:"./img/lespaul.jpg" } ,
{id:07, nombre:"Gibson SG", marca: "gibson", descripcion:"gibson sg", tipo:"guitarra electrica", precio:1170, img:"./img/sg.jpg" } ,
{id:08, nombre:"Gibson 335", marca: "gibson", descripcion:"gibson 335", tipo:"guitarra electrica", precio:990, img:"./img/335.jpg" } ,

]

let carrito= []


//agrego escucha de evento cuando carga el dom 
//obtengo carrito del localstorage / uso operador ternario
//actualizo carrito
document.addEventListener('DOMContentLoaded',() =>{
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    actualizarCarrito()
})



//obtengo los elementos a usar del html
const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('contenedor-carrito')

const vaciarCarrito = document.getElementById('vaciar-carrito')

const precioTotal =document.getElementById('precioTotal')

const confirmarCompra = document.getElementById('confirmar-carrito')




//inyecto productos en html / se utiliza desestructuracion
stockProductos.forEach((producto) => {
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




/*CARRITO */

document.getElementById('exampleModalLabel').innerHTML= `Estos son tus productos`



//busco en stockProductos el objeto y lo guardo en variable / metodo find
// creo variable con una copia del objeto y le agrego atributo cantidad / uso spread operator
// busco si exite con con findIndex, si no esta lo agrego al carrito 
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


//.filter trae todos los productos menos al que sea distinto
//actualizo carrito
function eliminarDelCarrito (item){
    carrito = carrito.filter((prod) => prod.id !== item)
    actualizarCarrito()
}


//guardo en localstorage
function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}



// contenedorCarrito.innerHTML cuando se ejecuta esta vacio y se va llenando
//itero por array carrito e inyecto en html / se usa desestructuracion
//si el carrito esta vacio inyecto msj en html
// guardo en localstorage
let actualizarCarrito = () =>{

    contenedorCarrito.innerHTML=""
        
    carrito.forEach((producto)=>{
        const {id, nombre, precio, cantidad, img} = producto
        contenedorCarrito.innerHTML += `

        <div class="card mb-2">
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