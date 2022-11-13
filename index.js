

// objetos en array de stock y array de carrito vacio
let stockProductos = [
{id:01, nombre:"Fender Stratocaster", marca: "fender", descripcion:"fender estratocaster", tipo:"guitarra electrica", precio:950} ,
{id:02, nombre:"Fender Telecaster", marca: "fender", descripcion:"fender telecaster", tipo:"guitarra electrica", precio:920} ,
{id:03, nombre:"Fender Mustang", marca: "fender", descripcion:"fender mustang", tipo:"guitarra electrica", precio:880} ,
{id:04, nombre:"Fender Jazzmaster", marca: "fender", descripcion:"fender jazzmaster", tipo:"guitarra electrica", precio:990} ,
{id:05, nombre:"Fender Jaguar", marca: "fender", descripcion:"fender jaguar", tipo:"guitarra electrica", precio:790} ,
{id:06, nombre:"Gibson Lespaul", marca: "gibson", descripcion:"gibson les-paul", tipo:"guitarra electrica", precio:1050} ,
{id:07, nombre:"Gibson SG", marca: "gibson", descripcion:"gibson sg", tipo:"guitarra electrica", precio:1170} ,
{id:08, nombre:"Gibson 335", marca: "gibson", descripcion:"gibson 335", tipo:"guitarra electrica", precio:990} ,

]

let carrito= []



//capturo nombre por prompt, lo guardo en variable y devuelvo un alert
let nombre = prompt("Hola bienvenido al e-commerce de instrumentos \n Ingresa tu nombre porfavor")
alert(`${nombre}, a continuacion te damos un listado del stock \n por favor elegi la opcion que deseas comprar`)



//agrego escucha de evento cuando carga el dom y actualizo carrito
document.addEventListener('DOMContentLoaded',() =>{
    actualizarCarrito()
})



//obtengo los elementos a usar del html
const contenedorProductos= document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('contenedor-carrito')

const vaciarCarrito = document.getElementById('vaciar-carrito')

const precioTotal =document.getElementById('precioTotal')




//inyecto productos en html 
stockProductos.forEach((producto) => {
    let div = document.createElement('div')
    div.innerHTML = `
    <div class="card card-producto">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">$${producto.precio}</p>
            <button id="agregar${producto.id}" class="btn btn-primary">Agregar al carrito</button>
        </div>
    </div>
    `
    contenedorProductos.append(div)

    //capturo boton de agregar al carrito y le hago una escucha de evento para que ejecute la funcion agregar al carrito
    let botonAgregar = document.getElementById(`agregar${producto.id}`)

    botonAgregar.addEventListener('click',() => {
        agregarAlCarrito(producto.id)
        alert(`Agregaste ${producto.nombre} al carrito`)
        
    })

})





/*MANEJO DEL CARRITO */

document.getElementById('exampleModalLabel').innerHTML= `${nombre}, estos son tus productos`


//array.find , devuelve el primer elemento del array qe cumpla la funcion 
// array.push se agrega el elemento al carrito
//actualizo carrito
function agregarAlCarrito (item){
    let producto = stockProductos.find((prod)=> prod.id === item)
    carrito.push(producto)
    console.log(carrito)
    actualizarCarrito()
}


//array.find , se busca el elemento en el array carrito
//array.indexof , se busca su indice
//array.splice con el indice se puede usar splice para eliminarlo
//actualizo carrito
function eliminarDelCarrito (item){
    let producto = carrito.find((prod) => prod.id === item)
    let posicion = carrito.indexOf(producto)
    carrito.splice(posicion, 1)
    actualizarCarrito()
}



//si el carrito esta vacio doy mensaje sino continua
// contenedorCarrito.innerHTML cuando se ejecuta esta vacio y se va llenando
//itero por array carrito e inyecto en html
let actualizarCarrito = () =>{


    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class="text-center">¡El carrito esta vacio!</p>`
        precioTotal.innerText="0"
    }else{

        
        contenedorCarrito.innerHTML=""
        
        carrito.forEach((prod)=>{
            let div = document.createElement('div')
            div.classList.add('carrito-lista')
            div.innerHTML= `
            <p>${prod.nombre}</p>
            <p>Precio: $${prod.precio}</p>
            <p>Cantidad: 1</p>
            <button onclick="eliminarDelCarrito(${prod.id})" class="btn btn-danger">Eliminar</button>
            
            `
            contenedorCarrito.append(div)
        })
        
        //array.reduce para sumar precios con acumulador en 0
        precioTotal.innerText = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0)
    }

}


//agrego escucha de evento 
//vacio contenido de array llevando su length a 0
//actualizo carrito
vaciarCarrito.addEventListener('click',() => {
    carrito.length= 0
    actualizarCarrito()
})
