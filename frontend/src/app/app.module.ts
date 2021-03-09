import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticuloCardSelectComponent } from './components/articulo-card-select/articulo-card-select.component';
import { ArticuloCardSelectBoxListComponent } from './components/articulo-card-select-box-list/articulo-card-select-box-list.component';
import { ArticuloCardSelectHeaderComponent } from './components/articulo-card-select-header/articulo-card-select-header.component';
import { ImageFallBackDirective } from './directives/image-fall-back.directive';
import { HomeComponent } from './components/home/home.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProdListPublicComponent } from './components/prod-list-public/prod-list-public.component';
import { ArticuloCardSelectOrderComponent } from './components/articulo-card-select-order/articulo-card-select-order.component';
import { ArticuloCardSelectFilterComponent } from './components/articulo-card-select-filter/articulo-card-select-filter.component';
import { ArticuloCardViewUnoComponent } from './components/articulo-card-view-uno/articulo-card-view-uno.component';
import { CargalistasComponent } from './components/cargalistas/cargalistas.component';
import { MenuappComponent } from './components/menuapp/menuapp.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticuloCardSelectComponent,
    ArticuloCardSelectBoxListComponent,
    ArticuloCardSelectHeaderComponent,
    ImageFallBackDirective,
    HomeComponent,
    TopMenuComponent,
    SigninComponent,
    SignupComponent,
    ProdListPublicComponent,
    ArticuloCardSelectOrderComponent,
    ArticuloCardSelectFilterComponent,
    ArticuloCardViewUnoComponent,
    CargalistasComponent,
    MenuappComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
