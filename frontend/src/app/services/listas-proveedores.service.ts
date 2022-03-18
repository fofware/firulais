import { Injectable } from '@angular/core';
import { round } from '../shared/toolbox';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../shared/uris';

export enum col {
  A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,
  AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ,AR,AS,AT,AU,AV,AW,AX,AY,AZ,
  BA,BB,BC,BD,BE,BF,BG,BH,BI,BJ,BK,BL,BM,BN,BO,BP,BQ,BR,BS,BT,BU,BV,BW,BX,BY,BZ,
  CA,CB,CC,CD,CE,CF,CG,CH,CI,CJ,CK,CL,CM,CN,CO,CP,CQ,CR,CS,CT,CU,CV,CW,CX,CY,CZ
}
export enum colName {
  codigo,
  nombre,
  ean,
  presentacionNombre,
  presentacionCnt,
  presentacionUnidad,
  presentacionPrecio,
  bultoNombre,
  bultoCnt,
  bultoPrecio,
  fabricante,
  marca,
  name,
  especie,
  edad,
  raza,
  rubro,
  linea
}

const fieldsNames = [
  "codigo",
  "nombre",
  "peso",
  "unidades",
  "precio"
];
const commonFilter = `(line,idx,array) => {
  if(line[col.U] && line[col.U] === 1){
    const ret = {};
    if (!line[col.A]){
      if(line[col.B])
        ret.codigo = line[col.A] ? line[col.A]+'' : (line[col.B]).replace(/[ ]/g,'');
    } else {
      ret.codigo = line[col.A]+'';
    }

    ret.descripcion = line[col.B];
    ret.clase = isNaN(line[col.T]) ? 0 : line[col.T];
    ret.peso = isNaN(line[col.AA]) ? null : Math.round(line[col.AA]*10000)/10000;
    ret.unidades = isNaN(line[col.AB]) ? null : Math.round(line[col.AB]*10000)/10000;
    ret.pesable = isNaN(line[col.AC]) ? null : Math.round(line[col.AC]*10000)/10000;

    ret.input = {};
    ret.input.lista =  isNaN(line[col.P]) ? null : Math.round(line[col.P]*10000)/10000;
    ret.input.reposicion = isNaN(line[col.V]) ? null : Math.round(line[col.V]*10000)/10000;
    ret.input.promo = isNaN(line[col.W]) ? null : Math.round(line[col.W]*10000)/10000;
    ret.input.base = isNaN(line[col.X]) ? null : Math.round(line[col.X]*10000)/10000;
    ret.input.oferta = isNaN(line[col.Y]) ? null : Math.round(line[col.Y]*10000)/10000;
    ret.input.sugerido = isNaN(line[col.Z]) ? null : Math.round(line[col.Z]*10000)/10000;

    ret.vbulto = {
      margen:  isNaN(line[col.AH]) ? array[4][col.AK] : line[col.AH],
      tarjeta: isNaN(line[col.AI]) ? null : Math.round(line[col.AI]*10000)/10000,
      debito: isNaN(line[col.AJ]) ? null : Math.round(line[col.AJ]*10000)/10000,
      efectivo: isNaN(line[col.AK]) ? null : Math.round(line[col.AK]*10000)/10000,
      descuento1: isNaN(line[col.AL]) ? null : Math.round(line[col.AL]*10000)/10000,
      descuento2: isNaN(line[col.AM]) ? null : Math.round(line[col.AM]*10000)/10000
    };
    ret.vunidad = {
      margen:  isNaN(line[col.AO]) ? array[4][col.AR] : line[col.AO],
      tarjeta: isNaN(line[col.AP]) ? null : Math.round(line[col.AP]*10000)/10000,
      debito: isNaN(line[col.AQ]) ? null : Math.round(line[col.AQ]*10000)/10000,
      efectivo: isNaN(line[col.AR]) ? null : Math.round(line[col.AR]*10000)/10000,
      descuento1: isNaN(line[col.AS]) ? null : Math.round(line[col.AS]*10000)/10000,
      descuento2: isNaN(line[col.AT]) ? null : Math.round(line[col.AT]*10000)/10000
    };
    ret.fabricante = line[col.BA];
    ret.marca = line[col.BB];
    ret.name = line[col.BC];
    ret.especie = line[col.BD];
    ret.edad = line[col.BE];
    ret.rubro = line[col.BF];
    ret.linea = line[col.BG];
    ret.raza = line[col.BH];
    ret.bulto = line[col.BI];
    ret.presentacion = line[col.BJ];
    ret.unidad = line[col.BK];

    line[col.A] = ret.codigo;
    line[col.B] = ret.descripcion;
    line[col.C] = ret.input;
    line[col.D] = ret.vbulto;
    line[col.E] = ret.vunidad;
    line[col.F] = ret.fabricante;
    line[col.G] = ret.marca;
    line[col.H] = ret.name;
    line[col.I] = ret.especie;
    line[col.J] = ret.edad;
    line[col.K] = ret.rubro;
    line[col.L] = ret.linea;
    line[col.M] = ret.raza;
    line[col.N] = ret.bulto;
    line[col.O] = ret.presentacion;
    line[col.P] = ret.unidad;
    line[col.Q] = ret.clase;
    line[col.R] = ret.ean;
    line[col.S] = ret.peso;
    line[col.T] = ret.pesable;
    line[col.U] = ret.unidades;
    if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
      return line;
  }
}`;

