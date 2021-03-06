import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApitoapiComponent } from './components/apitoapi/apitoapi.component';
import { ArticulosListComponent } from './components/articulos-list/articulos-list.component';
import { ArticulosPreciosPrintComponent } from './components/articulos-precios-print/articulos-precios-print.component';
import { ArticulosPreciosComponent } from './components/articulos-precios/articulos-precios.component';
import { CargalistasComponent } from './components/cargalistas/cargalistas.component';
import { HomeComponent } from './components/home/home.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { MenuappComponent } from './components/menuapp/menuapp.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { ProdListPublicComponent } from './components/prod-list-public/prod-list-public.component';
import { ProductListPrintComponent } from './components/product-list-print/product-list-print.component';
import { ProductoLinkComponent } from './components/producto-link/producto-link.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: ''
    , component: HomeComponent
  },
  {
    path: 'inicio'
    , component: HomeComponent
  },
  {
    path: 'auth/signup'
    , component: SignupComponent
  },
  {
    path: 'auth/signin'
    , component: SigninComponent
  },
  {
    path: 'private/:id'
    , component: MenuappComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'private/menu/:id'
    , component: MenuappComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'print'
    ,outlet: 'print'
    ,component: PrintLayoutComponent
    ,children: [
      {
        path: 'productlistprint/:ids'
      , component: ProductListPrintComponent
  //    , canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'productlist'
    , component: ProdListPublicComponent
//    , canActivate: [AuthGuard]
  },
  {
    path: 'articuloslist'
    , component: ArticulosListComponent
//    , canActivate: [AuthGuard]
  }
  , {
    path: 'print'
    ,outlet: 'print'
    ,component: PrintLayoutComponent
    ,children: [
      {
        path: 'articulospreciosprint/:ids'
      , component: ArticulosPreciosPrintComponent
  //    , canActivate: [AuthGuard]
      }
    ]
  }
  , {
    path: 'articulosprecios'
    , component: ArticulosPreciosComponent
//    , canActivate: [AuthGuard]
  }
  , {
    path: 'cargalistas'
    , component: CargalistasComponent
//    , canActivate: [AuthGuard]
  }
  , {
    path: 'productoslink'
    , component: ProductoLinkComponent
    , canActivate: [AuthGuard]
  }
  , {
    path: 'apitoapi'
    , component: ApitoapiComponent
//    , canActivate: [AuthGuard]
  }
  , {
    path: 'importdata'
    , component: ImportDataComponent
//    , canActivate: [AuthGuard]
  }
  , { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
