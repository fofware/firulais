import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto:any = {};
  presentaciones:any = {}
  constructor(
    private productoService: ProductosService
    , private router: Router
    , private activatedRouter: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const values = this.activatedRouter.snapshot.params;
    const values1 = this.activatedRouter.snapshot.queryParams;
    const values2 = this.activatedRouter.snapshot.queryParamMap;
    console.log('ngOnInit');
    console.log(values);
    console.log(values1);
    //console.log(values1);

    if (values.id) {
      const retData = await this.productoService.get(values.id);
      this.producto = retData[0];
    }
    console.log(this.producto);
  }
}
