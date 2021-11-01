import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';
import { PrintService } from 'src/app/services/print.service';
import { ProductosService } from 'src/app/services/productos.service';
import { API_URI, MP_URI } from 'src/app/shared/uris';
import * as productosets from "src/app/common/productos-browse-settings";

@Component({
  selector: 'app-test-mp',
  templateUrl: './test-mp.component.html',
  styleUrls: ['./test-mp.component.css']
})
export class TestMpComponent implements OnInit {
  active ="top"
  wait: boolean = false;
  modalsNumber = 0;
  /*
  newArticulo = {
    fabricante: '',
    marca: '',
    rubro: '',
    linea: '',
    especie: '',
    edad: '',
    raza: '',
    name: '',
    d_fabricante: false,
    d_marca: false,
    d_rubro: false,
    d_linea: false,
    d_especie: false,
    d_edad: false,
    d_raza: false,
    private_web: false,
    image: '',
    url: '',
    iva: 0,
    margen: 23,
    tags: '',
    formula: [],
    detalles: [],
    beneficios: [],
    productos:[{}]
  }
  */
  filterButtons = productosets.filterButtons;
  Order = productosets.order;
  listaOrden = 0;
  showArticulos = true;
  publico = true;
  searchItem: string = '';
  cmpSetting = {
    tipo: 'Venta',
    public: true
  };
  articuloList: any[] = [];
  prodList: any[] = [];
  detalles: any[] = [];
  unidades: [{ id: any, name: string }];
  selectedArticulo: any;
  compareArticulo: any;
  editedArticulo: any;
  dialog: any;
  closeModal: string;
  user:any;
  selectedList: any[] = [];
  sumaTotal: number = 0;
  constructor(  private http: HttpClient,
                private router: Router,
                private fulllist: ProductosService,
                private list: ListasArtProdService,
                public printService: PrintService,
                private authService: AuthService
              ) {
                this.user = this.authService.user;
                console.log(this.user);
              }
  ngOnInit(): void {
    this.listArticulos();
    this.setHeight();
  }

  setHeight(){
    setTimeout(() => {
      const top = document.getElementById('top');
      const main = document.getElementById('main');

      const h = document.getElementsByTagName('html')[0].clientHeight - (top.offsetHeight + 4);
      const b = h;
      main.style.height = `${h}px`;
//      document.getElementsByTagName('nav')[1].style.height = `${b}px`;
//      document.getElementsByTagName('nav')[1].style.maxHeight = `${b}px`;
      document.getElementsByTagName('aside')[0].style.height = `${b}px`;
      document.getElementsByTagName('aside')[0].style.maxHeight = `${b}px`;
      document.getElementsByTagName('article')[0].style.height = `${b}px`;
    }, 50)
  }

  filterEvent(ev){
    for (const propName in ev) {
      console.log(propName, ev[propName]);
      this[propName] = ev[propName];
    }
    this.searchArticulos();
  }

  listArticulos(): void {
//    this.searchItem = ([] as any);
    this.searchArticulos();
  }


  makeQry (): any {
    const qry: any = {
      Articulo: {}
      ,Producto: {}
      ,Extra: {}
      ,searchItem: this.searchItem
    }

    const array = this.filterButtons;
    for (let i = 0; i < array.length; i++) {
      const el = array[i];
      switch (el.tipo) {
        case 'radioButton':
          for (let n = 0; n < el.buttons.length; n++) {
            const sb = el.buttons[n];
            if (sb.value > 0) {
              qry[sb.qryName][sb.qryKey] = sb.qryValue[sb.value-1];
            }
          }
          break;
        default:
          if (el.value > 0) {
            qry[el.qryName][el.qryKey] = el.qryValue[el.value-1];
          }
          break;
      }
    }
    console.log("qry",qry);
    return qry;
  }

