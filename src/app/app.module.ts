import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { NavbarComponent } from './client/navbar/navbar.component';
import { FooterComponent } from './client/footer/footer.component';
import { HomeComponent } from './client/home/home.component';
import { ProductsRowComponent } from './client/home/products-row/products-row.component';
import { ProductCardComponent } from './client/home/products-row/product-card/product-card.component';
import { CartComponent } from './client/cart/cart.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { ShowProductsComponent } from './client/show-products/show-products.component';
import { FiltersComponent } from './client/show-products/filters/filters.component';
import { ContentComponent } from './client/show-products/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductsRowComponent,
    ProductCardComponent,
    CartComponent,
    CheckoutComponent,
    ShowProductsComponent,
    FiltersComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
