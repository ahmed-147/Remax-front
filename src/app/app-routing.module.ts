import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './client/cart/cart.component';
import { Erorr404Component } from './client/erorr404/erorr404.component';
import { HomeComponent } from './client/home/home.component';
import { CheckoutComponent } from './client/checkout/checkout.component';

const routes: Routes = [
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
