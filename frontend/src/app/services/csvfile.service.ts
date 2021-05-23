import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvfileService {
  data = [];
  fields = [];
  fieldsValues = [];
  proveedorId = "";

  constructor() { }
  sanitizeNumber(str): any {
    if(!isNaN(str*1)) return str*1;
    const test = str.split(',')
    if(test.length === 2){
      if(!isNaN(test[1]*1)){
        test[0] = test[0].replace(/\.+/g,'')*1;
        if(!isNaN(test[0])){
          return parseFloat(`${test[0]}.${test[1]}`)
        }
      }
    }
    return str;
  }
  async formatData(data:any): Promise<any> {
    data = data.replace(/^\r|\n\r|\n$/g,'');
    const retdata = data.split('\r\n');
    let maxFields = 0;
    this.fields = [];
    this.fieldsValues = [];
    if(retdata[retdata.length-1] === "") retdata.pop();

    console.log(retdata.length);
    for (let i = 0; i < retdata.length; i++) {
      const lineData = retdata[i].split(';');

//      console.log(lineData);
      const reg = [];
      for (let n = 0; n < lineData.length; n++) {
        let val = this.sanitizeNumber(lineData[n].trim());
        /*
        if(!isNaN(parseFloat(val))) {
          val = parseFloat(val.replace('.','').replace(',','.'));
        }
        */
        reg.push(val);
      }
      maxFields = (reg.length > maxFields ? reg.length : maxFields );
      retdata[i] = reg;
    }
    for (let i = 0; i < maxFields; i++) {
      this.fields.push(`field_${i}`);
      this.fieldsValues.push(null);
    }
    this.data = retdata;
    return retdata;
  }
  getreg(idx): any {
    const reg = {}
    for (let i = 0; i < this.fieldsValues.length; i++) {
      const name = this.fieldsValues[i];
      if(name){
        reg[name] = this.data[idx][i];
      }
    }
    return reg;
  }
}
