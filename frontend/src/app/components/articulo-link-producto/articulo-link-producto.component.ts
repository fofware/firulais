import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticulosLinkService } from 'src/app/services/articulos-link.service';
import { ListasArtProdService } from 'src/app/services/listas-art-prod.service';

@Component({
  selector: 'app-articulo-link-producto',
  templateUrl: './articulo-link-producto.component.html',
  styleUrls: ['./articulo-link-producto.component.css']
})
export class ArticuloLinkProductoComponent implements OnInit {
  @Input() idx;
  @Input() articulo;
  producto:any = {};
  dbProvProd = [];
  filtro = {
    fabricante: null,
    marca: null,
    name: null,
    especie: null,
    edad: null,
    raza: null,
    rubro: null,
    linea: null,
    itemSearchProdProv: null,
    unidades: null,
    peso: null,
    link: true
  };

  constructor(
    private provprod: ListasArtProdService,
    private artprov: ArticulosLinkService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.articulo);
    console.log(this.idx);
    this.producto = this.articulo.productos[this.idx]
    const searchData:any = JSON.parse(JSON.stringify(this.articulo));

    this.filtro.fabricante = searchData.fabricante;
    this.filtro.marca = searchData.marca;
    this.filtro.name = searchData.name;
    this.filtro.rubro = searchData.rubro;
    this.filtro.linea = searchData.linea;
    this.filtro.especie = searchData.especie;
    this.filtro.edad = searchData.edad;
    this.filtro.raza = searchData.raza;
    this.filtro.peso = searchData.productos[this.idx].contiene;
    this.filter();
  }
  async filter() {
    console.log(this.filtro);
    const retProvProd:any = await this.artprov.artProvToLink(this.filtro);
    for (let i = 0; i < retProvProd.length; i++) {
      const element = retProvProd[i];
      if(element.articulo_id) element.class="ready1";
      if(element.producto_id) element.class="ready2";
    }
    this.dbProvProd = retProvProd;
    console.log(this.dbProvProd);
  }

}
