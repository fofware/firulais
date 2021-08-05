import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApitoapiComponent } from './components/apitoapi/apitoapi.component';
import { ApiconnectComponent } from './components/apiconnect/apiconnect.component';
import { UploadComponent } from './components/upload/upload.component';
import { ReadFileComponent } from './components/read-file/read-file.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { TokenInterceptorInterceptor } from './interceptor/token-interceptor.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { ArticulosListComponent } from './components/articulos-list/articulos-list.component';
import { ProductsCardViewUnoComponent } from './components/products-card-view-uno/products-card-view-uno.component';
import { ArticuloEditComponent } from './components/articulo-edit/articulo-edit.component';
import { ArticuloCardSelectToolsComponent } from './components/articulo-card-select-tools/articulo-card-select-tools.component';
import { ProdCardViewDosComponent } from './components/prod-card-view-dos/prod-card-view-dos.component';
import { ArticuloPagoSelectComponent } from './components/articulo-pago-select/articulo-pago-select.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule, NgbNav, NgbNavbar, NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form.component';
import { ArticuloFormAddModalComponent } from './components/articulo-form-add-modal/articulo-form-add-modal.component';
import { ProductoFormAddModalComponent } from './components/producto-form-add-modal/producto-form-add-modal.component';
import { ProductoFormEditComponent } from './components/producto-form-edit/producto-form-edit.component';
import { ProdCardViewListComponent } from './components/prod-card-view-list/prod-card-view-list.component';
import { ReadFileModalComponent } from './components/read-file-modal/read-file-modal.component';
import { ReadCsvFileModalComponent } from './components/read-csv-file-modal/read-csv-file-modal.component';
import { ReadXlsxFileModalComponent } from './components/read-xlsx-file-modal/read-xlsx-file-modal.component';
import { PersonasAutocompleteComponent } from './components/personas-autocomplete/personas-autocomplete.component';
import { ProductoAutocompleteComponent } from './components/producto-autocomplete/producto-autocomplete.component';
import { ProductoLinkComponent } from './components/producto-link/producto-link.component';
import { ArticuloCardViewDosComponent } from './components/articulo-card-view-dos/articulo-card-view-dos.component';
import { ArticulosPreciosComponent } from './components/articulos-precios/articulos-precios.component';
import { ArticuloCardViewGuestComponent } from './components/articulo-card-view-guest/articulo-card-view-guest.component';
import { ProductoCardSelectPesoComponent } from './components/producto-card-select-peso/producto-card-select-peso.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { ArticulosPreciosPrintComponent } from './components/articulos-precios-print/articulos-precios-print.component';
import { ProductListPrintComponent } from './components/product-list-print/product-list-print.component';
import { PersonasListComponent } from './components/personas-list/personas-list.component';
import { PersonaModalFormComponent } from './components/persona-modal-form/persona-modal-form.component';
import { BrowseCtrlComponent } from './components/browse-ctrl/browse-ctrl.component';
import { PersonasFilterPipe } from './pipes/personas-filter.pipe';
import { ProductoFilterPipe } from './pipes/producto-filter.pipe';
import { ArticulosReventaComponent } from './components/articulos-reventa/articulos-reventa.component';
import { ArticuloCardViewReventaComponent } from './components/articulo-card-view-reventa/articulo-card-view-reventa.component';
import { ArticulosReventaPrintComponent } from './components/articulos-reventa-print/articulos-reventa-print.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';

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
    MenuappComponent,
    PageNotFoundComponent,
    ApitoapiComponent,
    ApiconnectComponent,
    UploadComponent,
    ReadFileComponent,
    ImportDataComponent,
    ArticulosListComponent,
    ProductsCardViewUnoComponent,
    ArticuloEditComponent,
    ArticuloCardSelectToolsComponent,
    ProdCardViewDosComponent,
    ArticuloPagoSelectComponent,
    ArticuloFormComponent,
    ArticuloFormAddModalComponent,
    ProductoFormAddModalComponent,
    ProductoFormEditComponent,
    ProdCardViewListComponent,
    ReadFileModalComponent,
    ReadCsvFileModalComponent,
    ReadXlsxFileModalComponent,
    PersonasAutocompleteComponent,
    ProductoAutocompleteComponent,
    ProductoLinkComponent,
    ArticuloCardViewDosComponent,
    ArticulosPreciosComponent,
    ArticuloCardViewGuestComponent,
    ProductoCardSelectPesoComponent,
    PrintLayoutComponent,
    ArticulosPreciosPrintComponent,
    ProductListPrintComponent,
    PersonasListComponent,
    PersonaModalFormComponent,
    BrowseCtrlComponent,
    PersonasFilterPipe,
    ProductoFilterPipe,
    ArticulosReventaComponent,
    ArticuloCardViewReventaComponent,
    ArticulosReventaPrintComponent,
    UsersComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule
  ],
  providers: [
    AuthGuard
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    }
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
