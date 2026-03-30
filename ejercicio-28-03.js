class Producto{
    nombre;
    precio;
    cantidad;
    categoria;

    constructor(nombre,precio,cantidad,categoria){
        this.nombre = nombre 
        this.precio = precio
        this.cantidad = cantidad 
        this.categoria = categoria 
        this.descuentos = []
    }

    precioFinal(){
        const precioBase = this.precio * this.cantidad
        /*
        OPCION 1: 
        const precioFinal = this.descuentos.reduce(function(precioConDescuentoacc, descuento){
            return precioConDescuentoacc - descuento.valorDescuento(this)
        }, precioBase)
        */
        const precioFinal = this.descuentos.reduce(
            this.acumularDescuentos.bind(this), //Esta interesante esto porque bind(this) lo que hace es "recuperar" la referencia del producto
            precioBase
        )
        return Math.max(0, precioFinal)
    }

    acumularDescuentos(precioConDescuentoacc, descuento){
        return precioConDescuentoacc - descuento.valorDescontado(this)
    }
    agregarDescuento(nuevoDescuento){
        descuentos.push(nuevoDescuento)
    }
}

class DescuentoFijo{
    constructor(valor){
        this.valor = valor
    }
    // polimorfismo
    valorDescontado(_producto){
        return this.valor
    }
}

class DescuentoPorcentual{
    constructor(porcentaje){
        this.porcentaje = porcentaje
    }
    decimalDescuento(){
        return this.porcentaje / 100
    }
    valorDescontado(producto){
        return producto.cantidad * producto.precio * this.decimalDescuento()
    }
}


//instancias
const doritos = new Producto("doritos", 150 , 10 , "snacks")
const leche = new Producto("leche", 700 , 2 , "lacteos")
const cocaCola = new Producto("cocaCola", 700 , 7 , "bebidas")
const carritoDeCompras = []
carritoDeCompras.push(doritos, leche, cocaCola)

//funciones para lista de productos (punto 4) 

// Aumentar su precio base en determinado monto.
function aumentarPrecioBase(unaListaDeProductos, unMonto){
    unaListaDeProductos.forEach(unProducto => {
        unProducto.precio += unMonto
    });
}

//Obtener el precio final más alto de una lista de productos. Bonus: obtener el producto más caro.
function precioFinalMasAlto(unaListaDeProductos){
    return precioMasCaro = unaListaDeProductos.reduce(function(productoAnterior, productoActual){
        return Math.max(productoAnterior.precio(), productoActual.precio())
    })
    
}

function productoMasCaro(unaListaDeProductos){
    return productoMasCaro = unaListaDeProductos.find(producto => producto.precio === precioFinalMasAlto(unaListaDeProductos)).nombre
}

//Obtener los productos con un precio final menor a determinado monto.
function montoMenorQue(unaListaDeProductos, unMonto){
    return unaListaDeProductos.filter(producto => producto.precio() < unMonto )
}

//Obtener la suma total de los precios.
function precioTotalCarrito(unaListaDeProductos){
    return unaListaDeProductos.reduce(function(acc,producto){
        return acc + producto.precioFinal()
    }, 0)
}

//Ordenar la lista por precio, de menor a mayor.
function ordenarCarrito(unaListaDeProductos){
    unaListaDeProductos.sort((p1, p2) => p1.precioFinal() - p2.precioFinal())
}