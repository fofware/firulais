import { Injectable } from '@angular/core';
import { round } from '../shared/toolbox';
import { HttpClient } from '@angular/common/http';
import { API_URI } from '../shared/uris';

export const proveedoresSettings = [
  {
    "_id": '61413fc2dab04eeaa5a59a38',
    "nombre": "Servicios Veterinarios",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "input": {
      "Lista de Precios":{
        "input_fields": [
          "codigo",
          "nombre",
          "reposicion",
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            if(line[2]){
              line[2] = line[2].replace(/[,]/g,'.');
              line[2] = line[2].replace(/[$ ]/g,'');
              let reposicion = line[2] ? line[2].match(/(?<value>[0-9\.]*)/) : null;
              if (reposicion){
                reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
              }
              ret['reposicion'] = reposicion;
            }
            line[0] = ret.codigo;
            line[1] = ret.nombre;
            line[2] = ret.reposicion;
            //return line;
            if( line[0] && line[1] && line[2]) return line;
          }`
        ]
      }
    }
  },
  {
    "_id": '607d7ad51600d70027d3b555',
    "nombre": "Agro Empresas",
    "type": "XLSX",
    "encode": "iso8859-3",
    "named": false,
    "input": {
      "DOG MENU":{
        "input_fields": [
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[0];
            ret.codigo = line[1];
            ret.bulto = line[2];
            ret.contiene = line[3];
            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[0] = ret.nombre;
            line[1] = ret.codigo + '';
            line[2] = ret.bulto;
            line[3] = ret.contiene;
            line[4] = ret.bultoneto;
            line[5] = ret.neto;
            line[6] = ret.bultolista;
            line[7] = ret.lista;
            line[8] = ret.sugerido;
            line[9] = ret.reposicion;
            line[10]= ret.margen;
            line[11]= "Kg";
            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`,
          `(line,idx,array) => {
            if(!line[0]){
              array[idx][0] = array[idx-1][0];
              line[0] = array[idx-1][0];
            }
            return line;
          }`
        ]
      },
      "NG CAT CHOW":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`

        ]
      },
      "NG CRIADORES":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
//            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
//            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
//            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] ) return line;
          }`
          //,
          //`(line,idx,array) => {
          //  if(!line[1]){
          //    console.log(line[1]);
          //    console.log(idx);
          //    array[idx][1] = array[idx-1][1];
          //    line[1] = array[idx-1][1];
          //  }
          //  return line;
          //}`
        ]
      },
      "NG DOG CHOW":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] ) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              // dog chow
              //console.log(line[1]);
              //console.log(idx);
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      "NG DOGUI":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      "NG EXCELLENT CAT":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      "NG EXCELLENT DOG":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      "NG FANCY FEAST":{
        "input_fields": [
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[0];
            ret.codigo = line[1];
            ret.bulto = line[2];
            ret.contiene = line[3];
            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[0] = ret.nombre;
            line[1] = ret.codigo;
            line[2] = ret.bulto;
            line[3] = ret.contiene;
            line[4] = ret.bultoneto;
            line[5] = ret.neto;
            line[6] = ret.bultolista;
            line[7] = ret.lista;
            line[8] = ret.sugerido;
            line[9] = ret.reposicion;
            line[10]= ret.margen;
            line[11]= "Kg";
            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[0]){
              array[idx][0] = array[idx-1][0];
              line[0] = array[idx-1][0];
            }
            return line;
          }`
        ]
      },
      "NG FELIX":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      "NG GATI":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      "NG PRO PLAN CAT":{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      '"NG PRO PLAN DOG"':{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      'NG TIDY CATS':{
        "input_fields": [
          ,
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[1];
            ret.codigo = line[2];
            ret.bulto = line[3];
            ret.contiene = line[4];
            ret.bultoneto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.neto = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.bultolista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.lista = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.sugerido = isNaN(line[9]) ? null : Math.round(line[9]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[1] = ret.nombre;
            line[2] = ret.codigo;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.bultoneto;
            line[6] = ret.neto;
            line[7] = ret.bultolista;
            line[8] = ret.lista;
            line[9] = ret.sugerido;
            line[10]= ret.reposicion;
            line[11]= ret.margen;
            line[12]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[1]){
              array[idx][1] = array[idx-1][1];
              line[1] = array[idx-1][1];
            }
            return line;
          }`
        ]
      },
      "NG VETERINARY DIETS":{
        "input_fields": [
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            if(line[0] && !line[1] && !line[2] && !line[3] && !line[4] && !line[5] && !line[6] && !line[7] && !line[8]){
              console.log(line[0],array[idx])
              array[idx][9] = line[0]
            } else if(line[0] && line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && array[idx-1][9]) {
              line[9] = array[idx-1][9];
            }
            return line;
          }`,
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[0]+ ' ' + line[9];
            ret.codigo = line[1];
            ret.bulto = line[2];
            ret.contiene = line[3];
            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[0] = ret.nombre;
            line[1] = ret.codigo;
            line[2] = ret.bulto;
            line[3] = ret.contiene;
            line[4] = ret.bultoneto;
            line[5] = ret.neto;
            line[6] = ret.bultolista;
            line[7] = ret.lista;
            line[8] = ret.sugerido;
            line[9] = ret.reposicion;
            line[10]= ret.margen;
            line[11]= "Kg";
            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          //,
          //`(line,idx,array) => {
          //  if(!line[0]){
          //    array[idx][0] = array[idx-1][0];
          //    line[0] = array[idx-1][0];
          //  }
          //  return line;
          //}`
        ]
      },
      'SUPERCOAT':{
        "input_fields": [
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[0];
            ret.codigo = line[1];
            ret.bulto = line[2];
            ret.contiene = line[3];
            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[0] = ret.nombre;
            line[1] = ret.codigo;
            line[2] = ret.bulto;
            line[3] = ret.contiene;
            line[4] = ret.bultoneto;
            line[5] = ret.neto;
            line[6] = ret.bultolista;
            line[7] = ret.lista;
            line[8] = ret.sugerido;
            line[9] = ret.reposicion;
            line[10]= ret.margen;
            line[11]= "Kg";
            if( line[1] && line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[0]){
              array[idx][0] = array[idx-1][0];
              line[0] = array[idx-1][0];
            }
            return line;
          }`
        ]
      },
      'Whole Earth Farms':{
        "input_fields": [
          "nombre",
          "codigo",
          "contiene",
          "bulto",
          "bultoneto",
          "neto",
          "bultolista",
          "lista",
          "sugerido",
          "reposicion",
          "margen",
          "unidad"
        ]
        ,
        "filters":[
          `(line,idx,array) => {
            const ret = {};
            ret['nombre'] = line[0];
            ret.codigo = line[1];
            ret.bulto = line[2];
            ret.contiene = line[3];
            ret.bultoneto = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.neto = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.bultolista = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.lista = isNaN(line[7]) ? null : Math.round(line[7]*100)/100;
            ret.sugerido = isNaN(line[8]) ? null : Math.round(line[8]*100)/100;
            ret.reposicion = Math.round((ret.bultoneto*1.245)*100)/100;
            ret.margen = Math.round(((ret.sugerido/(ret.neto*1.245))-1)*10000)/100;
            line[0] = ret.nombre;
            line[1] = ret.codigo;
            line[2] = ret.bulto;
            line[3] = ret.contiene;
            line[4] = ret.bultoneto;
            line[5] = ret.neto;
            line[6] = ret.bultolista;
            line[7] = ret.lista;
            line[8] = ret.sugerido;
            line[9] = ret.reposicion;
            line[10]= ret.margen;
            line[11]= "Kg";
            if( line[2] && line[3] && line[4] && line[5] && line[6] && line[7] && line[8] && line[9]) return line;
          }`
          ,
          `(line,idx,array) => {
            if(!line[0]){
              array[idx][0] = array[idx-1][0];
              line[0] = array[idx-1][0];
            }
            return line;
          }`
        ]
      },
    },
  },
  {
    "_id": '5f401a8f4e0d2b3e5371c664',
    "nombre": "Dumas",
    "type": "XLSX",
    "encode": "utf-8",
    "named": false,
    "input": {
      "ACCESORIOS":{
        "input_fields": [
          "codigo",
          "nombre",
          "marca",
          "bulto",
          "contiene",
          "unidad",
          "lista",
          "porcentage",
          "descuento",
          "reposicion"
        ],
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            ret.marca = line[2];
            ret.reposicion = isNaN(line[3]) ? null : line[3];

            if((!line[0] || line[0] === '') && ret.nombre && ret.reposicion )
              ret.codigo = ret.nombre.replace(/[ ]/g);
            line[0] = ret.codigo;
            line[1] = ret.nombre;
            line[2] = ret.marca;
            line[3] = 1;
            line[4] = 1;
            line[5] = "Un";
            line[6] = ret.reposicion;
            line[7] = 0;
            line[8] = 0;
            line[9] = ret.reposicion;
            if(line[0] && line[1] && line[9]) return line;
          }`
        ]

      },
      "ALIMENTOS":{
        "input_fields":[
          "codigo",
          "nombre",
          "marca",
          "bulto",
          "contiene",
          "unidad",
          "lista",
          "porcentage",
          "descuento",
          "reposicion"
        ],
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            ret.marca = line[2];
            ret.lista = isNaN(line[3]) ? null : Math.round(line[3]*100)/100;
            ret.porcentage = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.descuento = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.reposicion = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            if((!line[0] || line[0] === '') && ret.nombre && ret.reposicion )
              ret.codigo = ret.nombre.replace(/[ ]/g);
            line[1] = ret.nombre;
            line[2] = ret.marca;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.unidad;
            line[6] = ret.lista;
            line[7] = ret.porcentage;
            line[8] = ret.descuento;
            line[9] = ret.reposicion;
            if(line[0] && line[1] && line[9]) return line;
          }`
        ]
      },
      "FARMACOS":{
        "input_fields": [
          "codigo",
          "nombre",
          "marca",
          "bulto",
          "contiene",
          "unidad",
          "lista",
          "porcentage",
          "descuento",
          "reposicion"
        ]
        ,
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            ret.marca = line[2];
            ret.lista = isNaN(line[3]) ? null : Math.round(line[3]*100)/100;
            ret.porcentage = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.descuento = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.reposicion = ret.lista; //isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            if((!line[0] || line[0] === '') && ret.nombre && ret.reposicion )
              ret.codigo = ret.nombre.replace(/[ ]/g);
            line[1] = ret.nombre;
            line[2] = ret.marca;
            line[3] = 1; //ret.bulto;
            line[4] = 1; //ret.contiene;
            line[5] = 'Un'; //ret.unidad;
            line[6] = ret.lista;
            line[7] = ret.porcentage;
            line[8] = ret.descuento;
            line[9] = ret.reposicion;
            if(line[0] && line[1] && line[9]) return line;
          }`
        ]
      },
      "PIEDRAS":{
        "input_fields": [
          "codigo",
          "nombre",
          "marca",
          "bulto",
          "contiene",
          "unidad",
          "lista",
          "porcentage",
          "descuento",
          "reposicion"
        ]
        ,
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            ret.lista = isNaN(line[2]) ? null : Math.round(line[2]*100)/100;
            ret.porcentage = isNaN(line[3]) ? null : Math.round(line[3]*100)/100;
            ret.descuento = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.reposicion = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            if((!line[0] || line[0] === '') && ret.nombre && ret.reposicion )
              ret.codigo = ret.nombre.replace(/[ ]/g);

            line[1] = ret.nombre;
            line[2] = ret.marca;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.unidad;
            line[6] = ret.lista;
            line[7] = ret.porcentage;
            line[8] = ret.descuento;
            line[9] = ret.reposicion;
            if(line[0] && line[1] && line[9]) return line;
          }`
        ]
      },
      "SANEAMIENTO":{
        "input_fields": [
          "codigo",
          "nombre",
          "marca",
          "bulto",
          "contiene",
          "unidad",
          "lista",
          "porcentage",
          "descuento",
          "reposicion"
        ]
        ,
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            ret.marca = line[2];
            ret.lista = isNaN(line[3]) ? null : Math.round(line[3]*100)/100;
            ret.porcentage = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.descuento = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.reposicion = ret.lista; //isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            if((!line[0] || line[0] === '') && ret.nombre && ret.reposicion )
              ret.codigo = ret.nombre.replace(/[ ]/g);

            line[1] = ret.nombre;
            line[2] = ret.marca;
            line[3] = 1; //ret.bulto;
            line[4] = 1; //ret.contiene;
            line[5] = 'Un'; //ret.unidad;
            line[6] = ret.lista;
            line[7] = ret.porcentage;
            line[8] = ret.descuento;
            line[9] = ret.reposicion;
            if(line[0] && line[1] && line[9]) return line;
          }`
        ]
      },
      "SHAMPOO":{
        "input_fields": [
          "codigo",
          "nombre",
          "marca",
          "bulto",
          "contiene",
          "unidad",
          "lista",
          "porcentage",
          "descuento",
          "reposicion"
        ]
        ,
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            ret.marca = line[2];
            ret.lista = isNaN(line[3]) ? null : Math.round(line[3]*100)/100;
            ret.porcentage = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            ret.descuento = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            ret.reposicion = ret.lista; //isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            if((!line[0] || line[0] === '') && ret.nombre && ret.reposicion )
              ret.codigo = ret.nombre.replace(/[ ]/g);

            line[1] = ret.nombre;
            line[2] = ret.marca;
            line[3] = 1; //ret.bulto;
            line[4] = 1; //ret.contiene;
            line[5] = 'Un'; //ret.unidad;
            line[6] = ret.lista;
            line[7] = ret.porcentage;
            line[8] = ret.descuento;
            line[9] = ret.reposicion;
            if(line[0] && line[1] && line[9]) return line;
          }`
        ]
      },
      "VARIOS":{
        "input_fields": [
          "codigo",
          "nombre",
          "marca",
          "bulto",
          "contiene",
          "unidad",
          "lista",
          "porcentage",
          "descuento",
          "reposicion"
        ]
        ,
        "filters":[
          `(line) => {
            const ret = {};
            ret.codigo = line[0];
            ret['nombre'] = line[1];
            ret.marca = line[2];
            ret.lista = isNaN(line[3]) ? null : Math.round(line[3]*100)/100;
            ret.reposicion = ret.lista;
            //ret.porcentage = isNaN(line[4]) ? null : Math.round(line[4]*100)/100;
            //ret.descuento = isNaN(line[5]) ? null : Math.round(line[5]*100)/100;
            //ret.reposicion = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            if((!line[0] || line[0] === '') && ret.nombre && ret.reposicion )
              ret.codigo = ret.nombre.replace(/[ ]/g);
            line[1] = ret.nombre;
            line[2] = ret.marca;
            line[3] = ret.bulto;
            line[4] = ret.contiene;
            line[5] = ret.unidad;
            line[6] = ret.lista;
            line[7] = ret.porcentage;
            line[8] = ret.descuento;
            line[9] = ret.reposicion;
            if(line[0] && line[1] && line[9]) return line;
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
  "_id": '5f401e384e0d2b3e5371c666',
  "nombre": "Sciarriello",
  "type": "XLSX",
  "encode": "utf-8",
  "named": false,
  "input": {
    "SABROSITOS":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion",
        "lista",
      ],
      "filters":[
        `(line) => {
          const ret = {};
          ret['nombre'] = line[1];
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Z]+)|(?<contiene>[0-9+]*)[ ]?(?<unidad>[A-Z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }
          if(line[4]){
            let lista = line[4] ? line[4].match(/[$](?<value>[0-9\.]*)/) : null;
            if (lista){
              lista = lista['groups']['value'] ? parseFloat(lista['groups']['value']): null;
            }
            ret['lista'] = lista;
          }
          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[6] = ret.lista;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5] && line[6]) return line;
        }`
      ]
    },
    "SEDA":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|(?<contiene>[0-9+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[6] = ret.lista;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]

    },
    "KEIKO, MAUSSY":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|(?<contiene>[0-9+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]
    },
    "RAZA":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|[xX ]+(?<contiene2>[0-9+]*)[ ]?(?<unidad2>[A-Za-z]*)|(?<contiene>[0-9+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1 || contenido.groups.contiene2;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1 || contenido.groups.unidad2;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]
    },
    "PURINA":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|[xX ]+(?<contiene2>[0-9+]*)[ ]?(?<unidad2>[A-Za-z]*)|(?<contiene>[0-9+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1 || contenido.groups.contiene2;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1 || contenido.groups.unidad2;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]
    },
    "SIEGER, 7 VIDAS":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|[xX ]+(?<contiene2>[0-9+]*)[ ]?(?<unidad2>[A-Za-z]*)|(?<contiene>[0-9,+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1 || contenido.groups.contiene2;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1 || contenido.groups.unidad2;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]
    },
    "PEDIGREE & WHISKAS":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|[xX ]+(?<contiene2>[0-9+]*)[ ]?(?<unidad2>[A-Za-z]*)|(?<contiene>[0-9,+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1 || contenido.groups.contiene2;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1 || contenido.groups.unidad2;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]
    },
    "DOG SELECTION & PACHA":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|[xX ]+(?<contiene2>[0-9+]*)[ ]?(?<unidad2>[A-Za-z]*)|(?<contiene>[0-9,+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1 || contenido.groups.contiene2;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1 || contenido.groups.unidad2;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]
    },
    "BALANCEADOS, SEMILLAS & OTROS":{
      "input_fields": [
        "codigo",
        "nombre",
        "bulto",
        "contiene",
        "unidad",
        "reposicion"
      ],
      "filters":[
        `(line) => {
          const ret = {};
          if(line[1]){
            ret['nombre'] = line[1];
            if(line[4]) ret['nombre'] = line[1]+" ("+line[4]+")"
          }
          if(line[2]){
            const contenido = line[2].match(/(?<bulto>[0-9]+)[ ]?(?<bunidad>[A-Za-z]+)[ xX]*(?<contiene1>[0-9,+]+)[ ]?(?<unidad1>[A-Za-z]+)|[xX ]+(?<contiene2>[0-9+]*)[ ]?(?<unidad2>[A-Za-z]*)|(?<contiene>[0-9,+]*)[ ]?(?<unidad>[A-Za-z]*)/);
            ret['contiene'] = contenido.groups.contiene || contenido.groups.contiene1 || contenido.groups.contiene2;
            ret['unidad'] = contenido.groups.unidad || contenido.groups.unidad1 || contenido.groups.unidad2;
            ret['bulto'] = parseFloat(contenido.groups.bulto || 1);
            if(ret['contiene']) {
              ret['contiene'] = ret['contiene'].replace(/[,]/,".");
              if(ret['contiene'].search(/[+]/)>-1){
                ret['nombre'] = ret['nombre']+' '+ret['contiene'];
                ret['contiene'] = eval(ret['contiene']);
              } else {
                ret['contiene'] = parseFloat(ret['contiene']);
              }
            }
          }
          if(line[3]){
            let reposicion = line[3] ? line[3].match(/[$](?<value>[0-9\.]*)/) : null;
            if (reposicion){
              reposicion = reposicion['groups']['value'] ? parseFloat(reposicion['groups']['value']): null;
            }
            ret['reposicion'] = reposicion;
          }

          if (ret.nombre)
            ret.nombre = ret.nombre.replace(/[  ]/g," ");
          line[1] = ret.nombre;
          line[2] = ret.bulto;
          line[3] = ret.contiene;
          line[4] = ret.unidad;
          line[5] = ret.reposicion;
          line[0] = String(ret.nombre+ret.bulto+ret.contiene).replace(/[  ]/g,"").toLowerCase();
          if(line[1] && line[2] && line[3] && line[4] && line[5]) return line;
        }`
      ]
    },
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
    "_id": '613fa68cdab04e52e3a59a37',
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
            ret.reposicion = isNaN(line[6]) ? null : Math.round(line[6]*100)/100;
            ret.sugerido = isNaN(line[10]) ? null : Math.round(line[10]*100)/100;
            line[3] = ret.ean;
            line[5] = ret.contiene;
            line[6] = ret.reposicion;
            line[10] = ret.sugerido;
            if(line[1] && line[2] && line[4] && line[5] && line[6] ) return line;
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

  addProducto(reg): Promise<object> {
    return this.http
              .post(`${API_URI}/proveedoresarticulos/`, reg)
              .toPromise();
  }
  async XLSX(prov: any, src: any[]): Promise<object> {
    const notProcesed = [];
//    console.log(src);
    let resultado = [];
    for (const key in src) {
      const data = [];
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        if (prov.input[key]){
          const params = prov.input[key];
          const hoja = JSON.parse(JSON.stringify(src[key]));
          let ret = src[key];
          if(params['filters']){
            for (let f = 0; f < params['filters'].length; f++) {
              const func = eval(params['filters'][f]);
              ret = ret.filter(func);
            }
          }
//          console.log(key,ret,hoja)
          let prevNombre = "";
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
            } else e = line;
            e['hoja'] = key;
            e['proveedor'] = prov._id
            data.push(e)
          }
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
    console.log(resultado);
    return resultado;
  }


  sciarrielloXLSX(src: any[]): any {
    const data = [];
    for (const key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        const hoja = src[key];
        for (let i = 0; i < hoja.length; i++) {
          const line = hoja[i];
          if(line['__EMPTY_3'] && line['__EMPTY_3'].substring(0,1) === "$"){
            const reposicion = (line['__EMPTY_3'] ? parseFloat(line['__EMPTY_3'].substring(1)) : 0)
            const precio = line['__EMPTY_4'] ? line['__EMPTY_4'].match(/([0-9+]*)|([0-9]*)/g) : "";
//            const contenido = line['__EMPTY_2'].match(/([0-9]+)\s([a-zA-Z]+)/g)
            line['__EMPTY_2'] = line['__EMPTY_2'].replace(/,/g, '.');
            const contenido = line['__EMPTY_2'].match(/(?<bulto>[0-9]+)\s(?<bunidad>[a-zA-Z]+)\s(?:[xX]+)\s(?<contiene>[0-9\.+]+)\s(?<unidad>[a-zA-Z]+)|(?<bulto3>[0-9]+)\s(?:[xX]+)\s(?<contiene3>[0-9\.+]+)\s(?<unidad3>[a-zA-Z]+)|(?<contiene1>[0-9\.+]+)\s(?<unidad1>[a-zA-Z]+)|(?<contiene2>[0-9\.+]+)(?<unidad2>[a-zA-Z]+)/)
            const e = {
              hoja: key,
              nombre: line['__EMPTY_1'],
              bulto: contenido ? contenido.groups.bulto || 1 : `Err(${line['__EMPTY_2']})`,
              contiene: contenido ? contenido.groups.contiene || contenido.groups.contiene1 || contenido.groups.contiene2 || contenido.groups.contiene3 : `Err(${line['__EMPTY_2']})`,
              unidad: contenido ? contenido.groups.unidad || contenido.groups.unidad1 || contenido.groups.unidad2 || contenido.groups.unidad3 : `Err(${line['__EMPTY_2']})`,
              contenido: contenido ,
              reposicion: reposicion,
              precio: precio,
              tmpcontenido: line['__EMPTY_2'],
              temp: line['__EMPTY_4']
            }
            e.nombre = e.nombre.replace(/[  ]/g, " ");
            if(e.contiene.search(/[+]/) > -1 ){
              e.nombre = `${e.nombre} ${e.contiene}`;
              e.contiene = eval(e.contiene);
            }
            e['codigo'] =  (`${e.nombre}${e.bulto}${e.contiene}`).replace(/[ ]/g,'').toLowerCase()

            data.push(e)
          }
        }
      }
    }

    console.log(data)
    return data;
  }
  cancatXLSX(src: any[]): any {
    const data = [];
    console.log(src);

    for (const key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        const hoja = src[key];
        console.log(hoja);
        for (let i = 0; i < hoja.length; i++) {
          const line = hoja[i];
          if(line['__EMPTY_6'] && Number(line['__EMPTY_6'])) {
            const ean = Number(line['__EMPTY_3']) === NaN ? line['__EMPTY_3'].match(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/) : line['__EMPTY_3'];
            const e = {
              hoja: key,
              codigo: line['__EMPTY_1'],
              nombre: line['__EMPTY_2'].trim(),
              ean: ean,
              bulto: line['__EMPTY_4'],
              contiene: line['__EMPTY_5'],
              unidad: '',
              reposicion: round(line['__EMPTY_6'],2),
              sugerido: round(line['__EMPTY_10'],2)
            }
            data.push(e)
          }
        }
      }
    }
    console.log(data)
    return data;
  }


  dumasXLSX(src: any[]): any {
    const data = [];
    console.log(src);

    for (const key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        const hoja = src[key];
//        console.log(hoja);
        for (let i = 0; i < hoja.length; i++) {
          const line = hoja[i];
//          line['hoja'] = key;
          const e = line;
            data.push(e)
        }
      }
    }

    console.log(data)
    return data;
  }
  rapTXT(src: string): any {
    const data: any = src.split('\n');
    const retData = []
    data.map((line: string) => {
//        line = line.replace(/,/g, '');
        //const capturingRegexText = /(?<codigo>[0-9][0-9][0-9][0-9])\s?(?<ean>[0-9]*)\s(?<description>[0-9a-zA-ZñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*)([\$ ]+)(?<precio>[0-9,\.]+)([\$ ]*)([0-9,\.]*)/;
//        const capturingRegexText = /(?<codigo>[0-9][0-9][0-9][0-9])\s+(?<ean>[0-9]*)\s(?<description>[0-9a-zA-ZñÑ \.,+\-&"/]*)\s*([0-9]*)[xX]\s?([0-9,\.]*)\s?([a-zA-Z\.]+)\s?([0-9]*)([\$ ]+)(?<precio>[0-9,\.]+)([\$ ]*)([0-9,\.]*)/
        const capturingRegexText = /([0-9][0-9][0-9][0-9])\s+([0-9]+)\s([0-9a-zA-ZñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*)\s?([0-9]*)[xX]\s?([0-9,\.]*)\s?([a-zA-Z\.]+)\s?([0-9\.]*)([\$ ]+)([0-9,\.]+)([\$ ]*)([0-9,\.]*)/
        //const capturingRegexText = /([0-9][0-9][0-9][0-9])\s+([0-9]+)\s([0-9a-zA-ZñÑ \.,+\-&"/]*)\s([0-9xX ,\.]*)([a-zA-Z\.]*)\s?([0-9\.]*)([\$ ]+)([0-9,\.]+)([\$ ]*)([0-9,\.]*)/
        const reg:any = line.match(capturingRegexText);
/*
        reg['groups']['precio'] = parseFloat(reg['groups']['precio'].replace(/[,]/g,''))
        reg['groups']['details'] = reg['groups']['description'].match(/([0-9a-zA-ZñÑ \.,+\-&"/]*)\s?([0-9,\.]*)[xX]\s?([0-9,\.]+)\s?([a-zA-Z\.]+)\s([0-9]*)/);
        reg['groups']['bulto'] = reg['groups']['details'][2] === '' ? 1 : parseFloat(reg['groups']['details'][2]) ;
        reg['groups']['contiene'] = parseFloat(reg['groups']['details'][3]);
        reg['groups']['unidad'] = reg['groups']['details'][4];
        reg['groups']['descuento'] = .85
//        reg['groups']['Name'] = reg['groups']['details'][1];
        reg['groups']['Name'] = reg['groups']['description'];
*/
      if(reg){
        const extra = reg[3].match(/([0-9\. ]*)$/)
//        reg[4] = reg[3].match(/([0-9]+)([xX]+)([0-9,\.]*)([a-zA-Z]*)$|([xX])\s([0-9]+)\s?([a-zA-Z\.]*)([0-9]*)$/)
        extra[0] = extra[0].trim();
        reg['groups'] = {};
        reg['groups']['input'] = line;
        reg[9] = parseFloat(reg[9].replace(/[,]/g,''));
        reg['groups']['codigo'] = reg[1];
        reg['groups']['ean'] = reg[2];
        reg['groups']['nombre'] = reg[3].replace(extra[0],'').replace(/["]/g,'').trim();
        reg['groups']['bulto'] = extra[0] === '' ? 1 : parseFloat(extra[0]);
        reg['groups']['contiene'] = parseFloat(reg[5].replace(/,/g,'.'));
        reg['groups']['unidad'] = reg[6];
        reg['groups']['reposicion'] = round(reg[9]/1.21*.85*1.245,2);
        reg['groups']['extra'] = extra;
//      reg['groups'] = groups
        retData.push(reg.groups)
      } else {
        console.log(line)
      }
    })
    console.log(data)
    return retData;
  }
  rapOptimum(src: string): any {
    const data: any = src.split('\n');
    const retData = []
    data.map((line: string) => {
//        line = line.replace(/,/g, '');
        const capturingRegexText = /(?<codigo>[0-9][0-9][0-9][0-9])\s?(?<ean>[0-9]*)\s(?<description>[0-9a-zA-ZñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*)([\$ ]+)(?<precio>[0-9,\.]+)([\$ ]*)(?<sugerido>[0-9,\.]*)/;
        const reg:any = line.match(capturingRegexText);
        reg['groups']['nombre'] = reg['groups']['description']
        reg['groups']['precio'] = parseFloat(reg['groups']['precio'].replace(/[,]/g,''))
        reg['groups']['sugerido'] = parseFloat(reg['groups']['sugerido'].replace(/[,]/g,''))
        reg['groups']['details'] = reg['groups']['description'].match(/([a-zA-ZñÑáéíóúÁÉÍÓÚÜü0-9 \.,+\-&"/]*)([0-9]+)[xX]([0-9]*)([a-zA-ZñÑáéíóúÁÉÍÓÚÜü]*)/);
//        reg['groups']['bulto'] = !reg['groups']['details'] || reg['groups']['details'][2] === '' ? 1 : parseFloat(reg['groups']['details'][2]) ;
//        reg['groups']['contiene'] = parseFloat(reg['groups']['details'][3]);
//        reg['groups']['unidad'] = reg['groups']['details'][4];
//        reg['groups']['nombre'] = reg['groups']['details'][1];
        reg['groups']['descuento'] = .65
        reg['groups']['reposicion'] = (reg['groups']['precio']/1.21*reg['groups']['descuento']*1.245)
        const nname =
        retData.push(reg.groups)
    })
    console.log(data)
    return retData;
  }
  rapRaza(src: string): any {
    const data: any = src.split('\n');
    const retData = []
    data.map((line: string) => {
//        line = line.replace(/,/g, '');
        const capturingRegexText = /([0-9][0-9][0-9][0-9])\s+([0-9]*)\s([0-9a-zA-ZñÑñÑáéíóúÁÉÍÓÚÜü \.,+\-&"/]*) ([\$ ]+)([0-9,\.]+)([\$ ]*)([0-9,\.]*)/;
        const reg:any = line.match(capturingRegexText);
        //reg['groups']['descuento'] = .94;
        retData.push(reg)
    })
//    console.log(data)
    return retData;
  }
}
