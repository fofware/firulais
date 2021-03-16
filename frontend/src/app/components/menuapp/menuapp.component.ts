import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menuapp',
  templateUrl: './menuapp.component.html',
  styleUrls: ['./menuapp.component.css']
})
export class MenuappComponent implements OnInit {
  menuId = '';
  data: any = {};
  title = '';
  comment = '';
  menu: any[] = [];

   constructor(
    private actRoute: ActivatedRoute,
    private menuService: MenuService
  ) {
    this.menuId = this.actRoute.snapshot.params.id;
    this.findMenu();
  //  console.log('this.menuId', this.menuId);
  }

  ngOnInit(): void {
/*
    this.actRoute.queryParams.subscribe(params => {
      console.log( 'params[id]', params['id']);
      this.menuId = params['id'];
      this.findMenu();
    });
  */
   }

  findMenu(): void{
    const menuData = this.menuService.get( this.menuId) ;
    this.data = menuData;
//    console.log(this.data);
  }
}
