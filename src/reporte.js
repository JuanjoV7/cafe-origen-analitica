const ventas = require("./datos");
const analitica = require("./analitica");

const mayor = analitica.ventaMayor(ventas);

console.log("  CAFÉ ORIGEN · REPORTE DE VENTAS v0.1");
console.log("");


console.log("RESUMEN GENERAL");
console.log("----------------------------------------------");
console.log(`Total vendido:      $${analitica.totalVendido(ventas).toLocaleString("es-CO")}`);
console.log(`Unidades vendidas:  ${analitica.unidadesVendidas(ventas)}`);
console.log(`Venta mayor:        venta ${mayor.id} · ${mayor.cliente} · $${analitica.valorVenta(mayor).toLocaleString("es-CO")}`);
console.log(`Ticket promedio:    $${analitica.ticketPromedio(ventas).toLocaleString("es-CO")}`);
console.log("");


console.log("VENTAS POR CIUDAD");
console.log("----------------------------------------------");
console.table(
  Object.entries(analitica.totalPorCiudad(ventas))
    .map(par => ({ ciudad: par[0], total: `$${par[1].toLocaleString("es-CO")}` }))
);
console.log("");


console.log("UNIDADES POR PRODUCTO");
console.log("----------------------------------------------");
console.table(
  Object.entries(analitica.unidadesPorProducto(ventas))
    .map(par => ({ producto: par[0], unidades: par[1] }))
);
console.log("");


console.log("TOP 3 DE PRODUCTOS POR VALOR");
console.log("----------------------------------------------");
let puesto = 1;
for (const producto of analitica.topProductosPorValor(ventas, 3)) {
  console.log(`${puesto}. ${producto}`);
  puesto += 1;
}
console.log("");


for (const fecha of ["2026-09-01", "2026-09-07"]) {
  const delDia = analitica.ventasDelDia(ventas, fecha);
  console.log(`RESUMEN DEL DÍA ${fecha}`);
  console.log("----------------------------------------------");
  console.log(`Ventas:             ${delDia.length}`);
  console.log(`Total vendido:      $${analitica.totalVendido(delDia).toLocaleString("es-CO")}`);
  console.log(`Unidades vendidas:  ${analitica.unidadesVendidas(delDia)}`);
  console.log(`Ticket promedio:    $${analitica.ticketPromedio(delDia).toLocaleString("es-CO")}`);
  console.log("");
}