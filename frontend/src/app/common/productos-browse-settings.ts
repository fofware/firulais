export const filterButtons = [
  {
    id: 'especie'
    , tipo: 'radioButton'
    , buttons:[
      {
        id: 'perro'
        ,value: 0
        ,show:[
          'fas fa-dog fa-2x text-white-50'
          ,'fas fa-dog fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: [{$regex: { patern:'perro', flags: 'i'}}]
        ,qryKey: 'especie'
        ,display: true
        ,text: ''
      }
      , {
        id: 'gato'
        ,value: 0
        ,show:[
          'fas fa-cat fa-2x text-white-50'
          ,'fas fa-cat fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: [{$regex: { patern:'gato', flags: 'i'}}]
        ,qryKey: 'especie'
        ,display: true
        ,text: ''
      }
      , {
        id: 'aves'
        ,value: 0
        ,show:[
          'fas fa-dove fa-2x text-white-50'
          ,'fas fa-dove fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: [{$regex: { patern:'ave', flags: 'i'}}]
        ,qryKey: 'especie'
        ,display: true
        ,text: ''
      }
      , {
        id: 'pez'
        ,value: 0
        ,show:[
          'fas fa-fish fa-2x text-white-50'
          ,'fas fa-fish fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: [{$regex: { patern:'pez', flags: 'i'}}]
        ,qryKey: 'especie'
        ,display: false
        ,text: ''
      }
      , {
        id: 'caballo'
        ,value: 0
        ,show:[
          'fas fa-horse fa-2x text-white-50'
          ,'fas fa-horse fa-2x text-white'
        ]
        ,qryName: 'Articulo'
        ,qryValue: [{$regex: { patern:'caballo', flags: 'i'}}]
        ,qryKey: 'especie'
        ,display: false
        ,text: ''
      }
    ]
  }
  , {
    id: 'seco'
    , tipo: 'button'
    ,value: 0
    ,show:[ 'fas fa-cloud-sun-rain fa-2x text-white-50',
            'fas fa-sun fa-2x text-warning',
            'fas fa-cloud-showers-heavy fa-2x text-info'
          ]
    ,qryName: 'Articulo'
    ,qryValue: [{$regex: { patern:'seco', flags: 'i'}},{$regex: { patern:'húmedo', flags: 'i'}}]
    ,qryKey: 'rubro'
    ,display: true
    ,text: ''
   }
  , {
    id: 'pesable'
    , tipo: 'button'
    ,value: 0
    ,show:[ 'fa fa-balance-scale fa-2x text-white-50',
            'fa fa-balance-scale fa-2x text-white',
            'fa fa-balance-scale fa-2x text-danger'
          ]
    ,qryName: 'Extra'
    ,qryValue: [true, { $not: { $eq: true } }]
    ,qryKey: 'pesable'
    ,display: true
    ,text: ''
  }
  ,{
    id: 'box'
    , tipo: 'button'
    ,value: 0
    ,show:[ 'fa fas fa-box fa-2x text-white-50',
            'fa fas fa-box fa-2x text-white',
            'fa fas fa-box fa-2x text-danger'
          ]
    ,qryName: 'Extra'
    ,qryValue: [{ $eq: 0 }, { $not: { $eq: 0 } }]
    ,qryKey: 'count_ins'
    ,display: false
    ,text: ''
  }
  ,{
    id: 'private_web'
    , tipo: 'button'
    ,value: 1
    ,show:[ 'fas fa-prescription fa-2x text-white',
            'fas fa-prescription fa-2x text-white-50'
          ]
    ,qryName: 'Articulo'
    ,qryValue: [{ $not: { $eq: true } }]
    ,qryKey: 'private_web'
    ,display: false
    ,text: ''
  }
  ,{
    id: 'precio'
    , tipo: 'button'
    ,value: 1
    ,show:[ 'fas fa-file-invoice-dollar fa-2x text-white-50',
            'fas fa-file-invoice-dollar fa-2x text-white'
          ]
    ,qryName: 'Extra'
    ,qryValue: [{ $gt: 0 }]
    ,qryKey: 'showPrecio'
    ,display: false
    ,text: ''
  }
  ,{
    id: 'stock'
    , tipo: 'button'
    ,value: 1
    ,show:[ 'fab fa-shopify fa-2x text-white-50',
            'fab fa-shopify fa-2x text-white'
          ]
    ,qryName: 'Extra'
    ,qryValue: [{ $gte: 1 }]
    ,qryKey: 'stock'
    ,display: true
    ,text: ''
  }
  , {
    id: 'servicio'
    , tipo: 'button'
    ,value: 0
    ,show:[ 'fa fa-2x text-white-50',
            'fa fa-2x text-white'
          ]
    ,qryName: 'Producto'
    ,qryValue: [{ $eq: true }]
    ,qryKey: 'servicio'
    ,display: false
    ,text: 'S'
  }
  , {
    id: 'compra'
    , tipo: 'button'
    ,value: 0
    ,show:[ 'fa fa-2x text-white-50',
            'fa fa-2x text-white'
          ]
    ,qryName: 'Producto'
    ,qryValue: [{ $eq: true }]
    ,qryKey: 'pCompra'
    ,display: false
    ,text: 'C'
  }
  , {
    id: 'venta'
    , tipo: 'button'
    ,value: 1
    ,show:[ 'fa fa-2x text-white-50',
            'fa fa-2x text-white'
          ]
    ,qryName: 'Producto'
    ,qryValue: [{ $eq: true }]
    ,qryKey: 'pVenta'
    ,display: false
    ,text: 'V'
  }
]
export const order = [
  {
    name: 'Descripción',
    vista: 1,
    sort: { art_fullName: 1, contiene: 1, unidad: 1, 'sub.name': 1, 'sub.contiene': 1, 'sub.unidad': 1  }
  },
  {
    name: 'Rubro/Linea',
    vista: 1,
    sort: { rubro: 1, Linea: 1, marca: 1, especie: 1, fullName: 1 }
  },
  {
    name: 'Rubro/Especie',
    vista: 1,
    sort: { rubro: 1, especie: 1, edad: -1, precioref: 1 }
  },
  {
    name: 'fabricante',
    vista: 1,
    sort: { fabricante: 1, marca: 1, rubro: 1, linea: 1, especie: 1, edad: -1, art_name: 1, raza: 1 }
  },
  {
    name: 'marca',
    vista: 1,
    sort: { marca: 1, rubro: 1, linea: 1, especie: 1, edad: -1, fullName: 1 }
  },
  {
    name: 'especie',
    vista: 1,
    sort: { especie: 1, edad: -1, rubro: 1, linea: 1, fullName: 1 }
  },
  {
    name: 'contenido',
    vista: 1,
    sort: { contiene: 1, precioref: 1 }
  },
  {
    icon: '<i class="fas fa-search-dollar"></i>',
    name: 'precio',
    vista: 1,
    sort: { precio: 1 }
  },
  {
    icon: '<i class="fas fa-search-dollar"></i>',
    name: 'Precio/Un',
    vista: 1,
    sort: { precioref: 1 }
  }
];
