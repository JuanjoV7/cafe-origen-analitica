function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const v of ventas) {
    total += valorVenta(v);
  }
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const v of ventas) {
    unidades += v.cantidad;
  }
  return unidades;
}

function ventaMayor(ventas) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (const v of ventas) {
    if (valorVenta(v) > valorVenta(mayor)) {
      mayor = v;
    }
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let validas = 0;
  for (const v of ventas) {
    if (v.cantidad > 0) {
      total += valorVenta(v);
      validas += 1;
    }
  }
  if (validas === 0) return 0;
  return total / validas;
}

const normalizar = (texto) => texto.trim().toLowerCase();

function ventasPorCiudad(ventas, ciudad) {
  let total = 0;
  for (const v of ventas) {
    if (normalizar(v.ciudad) === normalizar(ciudad)) total += valorVenta(v);
  }
  return total;
}

module.exports = {
  valorVenta: valorVenta,
  totalVendido: totalVendido,
  unidadesVendidas: unidadesVendidas,
  ventaMayor: ventaMayor,
  ticketPromedio: ticketPromedio,
  ventasPorCiudad: ventasPorCiudad,
};