export const proveedoresSettings = [
  {
    "_id": "61ccba5eac0a1e5674aa807d",
    "nombre": "Servicios Veterinarios",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "coeficiente": 1,
    "input": {
      "*":{
        "input_fields": [
          "codigo",
          "nombre",
          "precio",
          "peso",
          "unidades"
        ],
        "filters":[
          `(line,idx,array) => {
            if(line[col.A] && line[col.B] && line[col.C]){
              const ret = {};
              line[col.A] = line[col.A]+'';
              line[col.B] = line[col.B].search(/no usar/i) === -1 ? line[col.B].trim() : null;
              if(isNaN(line[col.C])){
                line[col.C] = line[col.C].replace('$','').replace(',','.').replace(' ','');
                line[col.C] = parseFloat(line[col.C]);
              }
              line[col.D] = line[col.F] ? line[col.F] : null;
              line[col.E] = line[col.G] ? line[col.G] : null;
              if( line[col.A] && line[col.B] && line[col.C] )
                return line;
              //else console.log('ignorado',line);
            } //else console.log('No Entroignorado',line);
          }`
        ]
      }
    }
  },
  //{
  //  "_id": "61ccba5eac0a1e5674aa807d",
  //  "nombre": "Servicios Veterinarios",
  //  "type": "XLSX",
  //  "encode": "utf-8",
  //  "named": false,
  //  "coeficiente": 0.925,
  //  "input": {
  //    "*":{
  //      "input_fields": fieldsNames,
  //      "filters":[
  //        `(line,idx,array) => {
  //          if( line[col.U] && line[col.U] === 1){
  //            const ret = {};
  //            ret.codigo = line[col.A]+'';
  //            ret.descripcion = line[col.B];
  //            ret.clase = isNaN(line[col.T]) ? 0 : line[col.T];
//
  //            ret.input = {};
  //            ret.input.lista =  isNaN(line[col.P]) ? null : Math.round(line[col.P]*10000)/10000;
  //            ret.input.reposicion = isNaN(line[col.V]) ? null : Math.round(line[col.V]*10000)/10000;
  //            ret.input.promo = isNaN(line[col.W]) ? null : Math.round(line[col.W]*10000)/10000;
  //            ret.input.base = isNaN(line[col.X]) ? null : Math.round(line[col.X]*10000)/10000;
  //            ret.input.oferta = isNaN(line[col.Y]) ? null : Math.round(line[col.Y]*10000)/10000;
  //            ret.input.sugerido = isNaN(line[col.Z]) ? null : Math.round(line[col.Z]*10000)/10000;
  //            ret.peso = isNaN(line[col.AA]) ? null : Math.round(line[col.AA]*10000)/10000;
  //            ret.unidades = isNaN(line[col.AB]) ? null : Math.round(line[col.AB]*10000)/10000;
  //            ret.pesable = isNaN(line[col.AC]) ? null : Math.round(line[col.AC]*10000)/10000;
  //            ret.clase = isNaN(line[col.I]) ? 0 : line[col.I];
  //            ret.vbulto = {
  //              margen:  isNaN(line[col.AH]) ? array[4][col.AK] : line[col.AH],
  //              tarjeta: isNaN(line[col.AI]) ? null : Math.round(line[col.AI]*10000)/10000,
  //              debito: isNaN(line[col.AJ]) ? null : Math.round(line[col.AJ]*10000)/10000,
  //              efectivo: isNaN(line[col.AK]) ? null : Math.round(line[col.AK]*10000)/10000,
  //              descuento1: isNaN(line[col.AL]) ? null : Math.round(line[col.AL]*10000)/10000,
  //              descuento2: isNaN(line[col.AM]) ? null : Math.round(line[col.AM]*10000)/10000
  //            };
//
  //            ret.vunidad = {
  //              margen:  isNaN(line[col.AO]) ? array[4][col.AR] : line[col.AO],
  //              tarjeta: isNaN(line[col.AP]) ? null : Math.round(line[col.AP]*10000)/10000,
  //              debito: isNaN(line[col.AQ]) ? null : Math.round(line[col.AQ]*10000)/10000,
  //              efectivo: isNaN(line[col.AR]) ? null : Math.round(line[col.AR]*10000)/10000,
  //              descuento1: isNaN(line[col.AS]) ? null : Math.round(line[col.AS]*10000)/10000,
  //              descuento2: isNaN(line[col.AT]) ? null : Math.round(line[col.AT]*10000)/10000
  //            };
//
  //            ret.fabricante = line[col.BA];
  //            ret.marca = line[col.BB];
  //            ret.name = line[col.BC];
  //            ret.especie = line[col.BD];
  //            ret.edad = line[col.BE];
  //            ret.rubro = line[col.BF];
  //            ret.linea = line[col.BG];
  //            ret.raza = line[col.BH];
  //            ret.bulto = line[col.BI];
  //            ret.presentacion = line[col.BJ];
  //            ret.unidad = line[col.BK];
//
  //            line[col.A] = ret.codigo;
  //            line[col.B] = ret.descripcion;
  //            line[col.C] = ret.input;
  //            line[col.D] = ret.vbulto;
  //            line[col.E] = ret.vunidad;
  //            line[col.F] = ret.fabricante;
  //            line[col.G] = ret.marca;
  //            line[col.H] = ret.name;
  //            line[col.I] = ret.especie;
  //            line[col.J] = ret.edad;
  //            line[col.K] = ret.rubro;
  //            line[col.L] = ret.linea;
  //            line[col.M] = ret.raza;
  //            line[col.N] = ret.bulto;
  //            line[col.O] = ret.presentacion;
  //            line[col.P] = ret.unidad;
  //            line[col.Q] = ret.clase;
  //            //line[col.R] = ret.ean;
  //            line[col.S] = ret.peso;
  //            line[col.T] = ret.pesable;
  //            line[col.U] = ret.unidades;
  //            if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
  //              return line;
  //          }
  //        }`
  //      ]
  //    }
  //  }
  //},
  {
    "_id": "61cc9a4e7c6390fcb15414c2",
    "nombre": "Nutripet",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "coeficiente": 1,
    "input": {
      "*":{
        "input_fields": fieldsNames,
        "filters":[ commonFilter ]
      }
    }
  },
  {
    "_id": "61ccba1dac0a1e5674aa805c",
    "nombre": "FyP",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "coeficiente": 1,
    "input": {
      "*":{
        "input_fields": [
          "codigo",
          "nombre"
        ],
        "filters":[
          `(line,idx,array) => {
            if(line[col.B] && line[col.C] && line[col.D] && line[col.E]){
              const ret = {};
              //if(!line[col.A]){
              //  line[col.A] = (line[col.B]).replace(/[ ]/g,'')
              //}
              line[col.A] = line[col.B].replace(/[ ]/g,'')
              line[col.A] = line[col.A]+'';
              line[col.C] = isNaN(line[col.C]) ? null : line[col.C];
              line[col.D] = isNaN(line[col.D]) ? null : line[col.D];
              line[col.E] = isNaN(line[col.E]) ? null : line[col.E];
              if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
                return line;
              else console.log('ignorado',line);
            } else console.log('No Entro ignorado',line);
          }`
        ]
      }
    }
  }
  ,
//  {
//    "_id": "61ccba1dac0a1e5674aa805c",
//    "nombre": "FyP",
//    "type": "XLSX",
//    "encode": "utf-8",
//    "named": false,
//    "coeficiente": 1,
//    "input": {
//      "*":{
//        "input_fields": fieldsNames,
//        "filters":[
//          `(line,idx,array) => {
//            if(line[col.U] && line[col.U] === 1){
//              const ret = {};
//              //if(line[col.A])
//              //  ret.codigo = (line[col.A]).replace(/[ ]/g,'');
//              ret.codigo = line[col.A];
//              ret.descripcion = line[col.B];
//              ret.clase = isNaN(line[col.T]) ? 0 : line[col.T];
//              ret.peso = isNaN(line[col.AA]) ? null : Math.round(line[col.AA]*10000)/10000;
//              ret.unidades = isNaN(line[col.AB]) ? null : Math.round(line[col.AB]*10000)/10000;
//              ret.pesable = isNaN(line[col.AC]) ? null : Math.round(line[col.AC]*10000)/10000;
//
//              ret.input = {};
//              ret.input.lista =  isNaN(line[col.P]) ? null : Math.round(line[col.P]*10000)/10000;
//              ret.input.reposicion = isNaN(line[col.V]) ? null : Math.round(line[col.V]*10000)/10000;
//              ret.input.promo = isNaN(line[col.W]) ? null : Math.round(line[col.W]*10000)/10000;
//              ret.input.base = isNaN(line[col.X]) ? null : Math.round(line[col.X]*10000)/10000;
//              ret.input.oferta = isNaN(line[col.Y]) ? null : Math.round(line[col.Y]*10000)/10000;
//              ret.input.sugerido = isNaN(line[col.Z]) ? null : Math.round(line[col.Z]*10000)/10000;
//
//              ret.vbulto = {
//                margen:  isNaN(line[col.AH]) ? array[4][col.AK] : line[col.AH],
//                tarjeta: isNaN(line[col.AI]) ? null : Math.round(line[col.AI]*10000)/10000,
//                debito: isNaN(line[col.AJ]) ? null : Math.round(line[col.AJ]*10000)/10000,
//                efectivo: isNaN(line[col.AK]) ? null : Math.round(line[col.AK]*10000)/10000,
//                descuento1: isNaN(line[col.AL]) ? null : Math.round(line[col.AL]*10000)/10000,
//                descuento2: isNaN(line[col.AM]) ? null : Math.round(line[col.AM]*10000)/10000
//              };
//              ret.vunidad = {
//                margen:  isNaN(line[col.AO]) ? array[4][col.AR] : line[col.AO],
//                tarjeta: isNaN(line[col.AP]) ? null : Math.round(line[col.AP]*10000)/10000,
//                debito: isNaN(line[col.AQ]) ? null : Math.round(line[col.AQ]*10000)/10000,
//                efectivo: isNaN(line[col.AR]) ? null : Math.round(line[col.AR]*10000)/10000,
//                descuento1: isNaN(line[col.AS]) ? null : Math.round(line[col.AS]*10000)/10000,
//                descuento2: isNaN(line[col.AT]) ? null : Math.round(line[col.AT]*10000)/10000
//              };
//              ret.fabricante = line[col.BA];
//              ret.marca = line[col.BB];
//              ret.name = line[col.BC];
//              ret.especie = line[col.BD];
//              ret.edad = line[col.BE];
//              ret.rubro = line[col.BF];
//              ret.linea = line[col.BG];
//              ret.raza = line[col.BH];
//              ret.bulto = line[col.BI];
//              ret.presentacion = line[col.BJ];
//              ret.unidad = line[col.BK];
//
//              line[col.A] = ret.codigo;
//              line[col.B] = ret.descripcion;
//              line[col.C] = ret.input;
//              line[col.D] = ret.vbulto;
//              line[col.E] = ret.vunidad;
//              line[col.F] = ret.fabricante;
//              line[col.G] = ret.marca;
//              line[col.H] = ret.name;
//              line[col.I] = ret.especie;
//              line[col.J] = ret.edad;
//              line[col.K] = ret.rubro;
//              line[col.L] = ret.linea;
//              line[col.M] = ret.raza;
//              line[col.N] = ret.bulto;
//              line[col.O] = ret.presentacion;
//              line[col.P] = ret.unidad;
//              line[col.Q] = ret.clase;
//              //line[col.R] = ret.ean;
//              line[col.S] = ret.peso;
//              line[col.T] = ret.pesable;
//              line[col.U] = ret.unidades;
//              if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
//                return line;
//            }
//          }`
//        ]
//      }
//    }
//  }
//  ,
  //{
  //  "_id": '61cc9b7a7c6390fcb1541543',
  //  "nombre": "Agro Empresas",
  //  "type": "XLSX",
  //  "encode": "iso8859-3",
  //  "named": false,
  //  "coeficiente": 1.245,
  //  "input": {
  //    "*":{
  //      "input_fields": [
  //        "codigo",
  //        "nombre",
  //        "vinput",
  //        "vbulto",
  //        "vunidad",
  //        "fabricante",
  //        "marca",
  //        "name",
  //        "especie",
  //        "edad",
  //        "rubro",
  //        "linea",
  //        "raza",
  //        "nbulto",
  //        "presentacion",
  //        "unidad",
  //        "clase",
  //        "ean",
  //        "peso",
  //        "pesable",
  //        "unidades"
  //      ]
  //      ,
  //      "filters":[
  //        `(line,idx,array) => {
  //          if(line[col.U] && line[col.U] === 1){
  //            const ret = {};
  //            ret.codigo = line[col.B] ? line[col.B]+'' : null;
//
  //            ret.descripcion = line[col.A];
  //            ret.clase = isNaN(line[col.T]) ? 0 : line[col.T];
  //            ret.productos = [];
  //            ret.peso = isNaN(line[col.AA]) ? null : Math.round(line[col.AA]*10000)/10000;
  //            ret.unidades = isNaN(line[col.AB]) ? null : Math.round(line[col.AB]*10000)/10000;
  //            ret.pesable = isNaN(line[col.AC]) ? null : Math.round(line[col.AC]*10000)/10000;
  //            ret.input = {};
  //            ret.input.lista =  isNaN(line[col.P]) ? null : Math.round(line[col.P]*10000)/10000;
  //            ret.input.reposicion = isNaN(line[col.V]) ? null : Math.round(line[col.V]*10000)/10000;
  //            ret.input.promo = isNaN(line[col.W]) ? null : Math.round(line[col.W]*10000)/10000;
  //            ret.input.base = isNaN(line[col.X]) ? null : Math.round(line[col.X]*10000)/10000;
  //            ret.input.oferta = isNaN(line[col.Y]) ? null : Math.round(line[col.Y]*10000)/10000;
  //            ret.input.sugerido = isNaN(line[col.Z]) ? null : Math.round(line[col.Z]*10000)/10000;
//
  //            ret.vbulto = {
  //              margen:  isNaN(line[col.AH]) ? array[4][col.AK] : line[col.AH],
  //              tarjeta: isNaN(line[col.AI]) ? null : Math.round(line[col.AI]*10000)/10000,
  //              debito: isNaN(line[col.AJ]) ? null : Math.round(line[col.AJ]*10000)/10000,
  //              efectivo: isNaN(line[col.AK]) ? null : Math.round(line[col.AK]*10000)/10000,
  //              descuento1: isNaN(line[col.AL]) ? null : Math.round(line[col.AL]*10000)/10000,
  //              descuento2: isNaN(line[col.AM]) ? null : Math.round(line[col.AM]*10000)/10000
  //            };
  //            ret.vunidad = {
  //              margen:  isNaN(line[col.AO]) ? array[4][col.AR] : line[col.AO],
  //              tarjeta: isNaN(line[col.AP]) ? null : Math.round(line[col.AP]*10000)/10000,
  //              debito: isNaN(line[col.AQ]) ? null : Math.round(line[col.AQ]*10000)/10000,
  //              efectivo: isNaN(line[col.AR]) ? null : Math.round(line[col.AR]*10000)/10000,
  //              descuento1: isNaN(line[col.AS]) ? null : Math.round(line[col.AS]*10000)/10000,
  //              descuento2: isNaN(line[col.AT]) ? null : Math.round(line[col.AT]*10000)/10000
  //            };
  //            ret.fabricante = line[col.BA];
  //            ret.marca = line[col.BB];
  //            ret.name = line[col.BC];
  //            ret.especie = line[col.BD];
  //            ret.edad = line[col.BE];
  //            ret.rubro = line[col.BF];
  //            ret.linea = line[col.BG];
  //            ret.raza = line[col.BH];
  //            ret.bulto = line[col.BI];
  //            ret.presentacion = line[col.BJ];
  //            ret.unidad = line[col.BK];
//
  //            line[col.A] = ret.codigo;
  //            line[col.B] = ret.descripcion;
  //            line[col.C] = ret.input;
  //            line[col.D] = ret.vbulto;
  //            line[col.E] = ret.vunidad;
  //            line[col.F] = ret.fabricante;
  //            line[col.G] = ret.marca;
  //            line[col.H] = ret.name;
  //            line[col.I] = ret.especie;
  //            line[col.J] = ret.edad;
  //            line[col.K] = ret.rubro;
  //            line[col.L] = ret.linea;
  //            line[col.M] = ret.raza;
  //            line[col.N] = ret.bulto;
  //            line[col.O] = ret.presentacion;
  //            line[col.P] = ret.unidad;
  //            line[col.Q] = ret.clase;
  //            //line[col.R] = ret.ean;
  //            line[col.S] = ret.peso;
  //            line[col.T] = ret.pesable;
  //            line[col.U] = ret.unidades;
//
  //            if( line[col.A] && line[col.C] && line[col.D] )
  //              return line;
  //          }
//
  //        }`,
  //        `(line,idx,array) => {
  //          if(!line[col.B]){
  //            if(array[idx-1]){
  //              array[idx][col.B] =  array[idx-1][col.B];
  //              line[col.B] = array[idx-1][col.B];
  //            } else line[col.B] = "error";
  //          }
  //          if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
  //          return line;
  //        }`
  //      ]
  //    }
  //  }
  //},
  {
    "_id": '61ccb9cdac0a1e5674aa8035',
    "nombre": "Dumas",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "input": {
      "*":{
        "input_fields": [
          'codigo',
          'nombre',
          'fabricante',
          'precio',
        ],
        "filters":[
          `(line,idx,array) => {
            if(line[col.B]){
              console.log(line);
              line[col.B] = line[col.B]+'';
              line[col.B] = line[col.B].search(/Av. Independencia 5123/i) === -1 ? line[col.B].trim() : 'SYSTEMNOVA';
              line[col.B] = line[col.B].search(/columna/i) === -1 ? line[col.B].trim() : 'SYSTEMNOVA';
              line[col.B] = line[col.B].search(/dumas/i) === -1 ? line[col.B].trim() : 'SYSTEMNOVA';
              line[col.B] = line[col.B].search(/concepto/i) === -1 ? line[col.B].trim() : 'SYSTEMNOVA';
              line[col.B] = line[col.B].search(/SYSTEMNOVA/i) === -1 ? line[col.B].trim() : null;
            }
            if(line[col.B]){
              const ret = {};
              if(!line[col.A]){
                if(line[col.C])
                  ret.codigo = ('NC_'+line[col.C]+'_'+line[col.B]).replace(/[ ]/g,'');
                else
                  ret.codigo = ('NC_'+line[col.B]).replace(/[ ]/g,'');
              } else {
                ret.codigo = line[col.A]+'';
              }
              ret.nombre = line[col.B];
              ret.fabricante = line[col.C];
              ret.precio = isNaN(line[col.G]) ? (isNaN(line[col.D]) ? null : line[col.D]) : line[col.G];
              line[col.A] = ret.codigo.trim();
              line[col.B] = ret.nombre.search(/dumas/i) === -1 ? ret.nombre.trim() : null;
              line[col.C] = ret.fabricante;
              line[col.D] = ret.precio;
              if( line[col.A] && line[col.B])
                return line;
              else console.log('ignorado',line);
            } else console.log('No entro ignorado',line);
          }`
        ]
      },
      "PIEDRAS":{
        "input_fields": [
          'codigo',
          'nombre',
          'precio',
        ],
        "filters":[
          `(line,idx,array) => {
            if(line[col.A] && line[col.B] && line[col.C]){
              const ret = {};
              if(!line[col.A]){
                ret.codigo = (line[col.C]+'_'+line[col.B]).replace(/[ ]/g,'');
              } else {
                ret.codigo = line[col.A]+'';
              }

              ret.nombre = line[col.B];
              ret.precio = isNaN(line[col.F]) ? (isNaN(line[col.C]) ? null : line[col.C]) : line[col.F];
              line[col.A] = ret.codigo.trim();
              line[col.B] = ret.nombre.search(/dumas/i) === -1 ? ret.nombre.trim() : null;
              line[col.C] = ret.precio;
              if( line[col.A] && line[col.B] && line[col.C])
                return line;
              else console.log('ignorado',line);
            } else console.log('No Entro ignorado',line);
          }`
        ]
      }
    },
//    aggregate:[
////      {  $addFields:{
////        "isValid":{
////          "$switch": {
////            "branches": [
////              { "case": {"$eq" : ["$hoja" , "ALIMENTOS"]},
////                then : { "$and": [ "$codigo","$nombre","$marca",{"$isNumber": "$lista"},{"$isNumber": "$reposicion"}]}
////              },
////              { "case": {"$eq": ["$hoja" , "ACCESORIOS"]},
////                then : { "$and": [ "$codigo","$nombre","$marca",{"$isNumber": "$lista"}]}
////              },
////              { "case": {"$eq": ["$hoja" , "FARMACOS"]},
////                then : { "$and": [ "$codigo","$nombre","$marca",{"$isNumber": "$lista"}]}
////              },
////              { "case": {"$eq": ["$hoja" , "PIEDRAS"]},
////                then : { "$and": [ "$codigo","$nombre","$marca",{"$isNumber": "$lista"},{"$isNumber": "$reposicion"}]}
////              },
////              { "case": {"$eq": ["$hoja" , "SANEAMIENTO"]},
////                then : { "$and": [ "$codigo","$nombre","$marca",{"$isNumber": "$lista"},{"$isNumber": "$reposicion"}]}
////              },
////              { "case": {"$eq": ["$hoja" , "SHAMPOO"]},
////              then : { "$and": [ "$codigo","$nombre","$marca",{"$isNumber": "$lista"},{"$isNumber": "$reposicion"}]}
////              },
////              { "case": {"$eq": ["$hoja" , "VARIOS"]},
////                then : { "$and": [ "$codigo","$nombre","$marca",{"$isNumber": "$lista"},{"$isNumber": "$reposicion"}]}
////              }
////            ]
////          }
////        }
////      }},
////      {"$match" : {"isValid": true}},
//      {
//        "$project":{
//          "tmpID":1,
//          "proveedor":1,
//          "codigo":1,
//          "nombre": 1,
//          "marca":1,
//          "bulto": 1,
//          "contiene": 1,
//          "unidad": 1,
//          "lista": 1,
//          "porcentage":1,
//          "descuento":1,
//          "reposicion": 1
//        }
//      }
//    ]
  },
  {
    "_id": "61ccb984ac0a1e5674aa8013",
    "nombre": "Rap",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "coeficiente": 1.028925619834711,
    "input": {
      "*":{
        "input_fields": [
          "codigo",
          "ean",
          "ean_bulto",
          "nombre",
          "unidades",
          "unidades_desc",
          "presentacion",
          "peso",
          "peso_desc",
          "lista",
          "coef",
          "preciot",
          "preciob"
        ],
        "filters":[
          `(line,idx,array) => {
            if(line[col.A] && line[col.C] && line[col.E]){
              const ret = {};
              ret.codigo = line[col.A]+'';
              if(!line[col.A]){
                ret.codigo = line[col.C].replace(/[ ]/g,'');
              } else {
                ret.codigo = line[col.A]+'';
              }

              ret.ean = line[col.B]+'';
              ret.nombre = line[col.C];
              ret.ean_bulto = line[col.D]+'';
              ret.lista = line[col.E];
              ret.unidades_desc = line[col.F];
              ret.unidades = line[col.G];
              ret.presentacion = line[col.H];
              ret.peso = line[col.I];
              ret.peso_desc = line[col.J];
              ret.coef = line[col.K];
              ret.preciot = ret.lista/1.21*ret.coef*1.24;
              ret.preciob = ret.lista/1.21*ret.coef*1.245;
              line[col.A] = ret.codigo;
              line[col.B] = ret.ean;
              line[col.C] = ret.ean_bulto;
              line[col.D] = ret.nombre;
              line[col.E] = ret.unidades;
              line[col.F] = ret.unidades_desc;
              line[col.G] = ret.presentacion;
              line[col.H] = ret.peso;
              line[col.I] = ret.peso_desc;
              line[col.J] = ret.lista;
              line[col.K] = ret.coef,
              line[col.L] = ret.preciot;
              line[col.M] = ret.preciob;

              if( line[col.A] && line[col.B] && line[col.D] && line[col.J] )
                return line;
              //else console.log('ignorado',line);
            } //else console.log('No Entro ignorado',line);
          }`
        ]
      }
    }
  },
//  {
//  "_id": '61ccba46ac0a1e5674aa8071',
//  "nombre": "Sciarriello",
//  "type": "XLSX",
//  "encode": "utf-8",
//  "named": false,
//  "coeficiente": 0.95,
//  "input": {
//    "*":{
//      "input_fields": fieldsNames,
//      "filters":[
//        `(line,idx,array) => {
//          if(line[col.U] && line[col.U] === 1){
//            const ret = {};
//            if(line[col.B] && line[col.C])
//              ret.codigo = (line[col.B]+line[col.C]).replace(/[ ]/g,'');
//            ret.descripcion = line[col.B];
//            ret.clase = isNaN(line[col.T]) ? 0 : line[col.T];
//            ret.peso = isNaN(line[col.AA]) ? null : Math.round(line[col.AA]*10000)/10000;
//            ret.unidades = isNaN(line[col.AB]) ? null : Math.round(line[col.AB]*10000)/10000;
//            ret.pesable = isNaN(line[col.AC]) ? null : Math.round(line[col.AC]*10000)/10000;
//
//            ret.input = {};
//            ret.input.lista =  isNaN(line[col.P]) ? null : Math.round(line[col.P]*10000)/10000;
//            ret.input.reposicion = isNaN(line[col.V]) ? null : Math.round(line[col.V]*10000)/10000;
//            ret.input.promo = isNaN(line[col.W]) ? null : Math.round(line[col.W]*10000)/10000;
//            ret.input.base = isNaN(line[col.X]) ? null : Math.round(line[col.X]*10000)/10000;
//            ret.input.oferta = isNaN(line[col.Y]) ? null : Math.round(line[col.Y]*10000)/10000;
//            ret.input.sugerido = isNaN(line[col.Z]) ? null : Math.round(line[col.Z]*10000)/10000;
//
//            ret.vbulto = {
//              margen:  isNaN(line[col.AH]) ? array[4][col.AK] : line[col.AH],
//              tarjeta: isNaN(line[col.AI]) ? null : Math.round(line[col.AI]*10000)/10000,
//              debito: isNaN(line[col.AJ]) ? null : Math.round(line[col.AJ]*10000)/10000,
//              efectivo: isNaN(line[col.AK]) ? null : Math.round(line[col.AK]*10000)/10000,
//              descuento1: isNaN(line[col.AL]) ? null : Math.round(line[col.AL]*10000)/10000,
//              descuento2: isNaN(line[col.AM]) ? null : Math.round(line[col.AM]*10000)/10000
//            };
//
//            ret.vunidad = {
//              margen:  isNaN(line[col.AO]) ? array[4][col.AR] : line[col.AO],
//              tarjeta: isNaN(line[col.AP]) ? null : Math.round(line[col.AP]*10000)/10000,
//              debito: isNaN(line[col.AQ]) ? null : Math.round(line[col.AQ]*10000)/10000,
//              efectivo: isNaN(line[col.AR]) ? null : Math.round(line[col.AR]*10000)/10000,
//              descuento1: isNaN(line[col.AS]) ? null : Math.round(line[col.AS]*10000)/10000,
//              descuento2: isNaN(line[col.AT]) ? null : Math.round(line[col.AT]*10000)/10000
//            };
//
//            ret.fabricante = line[col.BA];
//            ret.marca = line[col.BB];
//            ret.name = line[col.BC];
//            ret.especie = line[col.BD];
//            ret.edad = line[col.BE];
//            ret.rubro = line[col.BF];
//            ret.linea = line[col.BG];
//            ret.raza = line[col.BH];
//            ret.bulto = line[col.BI];
//            ret.presentacion = line[col.BJ];
//            ret.unidad = line[col.BK];
//
//            line[col.A] = ret.codigo;
//            line[col.B] = ret.descripcion;
//            line[col.C] = ret.input;
//            line[col.D] = ret.vbulto;
//            line[col.E] = ret.vunidad;
//            line[col.F] = ret.fabricante;
//            line[col.G] = ret.marca;
//            line[col.H] = ret.name;
//            line[col.I] = ret.especie;
//            line[col.J] = ret.edad;
//            line[col.K] = ret.rubro;
//            line[col.L] = ret.linea;
//            line[col.M] = ret.raza;
//            line[col.N] = ret.bulto;
//            line[col.O] = ret.presentacion;
//            line[col.P] = ret.unidad;
//            line[col.Q] = ret.clase;
//            //line[col.R] = ret.ean;
//            line[col.S] = ret.peso;
//            line[col.T] = ret.pesable;
//            line[col.U] = ret.unidades;
//
//            if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
//              return line;
//          }
//        }`
//      ]
//    }
//  },
////  aggregate:[
//////    {
//////      $addFields : {
//////      "isValid" : {
//////        "$and": [
//////          "$nombre",
//////          "$presentacion",
////////          {"$isNumber": "$reposicion"},
//////          "$reposicion",
//////        ]
//////       },
////////       "coso": { $replaceOne: { input: "$reposicion", find: "\$", replacement: "" } }//{ "$regexFind": { "input": "$reposicion", "regex": /[0-9]*/ }  }
//////      }
//////    },
//////    {"$match" : {"isValid": true}},
////    {
////      "$project":{
////        "tmpID":1,
////        "proveedor": 1,
////        "codigo":1,
////        "hoja": 1,
////        "nombre": 1,
////        "presentacion":1,
////        "lista": 1,
////        "contiene":1,
////        "bulto":1,
////        "unidad":1,
////        "reposicion": 1
////      }
////    }
////  ]
//  },
  {
    "_id": '61ccba46ac0a1e5674aa8071',
    "nombre": "Sciarriello",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "coeficiente": 0.95,
    "input": {
      "*":{
        "input_fields": [
          'codigo',
          'nombre',
          'peso',
          'unidades',
          'precio'
        ],
        "filters":[
          `(line,idx,array) => {
            if(line[col.B] && line[col.C] && line[col.D]){
              console.log(line);
              const ret = {};
              ret.nombre = line[col.B];
              ret.codigo = (line[col.B]+line[col.C]).replace(/[ ]/g,'');
              ret.precio = isNaN(line[col.D]) ? parseFloat(line[col.D].replace(/[$]/,'')) : line[col.D];
              line[col.C] = line[col.C].replace(',','.');
              const regex = /[0-9.]+/g;
              const algo = line[col.C].match(regex);
              if(algo){
                switch (algo.length) {
                  case 2:
                    line[col.C] = parseFloat(algo[1]);
                    line[col.D] = parseFloat(algo[0]);
                    break;
                  case 1:
                    line[col.C] = parseFloat(algo[0]);
                    line[col.D] = 1;
                    break;
                  default:
                    line[col.C] = null;
                    line[col.D] = null;
                    break;
                }
              }
              line[col.A] = ret.codigo.trim();
              line[col.B] = ret.nombre.trim();
              line[col.E] = ret.precio;
              console.log(ret,algo);
              if( line[col.A] && line[col.B] && line[col.C] && line[col.E])
                return line;
              else console.log('ignorado',line);
            } else console.log('No Entro ignorado',line);
          }`
        ]
      }
    },
  //  aggregate:[
  ////    {
  ////      $addFields : {
  ////      "isValid" : {
  ////        "$and": [
  ////          "$nombre",
  ////          "$presentacion",
  //////          {"$isNumber": "$reposicion"},
  ////          "$reposicion",
  ////        ]
  ////       },
  //////       "coso": { $replaceOne: { input: "$reposicion", find: "\$", replacement: "" } }//{ "$regexFind": { "input": "$reposicion", "regex": /[0-9]*/ }  }
  ////      }
  ////    },
  ////    {"$match" : {"isValid": true}},
  //    {
  //      "$project":{
  //        "tmpID":1,
  //        "proveedor": 1,
  //        "codigo":1,
  //        "hoja": 1,
  //        "nombre": 1,
  //        "presentacion":1,
  //        "lista": 1,
  //        "contiene":1,
  //        "bulto":1,
  //        "unidad":1,
  //        "reposicion": 1
  //      }
  //    }
  //  ]
  },
  {
    "_id": '61fa93fae89735a953a8ed24',
    "nombre": "Butter S.R.L.",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "coeficiente": 1.028925619834711,
    "input": {
      "*":{
        "input_fields":[
          "codigo",
          "nombre",
          "lista"
        ],
        "filters":[
          `(line,idx,array) => {
            if(line[col.A] && line[col.B]){
              const ret = {};
              ret.codigo = (line[col.A]).replace(/[ ]/g,'');
              //ret.codigo = ret.codigo+line[col.B]+line[col.C];

              ret.descripcion = line[col.A];
              ret.lista = line[col.B]

              line[col.A] = ret.codigo.trim();
              line[col.B] = ret.descripcion.trim();
              line[col.C] = ret.lista;
              if( line[col.A] && line[col.B] && line[col.C])
                return line;
              else console.log('ignorado',line);
            } else console.log('No Entro ignorado',line);
          }`
        ]
      }
    }
  },
//  {
//    "_id": '61fa93fae89735a953a8ed24',
//    "nombre": "Butter S.R.L.",
//    "type": "XLSX",
//    "encode": "utf-8",
//    "named": false,
//    "coeficiente": 1.028925619834711,
//    "input": {
//      "*":{
//        "input_fields": fieldsNames,
//        "filters":[
//          `(line,idx,array) => {
//            if(line[col.U] && line[col.U] === 1){
//              const ret = {};
//              //if(line[col.B] && line[col.C])
//                ret.codigo = (line[col.A]).replace(/[ ]/g,'');
//                ret.codigo = ret.codigo+line[col.M]+line[col.N];
//
//              ret.descripcion = line[col.A];
//              ret.clase = isNaN(line[col.T]) ? 0 : line[col.T];
//              ret.peso = isNaN(line[col.AA]) ? null : Math.round(line[col.AA]*10000)/10000;
//              ret.unidades = isNaN(line[col.AB]) ? null : Math.round(line[col.AB]*10000)/10000;
//              ret.pesable = isNaN(line[col.AC]) ? null : Math.round(line[col.AC]*10000)/10000;
//
//              ret.input = {};
//              ret.input.lista =  isNaN(line[col.P]) ? null : Math.round(line[col.P]*10000)/10000;
//              ret.input.reposicion = isNaN(line[col.V]) ? null : Math.round(line[col.V]*10000)/10000;
//              ret.input.promo = isNaN(line[col.W]) ? null : Math.round(line[col.W]*10000)/10000;
//              ret.input.base = isNaN(line[col.X]) ? null : Math.round(line[col.X]*10000)/10000;
//              ret.input.oferta = isNaN(line[col.Y]) ? null : Math.round(line[col.Y]*10000)/10000;
//              ret.input.sugerido = isNaN(line[col.Z]) ? null : Math.round(line[col.Z]*10000)/10000;
//
//              ret.vbulto = {
//                margen:  isNaN(line[col.AH]) ? array[4][col.AK] : line[col.AH],
//                tarjeta: isNaN(line[col.AI]) ? null : Math.round(line[col.AI]*10000)/10000,
//                debito: isNaN(line[col.AJ]) ? null : Math.round(line[col.AJ]*10000)/10000,
//                efectivo: isNaN(line[col.AK]) ? null : Math.round(line[col.AK]*10000)/10000,
//                descuento1: isNaN(line[col.AL]) ? null : Math.round(line[col.AL]*10000)/10000,
//                descuento2: isNaN(line[col.AM]) ? null : Math.round(line[col.AM]*10000)/10000
//              };
//
//              ret.vunidad = {
//                margen:  isNaN(line[col.AO]) ? array[4][col.AR] : line[col.AO],
//                tarjeta: isNaN(line[col.AP]) ? null : Math.round(line[col.AP]*10000)/10000,
//                debito: isNaN(line[col.AQ]) ? null : Math.round(line[col.AQ]*10000)/10000,
//                efectivo: isNaN(line[col.AR]) ? null : Math.round(line[col.AR]*10000)/10000,
//                descuento1: isNaN(line[col.AS]) ? null : Math.round(line[col.AS]*10000)/10000,
//                descuento2: isNaN(line[col.AT]) ? null : Math.round(line[col.AT]*10000)/10000
//              };
//
//              ret.fabricante = line[col.BA];
//              ret.marca = line[col.BB];
//              ret.name = line[col.BC];
//              ret.especie = line[col.BD];
//              ret.edad = line[col.BE];
//              ret.rubro = line[col.BF];
//              ret.linea = line[col.BG];
//              ret.raza = line[col.BH];
//              ret.bulto = line[col.BI];
//              ret.presentacion = line[col.BJ];
//              ret.unidad = line[col.BK];
//
//              line[col.A] = ret.codigo;
//              line[col.B] = ret.descripcion;
//              line[col.C] = ret.input;
//              line[col.D] = ret.vbulto;
//              line[col.E] = ret.vunidad;
//              line[col.F] = ret.fabricante;
//              line[col.G] = ret.marca;
//              line[col.H] = ret.name;
//              line[col.I] = ret.especie;
//              line[col.J] = ret.edad;
//              line[col.K] = ret.rubro;
//              line[col.L] = ret.linea;
//              line[col.M] = ret.raza;
//              line[col.N] = ret.bulto;
//              line[col.O] = ret.presentacion;
//              line[col.P] = ret.unidad;
//              line[col.Q] = ret.clase;
//              //line[col.R] = ret.ean;
//              line[col.S] = ret.peso;
//              line[col.T] = ret.pesable;
//              line[col.U] = ret.unidades;
//
//              if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
//                return line;
//            }
//          }`
//        ]
//      }
//    }
//  },
  {
    "_id": '61cc9b7a7c6390fcb1541543',
    "nombre": "Agro Empresas",
    "type": "XLSX",
    "encode": "iso8859-3",
    "named": false,
    "coeficiente": 1.028925619834711,
    "input": {
      "*":{
        "input_fields":
        [
          "codigo",
          "nombre",
          "peso",
          "unidades",
          "precio",
          "bulto",
          "sugerido",
          "margen_s"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            let cols = -1;
            //console.log('B',!isNaN(parseFloat(line[col.B])))
            //console.log('C',!isNaN(parseFloat(line[col.C])))
            //console.log('D',!isNaN(parseFloat(line[col.D])))
            //console.log('E',!isNaN(parseFloat(line[col.E])))
            //console.log('F',!isNaN(parseFloat(line[col.F])))
            //console.log('G',!isNaN(parseFloat(line[col.G])))
            //console.log('H',!isNaN(parseFloat(line[col.H])))
            //console.log('I',!isNaN(parseFloat(line[col.I])))
            //console.log('J',!isNaN(parseFloat(line[col.J])))
            if (
              !isNaN(parseFloat(line[col.B]))
              && !isNaN(parseFloat(line[col.C]))
              && !isNaN(parseFloat(line[col.D]))
              && !isNaN(parseFloat(line[col.E]))
              && !isNaN(parseFloat(line[col.F]))
              && !isNaN(parseFloat(line[col.G]))
              && !isNaN(parseFloat(line[col.H]))
              && !isNaN(parseFloat(line[col.I]))
            ) cols += 1;
            if (
              !isNaN(parseFloat(line[col.C]))
              && cols < 0
              && !isNaN(parseFloat(line[col.D]))
              && !isNaN(parseFloat(line[col.E]))
              && !isNaN(parseFloat(line[col.F]))
              && !isNaN(parseFloat(line[col.G]))
              && !isNaN(parseFloat(line[col.H]))
              && !isNaN(parseFloat(line[col.I]))
              && !isNaN(parseFloat(line[col.J]))
            ) cols += 2;
            const ret = {};
            switch (cols){
              case 0:
                ret.codigo = line[col.B] ? line[col.B]+'' : null;
                ret.nombre = line[col.A];
                ret.peso = isNaN(line[col.C]) ? null : line[col.C];
                ret.unidades = isNaN(line[col.D]) ? null : line[col.D];
                ret.bultoPrecio = isNaN(line[col.G+cols]) ? null : line[col.G]*1.028925619834711;
                ret.unidadPrecio = isNaN(line[col.H+cols]) ? null : line[col.H]*1.028925619834711;
                ret.unidadSugerido = isNaN(line[col.I]) ? null : line[col.I];
                ret.margen = isNaN(ret.unidadSugerido) || isNaN(ret.unidadPrecio) ? null : ret.unidadSugerido/ret.unidadPrecio;
                break;
              case 1:
                ret.codigo = line[col.B+cols] ? line[col.B+cols]+'' : null;
                ret.nombre = line[col.A+cols];
                ret.peso = isNaN(line[col.C+cols]) ? null : line[col.C+cols];
                ret.unidades = isNaN(line[col.D+cols]) ? null : line[col.D+cols];
                ret.bultoPrecio = isNaN(line[col.G+cols]) ? null : line[col.G+cols]*1.028925619834711;
                ret.unidadPrecio = isNaN(line[col.H+cols]) ? null : line[col.H+cols]*1.028925619834711;
                ret.unidadSugerido = isNaN(line[col.I+cols]) ? null : line[col.I+cols];
                ret.margen = isNaN(ret.unidadSugerido) || isNaN(ret.unidadPrecio) ? null : ret.unidadSugerido/ret.unidadPrecio;
                break;
              default:
                console.log("Error cols",cols);
                console.log(line)
                break;
            }
            if (cols > -1){
              line[col.A] = ret.codigo ? ret.codigo.trim() : '';
              line[col.B] = ret.nombre;
              line[col.C] = ret.peso;
              line[col.D] = ret.unidades;
              line[col.F] = ret.bultoPrecio;
              line[col.E] = ret.unidadPrecio;
              line[col.G] = ret.unidadSugerido;
              line[col.H] = ret.margen;
              if( line[col.A] && line[col.C] && line[col.D] && line[col.E] && line[col.F] )
                return line;
              else console.log('ignorado',line);
            } //else console.log('No Entro ignorado',line);
          }`,
          `(line,idx,array) => {
            if(!line[col.B]){
              if(array[idx-1]){
                array[idx][col.B] =  array[idx-1][col.B].trim();
                line[col.B] = array[idx-1][col.B].trim();
              } else line[col.B] = "error";
            }
            if( line[col.A] && line[col.B] && line[col.C] && line[col.D] )
            return line;
          }`
        ]
      }
    }
  },
  {
    "_id": '61ccc87eac0a1e5674aa86ec',
    "nombre": "CanCat",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "input": {
      "LIsta Precios":{
        "input_fields": [
          ,
          "codigo",
          "nombre",
          "ean",
          "bulto",
          "contiene",
          "reposicion",
          ,
          ,
          ,
          "sugerido"
        ],
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[1]
            ret['nombre'] = line[2];
            ret.ean = isNaN(line[3]) ? null : line[3];
            ret.bulto = line[4];
            ret.contiene = isNaN(line[5]) ? 1 : line[5];
            ret.reposicion = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
            ret.sugerido = isNaN(line[10]) ? null : Math.round(line[10]*10000)/10000;
            line[3] = ret.ean;
            line[5] = ret.contiene;
            line[6] = ret.reposicion;
            line[10] = ret.sugerido;
            if(line[1] && line[2] && line[4] && line[5] && line[6] )
              return line;
            else console.log('ignorado',line);
          }`
        ]
      },
    },
//    aggregate:[
////      {
////        $addFields : {
////        "isValid" : {
////          "$and": [
////            {"$isNumber": "$codigo"},
////            {"$isNumber": "$bulto"},
////            {"$isNumber": "$contiene"},
////            {"$isNumber": "$neto"},
////            {"$isNumber": "$bultoneto"},
////            {"$isNumber": "$bultolista"},
////            {"$isNumber": "$lista"},
////            {"$isNumber": "$sugerido"},
////          ]
////         }
////        }
////      },
////      {"$match" : {"isValid": true}},
//      {
//        "$project":{
//          "tmpID":1,
//          "nombre":1,
//          "codigo":1,
//          "ean":1,
//          "contiene":1,
//          "bulto":1,
//          "reposicion": 1,
//          "sugerido": 1
//        }
//      }
//    ]

  }
];


