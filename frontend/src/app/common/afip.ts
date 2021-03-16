// mi cbu CAJA Ahorro ICBC 0150517701000141528219
// Cta Caja Ahorro ICBC 0517/01141528/21
const empresa = {
  name: 'Firulais',
  fullname: 'Firulais Tienda de Mascotas',
  direccion: 'Av. 25 de Mayo 372'

};

const receptor = [{ 0: 'si es A es RI' },
{ 1: 'si es B es CF o M' },
{ 2: 'si es C y otros no va' }
];
const tipoCmp = [
  {
    codigo: '001', nombre: 'FACTURAS A',
    emisor: 0,
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '002', nombre: 'NOTAS DE DEBITO A',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '003', nombre: 'NOTAS DE CREDITO A',
    Receptor: 0, operacion: '-'
  }
  , {
    codigo: '004', nombre: 'RECIBOS A',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '005', nombre: 'NOTAS DE VENTA AL CONTADO A',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '006', nombre: 'FACTURAS B',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '007', nombre: 'NOTAS DE DEBITO B',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '008', nombre: 'NOTAS DE CREDITO B',
    Receptor: 1, operacion: '-'
  }
  , {
    codigo: '009', nombre: 'RECIBOS B RECIBOS B',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '011', nombre: 'FACTURAS C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '012', nombre: 'NOTAS DE DEBITO C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '013', nombre: 'NOTAS DE CREDITO C',
    Receptor: 2, operacion: '-'
  }
  , {
    codigo: '015', nombre: 'RECIBOS C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '016', nombre: 'NOTAS DE VENTA AL CONTADO C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '017', nombre: 'LIQUIDACION DE SERVICIOS PUBLICOS CLASE A',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '018', nombre: 'LIQUIDACION DE SERVICIOS PUBLICOS CLASE B',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '019', nombre: 'FACTURAS DE EXPORTACION',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '020', nombre: 'NOTAS DE DEBITO POR OPERACIONES CON EL EXTERIOR',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '021', nombre: 'NOTAS DE CREDITO POR OPERACIONES CON EL EXTERIOR',
    Receptor: 2, operacion: '-'
  }
  , {
    codigo: '022', nombre: 'FACTURAS - PERMISO EXPORTACION SIMPLIFICADO - DTO. 855/97',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '023', nombre: 'COMPROBANTES “A” DE COMPRA PRIMARIA PARA EL SECTOR PESQUERO MARITIMO',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '024', nombre: 'COMPROBANTES “A” DE CONSIGNACION PRIMARIA PARA EL SECTOR PESQUERO MARITIMO',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '025', nombre: 'COMPROBANTES “B” DE COMPRA PRIMARIA PARA EL SECTOR PESQUERO MARITIMO',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '026', nombre: 'COMPROBANTES “B” DE CONSIGNACION PRIMARIA PARA EL SECTOR PESQUERO MARITIMO',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '027', nombre: 'LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE A',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '028', nombre: 'LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE B',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '029', nombre: 'LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '030', nombre: 'COMPROBANTES DE COMPRA DE BIENES USADOS',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '031', nombre: 'MANDATO - CONSIGNACION',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '032', nombre: 'COMPROBANTES PARA RECICLAR MATERIALES',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '033', nombre: 'LIQUIDACION PRIMARIA DE GRANOS',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '034', nombre: 'COMPROBANTES A DEL APARTADO A INCISO F) R.G. N° 1415',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '035', nombre: 'COMPROBANTES B DEL ANEXO I, APARTADO A, INC. F), R.G. N° 1415',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '036', nombre: 'COMPROBANTES C DEL Anexo I, Apartado A, INC.F), R.G. N° 1415',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '037', nombre: 'NOTAS DE DEBITO O DOCUMENTO EQUIVALENTE QUE CUMPLAN CON LA R.G. N° 1415',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '038', nombre: 'NOTAS DE CREDITO O DOCUMENTO EQUIVALENTE QUE CUMPLAN CON LA R.G. N° 1415',
    Receptor: 0, operacion: '-'
  }
  , {
    codigo: '039', nombre: 'OTROS COMPROBANTES A QUE CUMPLEN CON LA R G 1415',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '040', nombre: 'OTROS COMPROBANTES B QUE CUMPLAN CON LA R.G. N° 1415',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '041', nombre: 'OTROS COMPROBANTES C QUE CUMPLAN CON LA R.G. N° 1415',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '043', nombre: 'NOTA DE CREDITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE B',
    Receptor: 2, operacion: '-'
  }
  , {
    codigo: '044', nombre: 'NOTA DE CREDITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE C',
    Receptor: 2, operacion: '-'
  }
  , {
    codigo: '045', nombre: 'NOTA DE DEBITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE A',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '046', nombre: 'NOTA DE DEBITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE B',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '047', nombre: 'NOTA DE DEBITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '048', nombre: 'NOTA DE CREDITO LIQUIDACION UNICA COMERCIAL IMPOSITIVA CLASE A',
    Receptor: 2, operacion: '-'
  }
  , {
    codigo: '050', nombre: 'RECIBO FACTURA A REGIMEN DE FACTURA DE CREDITO',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '049', nombre: 'COMPROBANTES DE COMPRA DE BIENES NO REGISTRABLES A CONSUMIDORES FINALES',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '051', nombre: 'FACTURAS M',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '052', nombre: 'NOTAS DE DEBITO M',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '053', nombre: 'NOTAS DE CREDITO M',
    Receptor: 0, operacion: '-'
  }
  , {
    codigo: '054', nombre: 'RECIBOS M',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '055', nombre: 'NOTAS DE VENTA AL CONTADO M',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '057', nombre: 'OTROS COMPROBANTES M QUE CUMPLAN CON LA R.G. N° 1415',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '058', nombre: 'CUENTAS DE VENTA Y LIQUIDO PRODUCTO M',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '059', nombre: 'LIQUIDACIONES M',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '060', nombre: 'CUENTAS DE VENTA Y LIQUIDO PRODUCTO A',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '061', nombre: 'CUENTAS DE VENTA Y LIQUIDO PRODUCTO B',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '063', nombre: 'LIQUIDACIONES A',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '064', nombre: 'LIQUIDACIONES B',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '066', nombre: 'DESPACHO DE IMPORTACION',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '068', nombre: 'LIQUIDACION C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '070', nombre: 'RECIBOS FACTURA DE CREDITO',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '080', nombre: 'INFORME DIARIO DE CIERRE (ZETA) - CONTROLADORES FISCALES',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '081', nombre: 'TIQUE FACTURA A',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '082', nombre: 'TIQUE FACTURA B',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '083', nombre: 'TIQUE',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '088', nombre: 'REMITO ELECTRONICO',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '089', nombre: 'RESUMEN DE DATOS',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '090', nombre: 'OTROS COMPROBANTES - DOCUMENTOS EXCEPTUADOS - NOTAS DE CREDITO',
    Receptor: 2, operacion: '-'
  }
  , {
    codigo: '091', nombre: 'REMITOS R',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '099', nombre: 'OTROS COMPROBANTES QUE NO CUMPLEN O ESTÁN EXCEPTUADOS DE LA R.G. 1415 Y SUS MODIF',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '110', nombre: 'TIQUE NOTA DE CREDITO',
    Receptor: 1, operacion: '-'
  }
  , {
    codigo: '111', nombre: 'TIQUE FACTURA C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '112', nombre: 'TIQUE NOTA DE CREDITO A',
    Receptor: 0, operacion: '-'
  }
  , {
    codigo: '113', nombre: 'TIQUE NOTA DE CREDITO B',
    Receptor: 1, operacion: '-'
  }
  , {
    codigo: '114', nombre: 'TIQUE NOTA DE CREDITO C',
    Receptor: 2, operacion: '-'
  }
  , {
    codigo: '115', nombre: 'TIQUE NOTA DE DEBITO A',
    Receptor: 0, operacion: '+'
  }
  , {
    codigo: '116', nombre: 'TIQUE NOTA DE DEBITO B',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '117', nombre: 'TIQUE NOTA DE DEBITO C',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '118', nombre: 'TIQUE FACTURA M',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '119', nombre: 'TIQUE NOTA DE CREDITO M',
    Receptor: 1, operacion: '-'
  }
  , {
    codigo: '120', nombre: 'TIQUE NOTA DE DEBITO M',
    Receptor: 1, operacion: '+'
  }
  , {
    codigo: '331', nombre: 'LIQUIDACION SECUNDARIA DE GRANOS',
    Receptor: 2, operacion: '+'
  }
  , {
    codigo: '332', nombre: 'CERTIFICACION ELECTRONICA (GRANOS)',
    Receptor: 2, operacion: '+'
  }
];
