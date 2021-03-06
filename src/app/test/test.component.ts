import { CartItemService } from './../service/cart-item.service';
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
import { ItemImgsService } from '../service/item-imgs.service';
import $ from 'jquery';

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
    private cartitem: CartItemService,
    private imgServ : ItemImgsService,
    ) {
    // console.log(localStorage);
    // this.category.name= 'Apple' ;
    }

  ngOnInit(): void {
    //  this.AccountService.getCurrentAccount().subscribe(data=>{
    //    console.log(data);
    //  let itms:IItem[];
    //  this.ItemServiceService.getAllItems().subscribe(data=>{
       //itms = data;
       //this.cartitem.addItem(itms[1]);
       //this.cartitem.addItem(itms[2]);
       //this.cartitem.addQuantity(itms[2]);
       //this.cartitem.addQuantity(itms[2]);
       //this.cartitem.subtractQuantity(itms[2]);
       //console.log(localStorage);
       //this.cartitem.deleteQuantity(itms[1]);
       //this.cartitem.resetCart();
       //console.log(localStorage);
       //console.log(this.cartitem.getCartItems());
    //  },
    //  err=>{
    //    console.log(err);
      
    //  })
     
     
    
    //  this.ClientService.activeClientKey('hassan@gmail.com', 1035).subscribe(data=>{
    //    console.log(data);
    //  },
    //  err=>{
    //    console.log(err);
      
    //  })
    this.imgServ.getAllItemImgs().subscribe(
      date => {
        console.log(date);
        },
        err=>{
          console.log(err);
        });

    $(document).ready(function() {
        // $('#ba').click(function(){
          
        // });
     });
    
        
  }

  afun(){
    $('#test').animate({left:'250px',
  bottom:'250px'});
  }
  
  
}
