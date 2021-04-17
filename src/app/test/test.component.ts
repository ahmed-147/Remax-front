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

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  category:ICategory={name:'test',parent:1,slug:'dcsdffds'};

  constructor(private CategoryServiceService : CategoryServiceService, 
    private BrandServiceService: BrandServiceService, 
    private ClientService: ClientService, 
    private ClientLocationService: ClientLocationService, 
    private ClientPhoneService: ClientPhoneService, 
    private ItemServiceService: ItemServiceService, 
    private OrderItemServiceService: OrderItemServiceService, 
    private OrderServiceService: OrderServiceService) {
    console.log(localStorage);
    this.category.name= 'Apple' ;
     
   }

  ngOnInit(): void {
    this.CategoryServiceService.addCategory(this.category).subscribe(data=>{
      console.log(data);
    },
    err=>{
      console.log(err);
      
    })
    
    
  }
  

}
