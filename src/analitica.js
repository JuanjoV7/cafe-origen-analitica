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

function normalizar(texto) {
  return texto.trim().toLowerCase();
}

function ventasPorCiudad(ventas, ciudad) {
  let total = 0;
  for (const v of ventas) {
    if (normalizar(v.ciudad) === normalizar(ciudad)) total += valorVenta(v);
  }
  return total;
}

function totalVendidoM(ventas) {
  return ventas.reduce((acum, v) => acum + valorVenta(v), 0);
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((acum, v) => acum + v.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  return ventas
    .filter(v => normalizar(v.ciudad) === normalizar(ciudad))
    .reduce((suma, v) => suma + valorVenta(v), 0);
}

function totalPorCiudad(ventas) {
  return ventas.reduce((acc, v) => {
    const ciudad = normalizar(v.ciudad);
    acc[ciudad] = (acc[ciudad] || 0) + valorVenta(v);
    return acc;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + v.cantidad;
    return acc;
  }, {});
}

function topProductosPorValor(ventas, k) {
  const porProducto = ventas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + valorVenta(v);
    return acc;
  }, {});
  const pares = Object.entries(porProducto);
  return [...pares]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(par => par[0]);
}

function ventasDelDia(ventas, fecha) {
  return ventas.filter(v => v.fecha === fecha);
}

function totalVendidoI(ventas, contador) {
  let total = 0;
  for (const v of ventas) {
    contador.operaciones += 1;
    total += valorVenta(v);
  }
  return total;
}

function ventaMayorI(ventas, contador) {
  contador.operaciones += 1;
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (const v of ventas) {
    contador.operaciones += 1;
    contador.operaciones += 1;
    if (valorVenta(v) > valorVenta(mayor)) {
      mayor = v;
    }
  }
  return mayor;

}

function totalPorCiudadI(ventas, contador) {
  return ventas.reduce((acc, v) => {
    contador.operaciones += 1;
    const ciudad = normalizar(v.ciudad);
    acc[ciudad] = (acc[ciudad] || 0) + valorVenta(v);
    return acc;
  }, {});
}

function primeraVenta(ventas, contador) {
  contador.operaciones += 1;
  return ventas[0];
}

function clientesRecurrentes(ventas) {
  const recurrentes = [];
  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (ventas[i].cliente === ventas[j].cliente &&
        !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }
  return recurrentes;
}

function totalCiudadCadena(ventas, ciudad) {
  return ventas
    .map(v => ({ ...v, ciudad: normalizar(v.ciudad) }))
    .filter(v => v.ciudad === normalizar(ciudad))
    .map(v => valorVenta(v))
    .reduce((suma, valor) => suma + valor, 0);
}

function totalCiudadUnaPasada(ventas, ciudad) {
  let total = 0;
  for (const v of ventas) {
    if (normalizar(v.ciudad) === normalizar(ciudad)) total += valorVenta(v);
  }
  return total;
}

function clientesRecurrentesSet(ventas) {
  const vistos = new Set();
  const recurrentes = new Set();
  for (const v of ventas) {
    if (vistos.has(v.cliente)) {
      recurrentes.add(v.cliente);
    } else {
      vistos.add(v.cliente);
    }
  }
  return [...recurrentes];

}

function comprasPorCliente(ventas) {
  const compras = new Map();
  for (const v of ventas) {
    if (compras.has(v.cliente)) {
      compras.set(v.cliente, compras.get(v.cliente) + 1);
    } else {
      compras.set(v.cliente, 1);
    }
  }
  return compras;
}

function clientesRecurrentesMap(ventas) {
  const compras = comprasPorCliente(ventas);
  const recurrentes = [];
  for (const par of compras) {
    if (par[1] > 1) recurrentes.push(par[0]);
  }
  return recurrentes;
}

function comboRegalo(catalogo, valor) {
  for (let i = 0; i < catalogo.length; i++) {
    for (let j = i + 1; j < catalogo.length; j++) {
      if (catalogo[i].precio + catalogo[j].precio === valor) {
        return [catalogo[i], catalogo[j]];
      }
    }
  }
  return null;
}

function comboRegaloMap(catalogo, valor) {
  const vistos = new Map();
  for (const p of catalogo) {
    const complemento = valor - p.precio;
    if (vistos.has(complemento)) {
      return [vistos.get(complemento), p];
    }
    vistos.set(p.precio, p);
  }
  return null;
}

function productoEstrellaPorCiudad(ventas) {
  const conteos = new Map();
  for (const v of ventas) {
    const ciudad = normalizar(v.ciudad);
    if (!conteos.has(ciudad)) {
      conteos.set(ciudad, new Map());
    }
    const productos = conteos.get(ciudad);
    if (productos.has(v.producto)) {
      productos.set(v.producto, productos.get(v.producto) + 1);
    } else {
      productos.set(v.producto, 1);
    }
  }

  const estrellas = new Map();
  for (const parCiudad of conteos) {
    let estrella = null;
    let maximo = 0;
    for (const parProducto of parCiudad[1]) {
      if (parProducto[1] > maximo) {
        estrella = parProducto[0];
        maximo = parProducto[1];
      }
    }
    estrellas.set(parCiudad[0], estrella);
  }
  return estrellas;
}

function primerClienteUnico(ventas) {
  const compras = comprasPorCliente(ventas);
  for (const v of ventas) {
    if (compras.get(v.cliente) === 1) return v.cliente;
  }
  return null;
}

module.exports = {
  valorVenta: valorVenta,
  totalVendido: totalVendido,
  unidadesVendidas: unidadesVendidas,
  ventaMayor: ventaMayor,
  ticketPromedio: ticketPromedio,
  ventasPorCiudad: ventasPorCiudad,
  totalVendidoM: totalVendidoM,
  unidadesVendidasM: unidadesVendidasM,
  ventasPorCiudadM: ventasPorCiudadM,
  totalPorCiudad: totalPorCiudad,
  unidadesPorProducto: unidadesPorProducto,
  topProductosPorValor: topProductosPorValor,
  ventasDelDia: ventasDelDia,
  totalVendidoI: totalVendidoI,
  ventaMayorI: ventaMayorI,
  totalPorCiudadI: totalPorCiudadI,
  primeraVenta: primeraVenta,
  clientesRecurrentes: clientesRecurrentes,
  totalCiudadCadena: totalCiudadCadena,
  totalCiudadUnaPasada: totalCiudadUnaPasada,
  clientesRecurrentesSet: clientesRecurrentesSet,
  comprasPorCliente: comprasPorCliente,
  clientesRecurrentesMap: clientesRecurrentesMap,
  comboRegalo: comboRegalo,
  comboRegaloMap: comboRegaloMap
};

