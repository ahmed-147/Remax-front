import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ClientsComponent } from './clients/clients.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard.component';
import { ItemsComponent } from './items/items.component';
import { DashcontentComponent } from './dashcontent/dashcontent.component';


@NgModule({
  declarations: [ 
    DashboardComponent,
    OrdersComponent,
    ClientsComponent,
    CategoriesComponent,
    BrandsComponent,
    AccountsComponent,
    ItemsComponent,
    DashcontentComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
