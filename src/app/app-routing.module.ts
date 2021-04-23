import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './client/cart/cart.component';
import { Erorr404Component } from './client/erorr404/erorr404.component';
import { HomeComponent } from './client/home/home.component';
import { ProductDetalComponent } from './client/product-detal/product-detal.component';
import { CheckoutComponent } from './client/checkout/checkout.component';
import { ShowProductsComponent } from './client/show-products/show-products.component';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import(`./admin/dashboard/dashboard.module`).then(m => m.DashboardModule) },
  { path: 'products', component:  ShowProductsComponent },
  { path: 'products/:pid', component:  ProductDetalComponent },
  { path: 'home', component:  HomeComponent },
  { path: 'cart', component:  CartComponent },
  { path: 'checkout', component:  CheckoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Erorr404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
