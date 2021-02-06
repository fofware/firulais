import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProdListPublicComponent } from './components/prod-list-public/prod-list-public.component';

const routes: Routes = [
  {
    path: ''
    , component: HomeComponent
  }
  , {
    path: 'productos'
    , component: ProdListPublicComponent
  }
  /*
  , {
    path: 'drcossia'
    , component: DrcossiaComponent
  }
  , {
    path: 'localstorag'
    , component: LocalstoragComponent
  }
  , {
    path: 'signin'
    , component: SigninComponent
  }
  , {
    path: 'signup'
    , component: SignupComponent
  }
  , {
    path: 'users'
    , component: UsersComponent
  }
  , {
    path: 'user/add'
    , component: UserFormComponent
  }
  , {
    path: 'user/edit/:id'
    , component: UserFormComponent
  }
  , {
    path: 'plus'
    , component: PlusListComponent
    , canActivate: [AuthGuard]
  }
  , {
    path: 'plus/add'
    , component: PlusFormComponent
    , canActivate: [AuthGuard]
  }
  , {
    path: 'plus/edit/:id'
    , component: PlusFormComponent
    , canActivate: [AuthGuard]
  }
  */
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
