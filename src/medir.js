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