import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvfileService {
  data = [];
  fields = [];
  constructor() { }
  async formatData(data:any): Promise<any> {
    const retdata = data.split('\r\n');
    let maxFields = 0;
    this.fields = [];
    if(retdata[retdata.length-1] === "") retdata.pop();

    console.log(retdata.length);
    for (let i = 0; i < retdata.length; i++) {
      const lineData = retdata[i].split(';');

//      console.log(lineData);
      const reg = [];
      for (let n = 0; n < lineData.length; n++) {
        let val = lineData[n].trim();
        if(!isNaN(parseFloat(val))) {
          val = parseFloat(val.replace('.','').replace(',','.'));
        }
        reg.push(val);
      }
      maxFields = (reg.length > maxFields ? reg.length : maxFields );
      retdata[i] = reg;
    }
    for (let i = 0; i <= maxFields; i++) {
      this.fields.push(`field_${i}`);
    }
    return retdata;
  }
}
