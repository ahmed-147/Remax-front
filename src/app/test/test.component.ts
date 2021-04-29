import { IAccount } from './../model/interface/iaccount';
import { IItem } from './../model/interface/iitem';
import { OrderServiceService } from './../service/order-service.service';
import { OrderItemServiceService } from './../service/order-item-service.service';
import { ItemServiceService } from './../service/item-service.service';
import { ClientPhoneService } from './../service/client-phone.service';
import { ClientLocationService } from './../service/client-location.service';
import { ClientService } from './../service/client.service';
import { BrandServiceService } from './../service/brand-service.service';
import { ICategory } from './../model/interface/icategory';
import { CategoryServiceService } from './../service/category-service.service';
import { AccountService } from './../service/account.service';
import { Component, OnInit } from '@angular/core';
import { IBrand } from '../model/interface/ibrand';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  category:ICategory={name:'test',parent:1};
  brand:IBrand={name:'new brand'};
  item:IItem={user:1, name:'new item 3', brand:1, category:1, quantity:10, price:20, details:"dasf"}
  account:IAccount={username:'hassan1',phone:'01234568899', first_name:'hassan1', password:'hassan1'}
  constructor(private AccountService: AccountService,
    private CategoryServiceService : CategoryServiceService, 
    private BrandServiceService: BrandServiceService, 
    private ClientService: ClientService, 
    private ClientLocationService: ClientLocationService, 
    private ClientPhoneService: ClientPhoneService, 
    private ItemServiceService: ItemServiceService, 
    private OrderItemServiceService: OrderItemServiceService, 
    private OrderServiceService: OrderServiceService,
    ) {
    console.log(localStorage);
    this.category.name= 'Apple' ;
     
   }

  ngOnInit(): void {
     this.AccountService.getCurrentAccount().subscribe(data=>{
       console.log(data);
     },
     err=>{
       console.log(err);
      
     })
    
    // this.ItemServiceService.addItem(this.item).subscribe(data=>{
    //   console.log(data);
    // },
    // err=>{
    //   console.log(err);
      
    // })
    
    
  }
  

}
