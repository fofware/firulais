import { Component, OnInit } from '@angular/core';
import { CsvfileService } from 'src/app/services/csvfile.service';

@Component({
  selector: 'app-cargalistas',
  templateUrl: './cargalistas.component.html',
  styleUrls: ['./cargalistas.component.css']
})
export class CargalistasComponent implements OnInit {

  proveedorList = [{
    name: 'Agro Empresas'
    ,file: { name: '*', ext: 'csv'}
    ,fields:
    ['fabricante'
      ,'marca'
      ,'rubro'
      ,'linea'
      ,'especie'
      ,'edad'
      ,'raza'
      ,'name'
      ,'codigo'
      ,'contiene'
      ,'bulto'
      ,''
      ,''
      ,'precioBulto'
      ,'precioUnidad'
      ,'precioSugerido'
    ]
  }]
  encode = 'iso8859-3'
  data = []
  fields = []
  constructor( private csv: CsvfileService) { }

  ngOnInit(): void {
  }
  async gotData(event): Promise<void> {
    this.data = await this.csv.formatData(event.data);
    this.fields = this.csv.fields;
    console.log(this.data);
  }
}
