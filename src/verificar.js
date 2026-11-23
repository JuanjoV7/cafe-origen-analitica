const ventas = require("./datos");
const analitica = require("./analitica");
const generador = require("./generador");


console.log(analitica.valorVenta(ventas[0]));                      // 84000
console.log(analitica.valorVenta(ventas[7]));                      // 0


console.log(analitica.totalVendido(ventas));                       // 985000
console.log(analitica.totalVendido([ventas[0]]));                  // 84000
console.log(analitica.totalVendido([]));                           // 0


console.log(analitica.unidadesVendidas(ventas));                   // 21
console.log(analitica.unidadesVendidas([ventas[0]]));              // 2
console.log(analitica.unidadesVendidas([]));                       // 0


console.log(analitica.ventaMayor(ventas));                         // registro id 10
console.log(analitica.ventaMayor([ventas[0]]));                    // registro id 1
console.log(analitica.ventaMayor([]));                             // null


console.log(analitica.ticketPromedio(ventas));                     // 89545.45454545454
console.log(analitica.ticketPromedio([ventas[0]]));                // 84000
console.log(analitica.ticketPromedio([]));                         // 0


console.log(analitica.ventasPorCiudad(ventas, "Medellín"));        // 356000
console.log(analitica.ventasPorCiudad([ventas[0]], "Medellín"));   // 84000
console.log(analitica.ventasPorCiudad([], "Medellín"));            // 0


console.log(`totalVendido: ${analitica.totalVendido(ventas) === analitica.totalVendidoM(ventas) ? "OK" : "DIFERENTE"}`);
console.log(`unidadesVendidas: ${analitica.unidadesVendidas(ventas) === analitica.unidadesVendidasM(ventas) ? "OK" : "DIFERENTE"}`);
console.log(`ventasPorCiudad: ${analitica.ventasPorCiudad(ventas, "Medellín") === analitica.ventasPorCiudadM(ventas, "Medellín") ? "OK" : "DIFERENTE"}`);


console.log(analitica.totalPorCiudad(ventas));            // 4 ciudades
console.log(analitica.unidadesPorProducto(ventas));       // unidades por producto
console.log(analitica.topProductosPorValor(ventas, 3));   // 3 productos, de mayor a menor
console.log(ventas.map(v => v.id));                       // [1, 2, ..., 12]: orden original


const conEspacio = [ventas[1], { ...ventas[5], ciudad: "Bogotá " }];
console.log(conEspacio.map(v => `[${v.ciudad}]`));      
const sinNormalizar = conEspacio.reduce((acc, v) => {
  acc[v.ciudad] = (acc[v.ciudad] || 0) + analitica.valorVenta(v);
  return acc;
}, {});
console.log(sinNormalizar);                             // Bogotá dos veces
console.log(analitica.totalPorCiudad(conEspacio));      // un solo grupo: bogotá 78000


const diaSinVentas = analitica.ventasDelDia(ventas, "2026-09-07");
console.log(diaSinVentas.length);                                          // 0
console.log(analitica.totalVendido(diaSinVentas) / diaSinVentas.length);  // NaN
console.log(analitica.ticketPromedio(diaSinVentas));                      // 0


console.log(analitica.clientesRecurrentes(ventas));                 // ["C01", "C02", "C03"]
console.log(analitica.clientesRecurrentes(ventas.slice(0, 5)));     // ["C01"] (traza de 5 ventas)


const ventasGeneradas = generador.generarVentas(10000);
for (const ciudad of ["Medellín", "Bogotá", "Cali", "Pereira"]) {
  const cadena = analitica.totalCiudadCadena(ventasGeneradas, ciudad);
  const unaPasada = analitica.totalCiudadUnaPasada(ventasGeneradas, ciudad);
  console.log(`${ciudad}: ${cadena} / ${unaPasada} → ${cadena === unaPasada ? "OK" : "DIFERENTE"}`);
}


const clientesDistintos = new Set();
for (const v of ventas) {
  clientesDistintos.add(v.cliente);
}
console.log(clientesDistintos.size);                         // 8


console.log(analitica.clientesRecurrentesSet(ventas));       // ["C01", "C02", "C03"]
console.log(analitica.comprasPorCliente(ventas));            // Map: C01 => 3, C02 => 2, C03 => 2, ...
console.log(analitica.clientesRecurrentesMap(ventas));       // ["C01", "C02", "C03"]


for (const prueba of [ventas, generador.generarVentas(5000)]) {
  const original = analitica.clientesRecurrentes(prueba).sort().join(",");
  const conSet = analitica.clientesRecurrentesSet(prueba).sort().join(",");
  const conMap = analitica.clientesRecurrentesMap(prueba).sort().join(",");
  console.log(`${prueba.length} ventas: ${original === conSet && conSet === conMap ? "OK" : "DIFERENTE"}`);
} 