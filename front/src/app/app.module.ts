import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategorieComponent } from './modules/categorie/categorie.component';
import { ProductComponent } from './modules/product/product.component';
import { ClientComponent } from './modules/client/client.component';
import { SaleComponent } from './modules/sale/sale.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategorieComponent,
    ProductComponent,
    ClientComponent,
    SaleComponent
  ],
  imports: [
 

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
