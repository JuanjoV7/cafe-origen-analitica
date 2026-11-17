function valorVenta(venta) {
return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;
    for (const v of ventas) total += valorVenta(v);
    return total;
}

function unidadesVendidas(ventas) {

}

function ventaMayor(ventas) {

}

function ticketPromedio(ventas) {

}

function ventasPorCiudad(ventas, ciudad) {

}

console.log(totalVendido(ventas));
