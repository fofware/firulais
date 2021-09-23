import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApitoapiComponent } from './components/apitoapi/apitoapi.component';
import { ArticulosListPrintComponent } from './components/articulos-list-print/articulos-list-print.component';
import { ArticulosListComponent } from './components/articulos-list/articulos-list.component';
import { ArticulosPreciosPrintComponent } from './components/articulos-precios-print/articulos-precios-print.component';
import { ArticulosPreciosComponent } from './components/articulos-precios/articulos-precios.component';
import { ArticulosReventaPrintComponent } from './components/articulos-reventa-print/articulos-reventa-print.component';
import { ArticulosReventaComponent } from './components/articulos-reventa/articulos-reventa.component';
import { CargalistasComponent } from './components/cargalistas/cargalistas.component';
import { HomeComponent } from './components/home/home.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { MenuappComponent } from './components/menuapp/menuapp.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PersonasListComponent } from './components/personas-list/personas-list.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { ProdListPublicComponent } from './components/prod-list-public/prod-list-public.component';
import { ProductListPrintComponent } from './components/product-list-print/product-list-print.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { ProductoLinkComponent } from './components/producto-link/producto-link.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './shared/user-roles';

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
    path: "private/users"
    , component: UsersComponent
    , canActivate: [AuthGuard]
    , data: {
      //userRoles: [] // Multiple Allowed User
    }
  },
  {
    path: "private/profile"
    , component: ProfileComponent
    , canActivate: [AuthGuard]
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
    path: 'producto/:id'
    , component: ProductoComponent
//    , canActivate: [AuthGuard]
  },
  {
    path: 'productlist'
    , component: ProdListPublicComponent
//    , canActivate: [AuthGuard]
  },
  {
    path: 'productoedit'
    , component: ProductoEditComponent
    , canActivate: [AuthGuard]
  },
  {
    path: 'reventalist'
    , component: ArticulosReventaComponent
    , canActivate: [AuthGuard]
  }
  ,{
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
        path: 'articuloslistprint/:ids'
      , component: ArticulosListPrintComponent
  //    , canActivate: [AuthGuard]
      },
      {
        path: 'articulosreventaprint/:ids'
      , component: ArticulosReventaPrintComponent
      , canActivate: [AuthGuard]
      },
      {
        path: 'productlistprint/:ids'
      , component: ProductListPrintComponent
  //    , canActivate: [AuthGuard]
      }

    ]
  }
  ,{
    path: "personas"
    , component: PersonasListComponent
    , canActivate: [AuthGuard]
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