@Injectable({
  providedIn: 'root'
})

export class ListasProveedoresService {

  constructor(private http: HttpClient) { }

  create(data): Promise<object> {
    return this.http
              .post(`${API_URI}/tmplistas/create`, data)
              .toPromise();
  }

  addArticulo(reg): Promise<object> {
    return this.http
              .post(`${API_URI}/proveedoresarticulos/`, reg)
              .toPromise();
  }

  async addProducto(reg): Promise<object> {
    return await this.http
              .post(`${API_URI}/proveedoresproductos/`, reg)
              .toPromise();
  }

  async getProductos(reg): Promise<object> {
    return await this.http
              .post(`${API_URI}/proveedoresproductos/ids/`, reg)
              .toPromise();
  }

  checkLista(reg): Promise<object> {
    return this.http
              .post(`${API_URI}/proveedoreslistas/checklista`, reg)
              .toPromise();
  }
  setLista(reg): Promise<object> {
    return this.http
              .post(`${API_URI}/proveedoreslistas/setlista`, reg)
              .toPromise();
  }
  setprecio(reg): Promise<object> {
    return this.http
              .post(`${API_URI}/proveedoresprecios/add`, reg)
              .toPromise();
  }

  async XLSX(prov: any, src: any[]): Promise<object> {
    const notProcesed = [];
    //console.log(src);
    let resultado = [];
    for (const key in src) {
      const data = [];
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        if ( prov.input[key] || prov.input["*"] ){
          const params = prov.input[key] || prov.input['*'];
          const hoja = JSON.parse(JSON.stringify(src[key]));
          let ret = src[key];
//          console.log(key)
          if(params['filters']){
            for (let f = 0; f < params['filters'].length; f++) {
              const func = eval(params['filters'][f]);
              ret = ret.filter(func);
            }
          }

          //let prevNombre = "";

          for (let i = 0; i < ret.length; i++) {
            const line = ret[i];
            let e = {};
            if(params['input_fields']){
              for (let n = 0; n < params['input_fields'].length; n++) {
                const fld = params['input_fields'][n];
                //if(fld === "agroempresasnombre"){
                //  if( line[n] ) prevNombre = line[n];
                //  else line[n] = prevNombre;
                //}
                if(fld) e[fld] = line[n];
              }
            } else {
              e = line;
              console.log("no es input_field",e);
            };
            e['hoja'] = key;
            e['proveedor'] = prov._id;
            e['lista_id'] = prov.lista_id;
            data.push(e)
          }
//          console.log("XLSX_data",data);
          if(prov.aggregate){
            const result:any = await this.create({data, clean: prov.clean, aggregate: prov.aggregate});
            resultado = resultado.concat(result.result)
          } else {
            resultado = resultado.concat(data);
          }
        } else {
          notProcesed.push(src[key])
        }
      }
    }

