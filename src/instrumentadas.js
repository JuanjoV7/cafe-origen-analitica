

function totalVendidoC(ventas, c) {
    let total = 0;
    for (const v of ventas) {c.ops++; total += valorVenta(v); }
    return total; 
}