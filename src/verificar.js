const ventas = require("./datos");
const analitica = require("./analitica");


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

// MiniReto 3: agrupaciones y ranking
console.log(analitica.totalPorCiudad(ventas));            // 4 ciudades
console.log(analitica.unidadesPorProducto(ventas));       // unidades por producto
console.log(analitica.topProductosPorValor(ventas, 3));   // 3 productos, de mayor a menor
console.log(ventas.map(v => v.id));                       // [1, 2, ..., 12]: orden original