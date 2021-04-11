import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Erorr404Component } from './client/erorr404/erorr404.component';
import { HomeComponent } from './client/home/home.component';
import { ProductDetalComponent } from './client/product-detal/product-detal.component';

const routes: Routes = [
  { path: 'products/:pid', component:  ProductDetalComponent },
  { path: 'home', component:  HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Erorr404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
