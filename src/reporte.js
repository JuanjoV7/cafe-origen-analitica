const datosReales = require("./datos");
const analitica = require("./analitica");
const generador = require("./generador");
const catalogo = require("./catalogo");
const ventasDiarias = require("./ventasDiarias");

console.time("Tiempo total del reporte");


const argumento = process.argv[2];
let ventas = datosReales;
let origen = "datos reales del Día 1";
if (argumento !== undefined) {
  ventas = generador.generarVentas(Number(argumento));
  origen = `${ventas.length} ventas generadas`;
}

const mayor = analitica.ventaMayor(ventas);

console.log("  CAFÉ ORIGEN · REPORTE DE VENTAS v1.0");
console.log(`  Datos: ${origen}`);
console.log("");


console.log("RESUMEN GENERAL");
console.log("----------------------------------------------");
console.log(`Total vendido:      $${analitica.totalVendido(ventas).toLocaleString("es-CO")}`);
console.log(`Unidades vendidas:  ${analitica.unidadesVendidas(ventas)}`);
if (mayor === null) {
  console.log("Venta mayor:        sin ventas");
} else {
  console.log(`Venta mayor:        venta ${mayor.id} · ${mayor.cliente} · $${analitica.valorVenta(mayor).toLocaleString("es-CO")}`);
}
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

const recurrentes = analitica.clientesRecurrentesSet(ventas);
console.log("CLIENTES RECURRENTES");
console.log("----------------------------------------------");
console.log(`Clientes que compraron más de una vez: ${recurrentes.length}`);
if (recurrentes.length > 0) {
  console.log(`Primeros: ${recurrentes.slice(0, 10).join(", ")}`);
}
console.log("");

console.log("PRODUCTO ESTRELLA POR CIUDAD");
console.log("----------------------------------------------");
console.table(
  [...analitica.productoEstrellaPorCiudad(ventas)]
    .map(par => ({ ciudad: par[0], producto: par[1] }))
);
console.log("");


const combo = analitica.comboRegaloMap(catalogo, 87000);
console.log("COMBO DE REGALO SUGERIDO (TARJETA DE $87.000)");
console.log("----------------------------------------------");
if (combo === null) {
  console.log("No hay dos productos que sumen exactamente $87.000");
} else {
  console.log(`${combo[0].producto} ($${combo[0].precio.toLocaleString("es-CO")}) + ${combo[1].producto} ($${combo[1].precio.toLocaleString("es-CO")})`);
}
console.log("");


const clienteCupon = analitica.primerClienteUnico(ventas);
console.log("CLIENTE PARA CUPÓN DE REGRESO");
console.log("----------------------------------------------");
if (clienteCupon === null) {
  console.log("Ningún cliente compró una sola vez");
} else {
  console.log(`Primer cliente con una sola compra: ${clienteCupon}`);
}
console.log("");

const semana = analitica.mejorSemana(ventasDiarias, 7);
console.log("MEJOR SEMANA DE SEPTIEMBRE");
console.log("----------------------------------------------");
console.log(`Del día ${semana.diaInicio} al ${semana.diaInicio + 6}: $${(semana.total * 1000).toLocaleString("es-CO")}`);
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

console.timeEnd("Tiempo total del reporte");