    return resultado;
  }


//  rapTXT(src: string): any {
//    const data: any = src.split('\n');
//    const retData = []
//    data.map((line: string) => {
////        line = line.replace(/,/g, '');
//        //const capturingRegexText = /(?<codigo>[0-9][0-9][0-9][0-9])\s?(?<ean>[0-9]*)\s(?<description>[0-9a-zA-ZñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*)([\$ ]+)(?<precio>[0-9,\.]+)([\$ ]*)([0-9,\.]*)/;
////        const capturingRegexText = /(?<codigo>[0-9][0-9][0-9][0-9])\s+(?<ean>[0-9]*)\s(?<description>[0-9a-zA-ZñÑ \.,+\-&"/]*)\s*([0-9]*)[xX]\s?([0-9,\.]*)\s?([a-zA-Z\.]+)\s?([0-9]*)([\$ ]+)(?<precio>[0-9,\.]+)([\$ ]*)([0-9,\.]*)/
//        const capturingRegexText = /([0-9][0-9][0-9][0-9])\s+([0-9]+)\s([0-9a-zA-ZñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*)\s?([0-9]*)[xX]\s?([0-9,\.]*)\s?([a-zA-Z\.]+)\s?([0-9\.]*)([\$ ]+)([0-9,\.]+)([\$ ]*)([0-9,\.]*)/
//        //const capturingRegexText = /([0-9][0-9][0-9][0-9])\s+([0-9]+)\s([0-9a-zA-ZñÑ \.,+\-&"/]*)\s([0-9xX ,\.]*)([a-zA-Z\.]*)\s?([0-9\.]*)([\$ ]+)([0-9,\.]+)([\$ ]*)([0-9,\.]*)/
//        const reg:any = line.match(capturingRegexText);
///*
//        reg['groups']['precio'] = parseFloat(reg['groups']['precio'].replace(/[,]/g,''))
//        reg['groups']['details'] = reg['groups']['description'].match(/([0-9a-zA-ZñÑ \.,+\-&"/]*)\s?([0-9,\.]*)[xX]\s?([0-9,\.]+)\s?([a-zA-Z\.]+)\s([0-9]*)/);
//        reg['groups']['bulto'] = reg['groups']['details'][2] === '' ? 1 : parseFloat(reg['groups']['details'][2]) ;
//        reg['groups']['contiene'] = parseFloat(reg['groups']['details'][3]);
//        reg['groups']['unidad'] = reg['groups']['details'][4];
//        reg['groups']['descuento'] = .85
////        reg['groups']['Name'] = reg['groups']['details'][1];
//        reg['groups']['Name'] = reg['groups']['description'];
//*/
//      if(reg){
//        const extra = reg[3].match(/([0-9\. ]*)$/)
////        reg[4] = reg[3].match(/([0-9]+)([xX]+)([0-9,\.]*)([a-zA-Z]*)$|([xX])\s([0-9]+)\s?([a-zA-Z\.]*)([0-9]*)$/)
//        extra[0] = extra[0].trim();
//        reg['groups'] = {};
//        reg['groups']['input'] = line;
//        reg[9] = parseFloat(reg[9].replace(/[,]/g,''));
//        reg['groups']['codigo'] = reg[1];
//        reg['groups']['ean'] = reg[2];
//        reg['groups']['nombre'] = reg[3].replace(extra[0],'').replace(/["]/g,'').trim();
//        reg['groups']['bulto'] = extra[0] === '' ? 1 : parseFloat(extra[0]);
//        reg['groups']['contiene'] = parseFloat(reg[5].replace(/,/g,'.'));
//        reg['groups']['unidad'] = reg[6];
//        reg['groups']['reposicion'] = round(reg[9]/1.21*.85*1.245,2);
//        reg['groups']['extra'] = extra;
////      reg['groups'] = groups
//        retData.push(reg.groups)
//      } else {
//        console.log(line)
//      }
//    })
//    console.log(data)
//    return retData;
//  }


