import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  producto:any = {};
  presentaciones:any = {}

  constructor(
    private articuloService: ArticulosService
    , private router: Router
    , private activatedRouter: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void>  {
    const values = this.activatedRouter.snapshot.params;
    const values1 = this.activatedRouter.snapshot.queryParams;
    const values2 = this.activatedRouter.snapshot.queryParamMap;
    //console.log(values);
    //console.log(values1);
    //console.log(values1);

    if (values.id) {
      const retData = await this.articuloService.leerArticuloProductos(values.id);
      console.log(retData);
      this.producto = retData;
    }
    console.log(this.producto);

  }

}
