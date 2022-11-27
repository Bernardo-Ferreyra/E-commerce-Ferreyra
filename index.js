
// uso de JSON y Storage, y DOM y eventos del usuario  ok
//Operador Ternario / AND / OR.
// Usa el operador spread para replicar objetos o arrays



// objetos en array de stock y array de carrito vacio

const stockProductos = [
{id:01, nombre:"Fender Stratocaster", marca: "fender", descripcion:"fender estratocaster", tipo:"guitarra electrica", precio:950, cantidad:1} ,
{id:02, nombre:"Fender Telecaster", marca: "fender", descripcion:"fender telecaster", tipo:"guitarra electrica", precio:920, cantidad:1} ,
{id:03, nombre:"Fender Mustang", marca: "fender", descripcion:"fender mustang", tipo:"guitarra electrica", precio:880, cantidad:1} ,
{id:04, nombre:"Fender Jazzmaster", marca: "fender", descripcion:"fender jazzmaster", tipo:"guitarra electrica", precio:990, cantidad:1} ,
{id:05, nombre:"Fender Jaguar", marca: "fender", descripcion:"fender jaguar", tipo:"guitarra electrica", precio:790, cantidad:1} ,
{id:06, nombre:"Gibson Lespaul", marca: "gibson", descripcion:"gibson les-paul", tipo:"guitarra electrica", precio:1050, cantidad:1} ,
{id:07, nombre:"Gibson SG", marca: "gibson", descripcion:"gibson sg", tipo:"guitarra electrica", precio:1170, cantidad:1} ,
{id:08, nombre:"Gibson 335", marca: "gibson", descripcion:"gibson 335", tipo:"guitarra electrica", precio:990, cantidad:1} ,

]

let carrito= []


//agrego escucha de evento cuando carga el dom 
//obtengo carrito del localstorage
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




//inyecto productos en html / se utiliza desestructuracion
stockProductos.forEach((producto) => {
    const {id, nombre, marca, descripcion, tipo, precio} = producto
    contenedorProductos.innerHTML += `
    <div class="card card-producto">
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

document.getElementById('exampleModalLabel').innerHTML= ` estos son tus productos`



//.some veo si existe o no 
//si existe actualizo cantidad con .map
//sino .find , devuelve el primer elemento del array qe cumpla la funcion 
//.push agrega el elemento al carrito
//actualizo carrito
function agregarAlCarrito (item){
    const existe = carrito.some((prod)=> prod.id === item)

    if(existe){
        const prod = carrito.map((prod)=>{
            if(prod.id === item){
                prod.cantidad++
            }
        })
    }
    else{
        let producto = stockProductos.find((prod)=> prod.id === item)
        carrito.push(producto)
    }

    actualizarCarrito()
}


//.filter trae todos los productos menos al que sea distinto a prod.id
//actualizo carrito
function eliminarDelCarrito (item){
    const prodId = item
    carrito = carrito.filter((prod) => prod.id !== prodId)
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
        const {id, nombre, marca, descripcion, tipo, precio, cantidad} = producto
        contenedorCarrito.innerHTML += `
        <div class="carrito-lista">
        <p>${nombre}</p>
        <p>Precio: $${precio}</p>
        <p>Cantidad: ${cantidad}</p>
        <button onclick="eliminarDelCarrito(${id})" class="btn btn-danger">Eliminar</button>
        </div>
        `
    })

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class="text-center">¡El carrito esta vacio!</p>`
    }
        
    //array.reduce para sumar precios y cantidad con acumulador en 0
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