//  rapOptimum(src: string): any {
//    const data: any = src.split('\n');
//    const retData = []
//    data.map((line: string) => {
////        line = line.replace(/,/g, '');
//        const capturingRegexText = /(?<codigo>[0-9][0-9][0-9][0-9])\s?(?<ean>[0-9]*)\s(?<description>[0-9a-zA-ZñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*)([\$ ]+)(?<precio>[0-9,\.]+)([\$ ]*)(?<sugerido>[0-9,\.]*)/;
//        const reg:any = line.match(capturingRegexText);
//        reg['groups']['nombre'] = reg['groups']['description']
//        reg['groups']['precio'] = parseFloat(reg['groups']['precio'].replace(/[,]/g,''))
//        reg['groups']['sugerido'] = parseFloat(reg['groups']['sugerido'].replace(/[,]/g,''))
//        reg['groups']['details'] = reg['groups']['description'].match(/([a-zA-ZñÑáéíóúÁÉÍÓÚÜü0-9 \.,+\-&"/]*)([0-9]+)[xX]([0-9]*)([a-zA-ZñÑáéíóúÁÉÍÓÚÜü]*)/);
////        reg['groups']['bulto'] = !reg['groups']['details'] || reg['groups']['details'][2] === '' ? 1 : parseFloat(reg['groups']['details'][2]) ;
////        reg['groups']['contiene'] = parseFloat(reg['groups']['details'][3]);
////        reg['groups']['unidad'] = reg['groups']['details'][4];
////        reg['groups']['nombre'] = reg['groups']['details'][1];
//        reg['groups']['descuento'] = .65
//        reg['groups']['reposicion'] = (reg['groups']['precio']/1.21*reg['groups']['descuento']*1.245)
//        const nname =
//        retData.push(reg.groups)
//    })
//    console.log(data)
//    return retData;
//  }
//  rapRaza(src: string): any {
//    const data: any = src.split('\n');
//    const retData = []
//    data.map((line: string) => {
////        line = line.replace(/,/g, '');
//        const capturingRegexText = /([0-9][0-9][0-9][0-9])\s+([0-9]*)\s([0-9a-zA-ZñÑñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*) ([\$ ]+)([0-9,\.]+)([\$ ]*)([0-9,\.]*)/;
//        const reg:any = line.match(capturingRegexText);
//        //reg['groups']['descuento'] = .94;
//        retData.push(reg)
//    })
////    console.log(data)
//    return retData;
//  }
}