  buttonMsg(array){
    console.log("Procesa Buttons Msg", array)
    this.filterButtons = array;
    this.searchArticulos();
  }
  async searchArticulos() {
    if (this.wait) { return; }
    this.wait = true;
    const qry:any = this.makeQry();
    const Articulo: any = (qry ? qry.Articulo : {});
    const Producto: any = (qry ? qry.Producto : {});
    const Extra: any = (qry ? qry.Extra : {});
    const searchItem: any = (qry ? qry.searchItem : "" );
    const Sort = this.Order[this.listaOrden].sort;

    try {
      //const data:any = await this.list.readData(
      //  `${API_URI}/articulos/productos/listdata`,
      //  {Articulo, Producto, Extra, searchItem: this.searchItem, Sort }
      //);
      const data:any  = await this.fulllist.fulldata(qry);
      this.articuloList = data;
      console.log(this.articuloList);
    } catch (error) {
      console.log(error);
    }
    this.wait = false;
  }

  imprimir(){
    const lsId = Date.now().toString();
    console.log(lsId);
    localStorage.setItem( lsId, JSON.stringify(this.selectedList));
    this.printService.printDocument('articulosreventaprint', [lsId] );
  }

  addItem(articulo){
    if(!this.selectedList.find( (reg, idx) => {
      if(reg.id === articulo._id) {
        this.selectedList[idx]['quantity'] += 1;
        return true
      } })){
        if(articulo.image && !articulo.image.search(/http/))
          articulo.image = 'https://firulais.net.ar'+articulo.image;
        const reg = {
          id: articulo._id,
          title: articulo.art_fullName,
          description: articulo.prodName,
          picture_url: articulo.image,
          fullName: articulo.fullName,
          currency_id: "ARS",
          unit_price: articulo.showPrecio,
          quantity: 1
        }
        this.selectedList.push(reg);
      }
  }
  deleteItem(idx){
    this.selectedList[idx]['quantity'] -= 1;
    if (this.selectedList[idx]['quantity'] === 0) this.selectedList.splice(idx,1);
  }
  sumaItems(){
    this.sumaTotal = 0;
    this.selectedList.forEach(element => this.sumaTotal += element.quantity*element.unit_price );
  }
  addAll(){
    for (let i = 0; i < this.articuloList.length; i++) {
      this.addItem(this.articuloList[i]);
    }
    this.sumaItems();
  }
  deleteAll(){
    this.selectedList=[];
    this.sumaItems();
  }
  async checkOut(){
    //A. Nombre y Apellido: Lalo Landa
    //B. Email: El email del test-user pagador entregado en este documento.
    //C. Código de área: 11
    //D. Teléfono: 2222333
    let payer = {
      "phone": {},
      "identification": {},
      "address": {},
      "email": "",
      "name": "",
      "surname": ""
    }
    let payment_methods = {
      "excluded_payment_methods": [
        {}
      ],
      "excluded_payment_types": [
        {}
      ],
      'installments': 1,
      'default_installments': 1
    };
    let shipments = {
      "free_methods": [
        {}
      ],
      "receiver_address": {}
    };
    let differential_pricing =  {};
    let tracks = [
      {
        "type": "google_ad"
      }
    ];
    payment_methods = {
      "excluded_payment_methods": [
        { "id":"amex"}
      ],
      "excluded_payment_types": [
        { 'id':'atm'}
      ],
      'installments': 6,
      'default_installments': 1
    }
    payer = {
      "phone": {
        "area_code": "11",
        "number": "2222333"
      },
      "address": {
        "zip_code": "1111",
        "street_name": "falsa",
        "street_number": "123"
      },
      "email": "Test@user.com",
      "identification": {
        "number": "",
        "type": ""
      },
      "name": "Lalo",
      "surname": "Landa"
    }


    const param = {
      items: this.selectedList,
      "site_id": "MLA",
      "auto_return": "all",
      'notification_url': 'https://firulais.net.ar/mp/ipn',
      "back_urls": {
        "failure": "https://firulais.net.ar/mptesthooks",
        "pending": "https://firulais.net.ar/mptesthooks",
        "success": "https://firulais.net.ar/mptesthooks"
      },
      "external_reference": "fofware@gmail.com",
      "binary_mode": false,
      //"payer": payer,
      //"payment_methods": payment_methods
    }
    console.log("Manda",param)
    try {
      const pref = await this.http.post(`${MP_URI}/preferencias/add`, param).toPromise();
      console.log(pref)
      window.open(pref['init_point'],'_self');
      //window.open(pref['init_point']);
    } catch (error) {
      console.log(error);
    }
  }
}
