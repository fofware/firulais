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
/*
export const tpLista: any = [
  { name: 'Publico', basePrecio: 'precio', value: 1, margen: false },
  { name: 'Test-Publico', basePrecio: 'reposicion', value: 1, margen: true },
  { name: 'Cliente', basePrecio: 'precio', value: .965, margen: false },
  { name: 'Test-Cliente', basePrecio: 'reposicion', value: .965, margen: true },
  { name: 'Revendedor1', basePrecio: 'reposicion', value: 1.13, margen: false },
  { name: 'Revendedor2', basePrecio: 'promedio', value: 1.10, margen: false },
  { name: 'Revendedor3', basePrecio: 'compra', value: 1.10, margen: false },
];
*/
export function productosToShow(e){
  // TODO: #4 todos los precios se deben calcular en el servidor esto hay que sacarlo de acá
  let reventa = (e.margen ? e.margen : 30);


  if(e.count_cerrado === 0){
    e.precioxunidad = Math.round(e.sub.compra/e.sub.contiene/e.contiene);
    e.showCompra = Math.round(e.sub.compra/e.sub.contiene);
    e.showStock = Math.floor(e.sub.stock*e.sub.contiene);
  }
  else if(e.count_parte === 0){
    e.precioxunidad = Math.round(e.sub.compra/e.sub.contiene);
    e.showCompra = Math.round(e.sub.compra/e.sub.contiene);
    e.showStock = Math.floor(e.sub.stock*e.sub.contiene);
  } else if(e.count_ins === 0){
    e.precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
    e.showCompra = Math.round(e.compra/e.contiene);
    e.showStock = Math.floor(e.stock);
//    e.stock = 0;
  } else {
    e.precioxunidad = Math.round(e.compra/e.contiene/(e.scontiene || 1));
    e.showCompra = Math.round(e.compra/e.contiene);
    e.showStock = Math.floor(e.stock);
  }
  const recargo = (e.margen+100)*.01;
/*
  if(e.pesable === true){
    e.showPrecio = Math.ceil( e.calc_precio );
//    e.showPrecio = Math.ceil( ((e.compra || e.showCompra)*recargo));
//    e.calc_precio = Math.ceil( ((e.compra || e.showCompra)*recargo));
  } else {
    e.showPrecio = Math.ceil( (e.calc_precio )/10)*10;
//    e.calc_precio = Math.ceil( ((e.compra || e.showCompra)*recargo));
  }
*/
  // TODO: #5 Aquí se etán calculando los precios para revendedores se debe hacer en el server y además hay que armar un sistema de promosiones y ofertas
  e.lista = Math.ceil(Math.ceil(e.calc_precio*1.120220997));
  if (e.pesable) {
    e.reventa = e.calc_precio;
    e.reventa1 = e.calc_precio;
    e.reventa2 = e.calc_precio;
  } else {
    e.reventa = Math.ceil(((e.compra || e.showCompra)*( (((reventa/3*2.4)+100) < 118.5 ? 118.5 : (reventa/3*2.4)+100))/100));
    e.reventa1 = Math.ceil(((e.compra || e.showCompra)*( (((reventa/3*1.4)+100) < 114.5 ? 114.5 : (reventa/3*1.4)+100))/100));
    e.reventa2 = Math.ceil(((e.compra || e.showCompra)*( (((reventa/3*.467)+100) < 111.5 ? 111.5 : (reventa/3*.467)+100))/100));
  }

  return e;
}

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

export function formapago(e, tpago){
  const today = new Date(e.ahora).getTime();
  const desde = new Date(e.precio_desde).getTime();
  const hasta = new Date(e.precio_hasta).getTime();
  let base = 0;
  if( desde <= today && hasta >= today && e.precio)
    base = e.precio;
  else base = e.calc_precio;
  //console.log(e.precio_hasta,today,desde,hasta);
  //console.log(desde <= today, hasta >= today, e.precio)
  if ( tpago.value === 1 ){
    if ( !e.pesable ){
      if ( base > 100 ){
        e.showPrecio = Math.ceil(base/10 * tpago.value)*10;
      } else {
        const diff = base % 5;
        if (diff < 3 ){
          e.showPrecio = base - diff;
        } else {
          e.showPrecio = base + ( 5 - diff )
        }
      }
    } else {
      e.showPrecio = Math.ceil(base * tpago.value);
    }
  } else {
    e.showPrecio = Math.ceil(base * tpago.value);
  }
  e.precioref = round(e.showPrecio/e.contiene,2);
}