//  {
//    "_id": '607d7ad51600d70027d3b555',
//    "nombre": "Agro Empresas",
//    "type": "XLSX",
//    "encode": "iso8859-3",
//    "named": false,
//    "input": {
////      "DOG MENU":{
//      //  "input_fields": [
//      //    "nombre",
//      //    "codigo",
//      //    "contiene",
//      //    "bulto",
//      //    "bultoneto",
//      //    "neto",
//      //    "bultolista",
//      //    "lista",
//      //    "sugerido",
//      //    "reposicion",
//      //    "margen",
//      //    "unidad"
//      //  ]
//      //  ,
//      //  "filters":[
//      //    `(line,idx,array) => {
//      //      const ret = {};
//      //      ret['nombre'] = line[0];
//      //      ret.codigo = line[1];
//      //      ret.bulto = line[2];
//      //      ret.contiene = line[3];
//      //      ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//      //      ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//      //      ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//      //      ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//      //      ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//      //      ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//      //      ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*1000000)/10000;
//      //      line[0] = ret.nombre;
//      //      line[1] = ret.codigo + '';
//      //      line[2] = ret.bulto;
//      //      line[3] = ret.contiene;
//      //      line[4] = ret.bultoneto;
//      //      line[5] = ret.neto;
//      //      line[6] = ret.bultolista;
//      //      line[7] = ret.lista;
//      //      line[8] = ret.sugerido;
//      //      line[9] = ret.reposicion;
//      //      line[10]= ret.margen;
//      //      line[11]= "Kg";
//      //      if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//      //    }`,
//      //    `(line,idx,array) => {
//      //      if(!line[0]){
//      //        array[idx][0] = array[idx-1][0];
//      //        line[0] = array[idx-1][0];
//      //      }
//      //      return line;
//      //    }`
//      //  ]
////      },
//      "NG CAT CHOW":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            } else line[0] = "error";
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  //,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*1000000)/10000;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
////
//        //]
//      },
//      //"NG CRIADORES":{
//      //  "input_fields": [
//      //    ,
//      //    "nombre",
//      //    "codigo",
//      //    "contiene",
//      //    "bulto",
//      //    "bultoneto",
//      //    "neto",
//      //    "bultolista",
//      //    "lista",
//      //    "sugerido",
//      //    "reposicion",
//      //    "margen",
//      //    "unidad"
//      //  ]
//      //  ,
//      //  "filters":[
//      //    `(line,idx,array) => {
//      //      const ret = {};
//      //      ret['nombre'] = line[1];
//      //      ret.codigo = line[2];
//      //      ret.bulto = line[3];
//      //      ret.contiene = line[4];
//      //      ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//      //      ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//      //      ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//      //      ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//      //      ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//      //      ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
////    //        ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//      //      line[1] = ret.nombre;
//      //      line[2] = ret.codigo;
//      //      line[3] = ret.bulto;
//      //      line[4] = ret.contiene;
//      //      line[5] = ret.bultoneto;
//      //      line[6] = ret.neto;
//      //      line[7] = ret.bultolista;
//      //      line[8] = ret.lista;
////    //        line[9] = ret.sugerido;
//      //      line[10]= ret.reposicion;
////    //        line[11]= ret.margen;
//      //      line[12]= "Kg";
//      //      if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] ) return line;
//      //    }`
//      //    //,
//      //    //`(line,idx,array) => {
//      //    //  if(!line[1]){
//      //    //    console.log(line[1]);
//      //    //    console.log(idx);
//      //    //    array[idx][1] = array[idx-1][1];
//      //    //    line[1] = array[idx-1][1];
//      //    //  }
//      //    //  return line;
//      //    //}`
//      //  ]
//      //},
//      "NG DOG CHOW":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] ) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      // dog chow
//        //      //console.log(line[1]);
//        //      //console.log(idx);
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      "NG DOGUI":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      "NG EXCELLENT CAT":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      "NG EXCELLENT DOG":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      "NG FANCY FEAST":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[0];
//        //    ret.codigo = line[1];
//        //    ret.bulto = line[2];
//        //    ret.contiene = line[3];
//        //    ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//        //    ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[0] = ret.nombre;
//        //    line[1] = ret.codigo;
//        //    line[2] = ret.bulto;
//        //    line[3] = ret.contiene;
//        //    line[4] = ret.bultoneto;
//        //    line[5] = ret.neto;
//        //    line[6] = ret.bultolista;
//        //    line[7] = ret.lista;
//        //    line[8] = ret.sugerido;
//        //    line[9] = ret.reposicion;
//        //    line[10]= ret.margen;
//        //    line[11]= "Kg";
//        //    if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[0]){
//        //      array[idx][0] = array[idx-1][0];
//        //      line[0] = array[idx-1][0];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      "NG FELIX":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      "NG GATI":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      "NG PRO PLAN CAT":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            console.log(line)
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
////            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//            if( line[1] && line[2] && line[3] && line[4])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      '"NG PRO PLAN DOG"':{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
////      'NG TIDY CATS':{
//        //"input_fields": [
//        //  ,
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[1];
//        //    ret.codigo = line[2];
//        //    ret.bulto = line[3];
//        //    ret.contiene = line[4];
//        //    ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[1] = ret.nombre;
//        //    line[2] = ret.codigo;
//        //    line[3] = ret.bulto;
//        //    line[4] = ret.contiene;
//        //    line[5] = ret.bultoneto;
//        //    line[6] = ret.neto;
//        //    line[7] = ret.bultolista;
//        //    line[8] = ret.lista;
//        //    line[9] = ret.sugerido;
//        //    line[10]= ret.reposicion;
//        //    line[11]= ret.margen;
//        //    line[12]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[1]){
//        //      array[idx][1] = array[idx-1][1];
//        //      line[1] = array[idx-1][1];
//        //    }
//        //    return line;
//        //  }`
//        //]
////      },
//      "NG VETERINARY DIETS":{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    if(line[0] && !line[1] && !line[2] && !line[3] && !line[4] && !line[5] && !line[6] && !line[7] && !line[8]){
//        //      console.log(line[0],array[idx])
//        //      array[idx][9] = line[0]
//        //    } else if(line[0] && line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && array[idx-1][9]) {
//        //      line[9] = array[idx-1][9];
//        //    }
//        //    return line;
//        //  }`,
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[0]+ ' ' + line[9];
//        //    ret.codigo = line[1];
//        //    ret.bulto = line[2];
//        //    ret.contiene = line[3];
//        //    ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//        //    ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[0] = ret.nombre;
//        //    line[1] = ret.codigo;
//        //    line[2] = ret.bulto;
//        //    line[3] = ret.contiene;
//        //    line[4] = ret.bultoneto;
//        //    line[5] = ret.neto;
//        //    line[6] = ret.bultolista;
//        //    line[7] = ret.lista;
//        //    line[8] = ret.sugerido;
//        //    line[9] = ret.reposicion;
//        //    line[10]= ret.margen;
//        //    line[11]= "Kg";
//        //    if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  //,
//        //  //`(line,idx,array) => {
//        //  //  if(!line[0]){
//        //  //    array[idx][0] = array[idx-1][0];
//        //  //    line[0] = array[idx-1][0];
//        //  //  }
//        //  //  return line;
//        //  //}`
//        //]
//      },
////      'SUPERCOAT':{
//        //"input_fields": [
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[0];
//        //    ret.codigo = line[1];
//        //    ret.bulto = line[2];
//        //    ret.contiene = line[3];
//        //    ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//        //    ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[0] = ret.nombre;
//        //    line[1] = ret.codigo;
//        //    line[2] = ret.bulto;
//        //    line[3] = ret.contiene;
//        //    line[4] = ret.bultoneto;
//        //    line[5] = ret.neto;
//        //    line[6] = ret.bultolista;
//        //    line[7] = ret.lista;
//        //    line[8] = ret.sugerido;
//        //    line[9] = ret.reposicion;
//        //    line[10]= ret.margen;
//        //    line[11]= "Kg";
//        //    if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[0]){
//        //      array[idx][0] = array[idx-1][0];
//        //      line[0] = array[idx-1][0];
//        //    }
//        //    return line;
//        //  }`
//        //]
////      },
//      'Whole Earth Farms':{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = line[11];
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugerido;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//        }`,
//        `(line,idx,array) => {
//          console.log("segundo",line,idx,array);
//          if(!line[0]){
//            if(array[idx-1]){
//              array[idx][0] =  array[idx-1][0];
//              line[0] = array[idx-1][0];
//            }
//          }
//          console.log(line);
//          return line;
//        }`
//      ]
//        //"input_fields": [
//        //  "nombre",
//        //  "codigo",
//        //  "contiene",
//        //  "bulto",
//        //  "bultoneto",
//        //  "neto",
//        //  "bultolista",
//        //  "lista",
//        //  "sugerido",
//        //  "reposicion",
//        //  "margen",
//        //  "unidad"
//        //]
//        //,
//        //"filters":[
//        //  `(line,idx,array) => {
//        //    const ret = {};
//        //    ret['nombre'] = line[0];
//        //    ret.codigo = line[1];
//        //    ret.bulto = line[2];
//        //    ret.contiene = line[3];
//        //    ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//        //    ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//        //    ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//        //    ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//        //    ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//        //    ret.reposicion = Math.round((ret.bultoneto*1.245)*10000)/10000;
//        //    ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
//        //    line[0] = ret.nombre;
//        //    line[1] = ret.codigo;
//        //    line[2] = ret.bulto;
//        //    line[3] = ret.contiene;
//        //    line[4] = ret.bultoneto;
//        //    line[5] = ret.neto;
//        //    line[6] = ret.bultolista;
//        //    line[7] = ret.lista;
//        //    line[8] = ret.sugerido;
//        //    line[9] = ret.reposicion;
//        //    line[10]= ret.margen;
//        //    line[11]= "Kg";
//        //    if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
//        //  }`
//        //  ,
//        //  `(line,idx,array) => {
//        //    if(!line[0]){
//        //      array[idx][0] = array[idx-1][0];
//        //      line[0] = array[idx-1][0];
//        //    }
//        //    return line;
//        //  }`
//        //]
//      },
//      'NG DENTALIFE':{
//        "input_fields": [
//          "nombre",
//          "codigo",
//          "contiene",
//          "bulto",
//          "bultoneto",
//          "neto",
//          "bultolista",
//          "lista",
//          "sugeridobulto",
//          "sugerido",
//          "pesable",
//          "reposicionbuto",
//          "reposicion",
//          "margen",
//          "unidad",
//          "vtabulto",
//          "vtaunidad"
//        ]
//        ,
//        "filters":[
//          `(line,idx,array) => {
//            const ret = {};
//            ret['nombre'] = line[0];
//            ret.codigo = line[1];
//            ret.bulto = line[3];
//            ret.contiene = line[2];
//            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*10000)/10000;
//            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*10000)/10000;
//            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*10000)/10000;
//            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*10000)/10000;
//            ret.sugeridobulto = line[10];
//            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*10000)/10000;
//            ret.pesable = isNaN(line[11]) ? false : true;
//            ret.reposicionbulto = line[12];
//            ret.reposicion = isNaN(line[13]) ? null : Math.round(line[13]*10000)/10000;
//            ret.margen = isNaN(line[14]) ? null : Math.round(line[14]*10000)/10000;
//            ret.vtabulto = isNaN(line[18]) ? null : Math.round(line[18]*10000)/10000;
//            ret.vtaunidad = isNaN(line[26]) ? null : Math.round(line[26]*10000)/10000;
//            line[0] = ret.nombre;
//            line[1] = ret.codigo + '';
//            line[2] = ret.bulto;
//            line[3] = ret.contiene;
//            line[4] = ret.bultoneto;
//            line[5] = ret.neto;
//            line[6] = ret.bultolista;
//            line[7] = ret.lista;
//            line[8] = ret.sugeridobulto;
//            line[9] = ret.sugerido;
//            line[10] = ret.pesable;
//            line[11] = ret.reposicionbulto;
//            line[12] = ret.reposicion;
//            line[13]= ret.margen;
//            line[14]= "Kg";
//            line[15]= ret.vtabulto;
//            line[16]= ret.vtaunidad;
//            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9] && line[10] && line[11] && line[12] && line[13] && line[14] && line[15] && line[16])
//              return line;
//          }`,
//          `(line,idx,array) => {
//            console.log("segundo",line,idx,array);
//            if(!line[0]){
//              if(array[idx-1]){
//                array[idx][0] =  array[idx-1][0];
//                line[0] = array[idx-1][0];
//              }
//            }
//            console.log(line);
//            return line;
//          }`
//        ]
//
//      },
//    },
//  },
