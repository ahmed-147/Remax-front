import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Erorr404Component } from 'src/app/client/erorr404/erorr404.component';
import { AccountsComponent } from './accounts/accounts.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard.component';
import { DashcontentComponent } from './dashcontent/dashcontent.component';
import { ItemsComponent } from './items/items.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'content', component: DashcontentComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'accounts', component: AccountsComponent },
      { path: '', redirectTo: 'content', pathMatch: 'full' },
      { path: '**', component: Erorr404Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
