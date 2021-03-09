import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargalistasComponent } from './components/cargalistas/cargalistas.component';
import { HomeComponent } from './components/home/home.component';
import { MenuappComponent } from './components/menuapp/menuapp.component';
import { ProdListPublicComponent } from './components/prod-list-public/prod-list-public.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: ''
    , component: HomeComponent
  },
  {
    path: 'signup'
    , component: SignupComponent
  },
  {
    path: 'signin'
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
    path: 'productlist'
    , component: ProdListPublicComponent
//    , canActivate: [AuthGuard]
  }
  , {
    path: 'cargalistas'
    , component: CargalistasComponent
//    , canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
