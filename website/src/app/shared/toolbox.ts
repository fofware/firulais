export function round(num, dec) {
  if(typeof dec== undefined || dec<0) dec = 2;

  let tmp = dec + 1;
  for(var i=1; i<=tmp; i++)
    num = num * 10;

  num = num / 10;
  num = Math.round(num);
  for(var i=1; i<=dec; i++)
    num = num / 10;

  num = num.toFixed(dec);
  //console.log(num)
  return Number(num);
}
export const decimales:number = 2;
export const tpPagos:any = [
  { name: 'Efectivo', value: 0.965},
  { name: 'Lista', value: 1 },
  { name: 'QR', value: 0.9311 },
  { name: 'MPago', value: 1 },
  { name: 'Trj. Débito', value: 1 },
  { name: 'Trj. Crédito 1 Pago', value: 1.034109},
  { name: 'Trj. Crédito 3 Pagos', value: 1.195802},
  { name: 'Trj. Crédito 6 Pagos', value: 1.364909}
]
export const tpLista:any = [
  { name: 'Publico', basePrecio: 'precio', value: 1, margen: false },
  { name: 'Test-Publico', basePrecio: 'reposicion', value: 1, margen: true },
  { name: 'Cliente', basePrecio: 'precio', value: .965, margen: false },
  { name: 'Test-Cliente', basePrecio: 'reposicion', value: .965, margen: true },
  { name: 'Revendedor1', basePrecio: 'reposicion', value: 1.13, margen: false },
  { name: 'Revendedor2', basePrecio: 'promedio', value: 1.10, margen: false },
  { name: 'Revendedor3', basePrecio: 'compra', value: 1.10, margen: false },
]
