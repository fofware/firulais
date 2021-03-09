export function round( num: any, dec: number ): number {
  if (typeof dec === undefined || dec < 0) { dec = 2; }

  const tmp = dec + 1;
  for (let i = 1; i <= tmp; i++) {
    num = num * 10;
  }

  num = num / 10;
  num = Math.round(num);
  for (let i = 1; i <= dec; i++) {
    num = num / 10;
  }

  num = num.toFixed(dec);
  // console.log(num)
  return Number(num);
}
export const decimales = 2;
export const tpPagos: any = [
  { name: 'Efectivo', value: 1, coef: [] },
  { name: 'QR', value: 1, coef: [] },
  { name: 'Lista', value: 1, coef: [] },
  { name: 'Especial', value: 1, coef: [] },
  { name: 'MPago', value: 1, coef: [] },
  { name: 'Trj. Débito', value: 1.0750433, coef: [ {comiMP: 0.039803256, op: 1 }, {RetImpIngBru: 0.033328, op: 1 } ] },
  { name: 'Trj. Crédito 1 Pago', value: 1.1126126, coef: [ {comiMP: 0.0778898, op: 1 }, {RetImpIngBru: 0.033328, op: 1 } ] },
  { name: 'Trj. Crédito 3 Pagos', value: 1.195802, coef: [] },
  { name: 'Trj. Crédito 6 Pagos', value: 1.364909, coef: [] }
];
export const tpLista: any = [
  { name: 'Publico', basePrecio: 'precio', value: 1, margen: false },
  { name: 'Test-Publico', basePrecio: 'reposicion', value: 1, margen: true },
  { name: 'Cliente', basePrecio: 'precio', value: .965, margen: false },
  { name: 'Test-Cliente', basePrecio: 'reposicion', value: .965, margen: true },
  { name: 'Revendedor1', basePrecio: 'reposicion', value: 1.13, margen: false },
  { name: 'Revendedor2', basePrecio: 'promedio', value: 1.10, margen: false },
  { name: 'Revendedor3', basePrecio: 'compra', value: 1.10, margen: false },
];
