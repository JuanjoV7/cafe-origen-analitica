const generador = require("./generador");
const analitica = require("./analitica");

const filas = [];

for (const n of [100, 1000, 10000, 100000]) {
  const ventas = generador.generarVentas(n);

  const cTotal = { operaciones: 0 };
  analitica.totalVendidoI(ventas, cTotal);

  const cMayor = { operaciones: 0 };
  analitica.ventaMayorI(ventas, cMayor);

  const cCiudad = { operaciones: 0 };
  analitica.totalPorCiudadI(ventas, cCiudad);

  const cPrimera = { operaciones: 0 };
  analitica.primeraVenta(ventas, cPrimera);

  filas.push({
    n: n,
    totalVendido: cTotal.operaciones,
    ventaMayor: cMayor.operaciones,
    totalPorCiudad: cCiudad.operaciones,
    primeraVenta: cPrimera.operaciones
  });
}

console.table(filas);


for (const n of [1000, 2000, 4000, 8000, 16000]) {
  const ventas = generador.generarVentas(n);
  console.time(`clientesRecurrentes n = ${n}`);
  analitica.clientesRecurrentes(ventas);
  console.timeEnd(`clientesRecurrentes n = ${n}`);
}


const ventasPrueba = generador.generarVentas(10000);

console.time("valorVenta");
analitica.valorVenta(ventasPrueba[0]);
console.timeEnd("valorVenta");

console.time("totalVendido");
analitica.totalVendido(ventasPrueba);
console.timeEnd("totalVendido");

console.time("unidadesVendidas");
analitica.unidadesVendidas(ventasPrueba);
console.timeEnd("unidadesVendidas");

console.time("ventaMayor");
analitica.ventaMayor(ventasPrueba);
console.timeEnd("ventaMayor");

console.time("ticketPromedio");
analitica.ticketPromedio(ventasPrueba);
console.timeEnd("ticketPromedio");

console.time("ventasPorCiudad");
analitica.ventasPorCiudad(ventasPrueba, "Medellín");
console.timeEnd("ventasPorCiudad");

console.time("totalVendidoM");
analitica.totalVendidoM(ventasPrueba);
console.timeEnd("totalVendidoM");

console.time("unidadesVendidasM");
analitica.unidadesVendidasM(ventasPrueba);
console.timeEnd("unidadesVendidasM");

console.time("ventasPorCiudadM");
analitica.ventasPorCiudadM(ventasPrueba, "Medellín");
console.timeEnd("ventasPorCiudadM");

console.time("totalPorCiudad");
analitica.totalPorCiudad(ventasPrueba);
console.timeEnd("totalPorCiudad");

console.time("unidadesPorProducto");
analitica.unidadesPorProducto(ventasPrueba);
console.timeEnd("unidadesPorProducto");

console.time("topProductosPorValor");
analitica.topProductosPorValor(ventasPrueba, 3);
console.timeEnd("topProductosPorValor");

console.time("ventasDelDia");
analitica.ventasDelDia(ventasPrueba, "2026-09-01");
console.timeEnd("ventasDelDia");

console.time("clientesRecurrentes");
analitica.clientesRecurrentes(ventasPrueba);
console.timeEnd("clientesRecurrentes");

console.time("totalCiudadCadena");
analitica.totalCiudadCadena(ventasPrueba, "Medellín");
console.timeEnd("totalCiudadCadena");

console.time("totalCiudadUnaPasada");
analitica.totalCiudadUnaPasada(ventasPrueba, "Medellín");
console.timeEnd("totalCiudadUnaPasada");