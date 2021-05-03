import { Component, OnInit } from '@angular/core';
import { CartItemService } from './../../service/cart-item.service';
import { CartItem } from './../../model/interface/cart-item';
import { IItem } from 'src/app/model/interface/iitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from './../../model/interface/iclient';
import { ClientService } from 'src/app/service/client.service';
;
import { IClientLocation } from 'src/app/model/interface/iclient-location';
import { IClientPhone } from 'src/app/model/interface/iclient-phone';
import { ClientLocationService } from './../../service/client-location.service';
import { ClientPhoneService } from './../../service/client-phone.service';
import { IOrder } from './../../model/interface/iorder';
import { OrderServiceService } from './../../service/order-service.service';
import { OrderItemServiceService } from './../../service/order-item-service.service';
import { element } from 'protractor';
import { IOrderItem } from './../../model/interface/iorder-item';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart:CartItem[];
  currentclient:IClient;
  clientsLocations : IClientLocation[];
  clientPhones : IClientPhone[];
  emailCheck: FormGroup;
  sendkeyForm: FormGroup;
  clientForm: FormGroup;
  clientphoneForm: FormGroup;
  ClientlocationForm: FormGroup;
  orderlocationForm: FormGroup;
  
  cuurentorder:IOrder;

  
  constructor(
    private CartItemService:CartItemService ,
    private ClientLocationService:ClientLocationService,
    private ClientPhoneService:ClientPhoneService,
    private OrderServiceService:OrderServiceService,
    private OrderItemServiceService:OrderItemServiceService,
    private fb: FormBuilder,
    private ClientService:ClientService,
    
  
    ) 
    {
      this.sendkeyForm = this.fb.group({
        keyForm: ['',[Validators.required]],
      });
      console.log(this.sendkeyForm)
     
      this.emailCheck = this.fb.group({
        email: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      });
      this.clientForm = this.fb.group({
        name: ['',[Validators.required,Validators.minLength(3)]],
      });
      this.clientphoneForm = this.fb.group({
        phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0-9]*$")]],
      });
      this.ClientlocationForm =
      this.fb.group({
        address: ['', [Validators.required, Validators.minLength(10)]],
      });
      this.orderlocationForm =
      this.fb.group({
        address: ['', [Validators.required]],
      });




    }

  ngOnInit(): void {
        this.cart=this.CartItemService.getCartItems();
  }
  updateclient(){
    this.currentclient.name=this.clientForm.get('name').value;
    this.ClientService.updateClient(this.currentclient?.id,this.currentclient).subscribe(
      data=>{
        this.currentclient=data;

      },
      err=>
      {
        console.log(err)
      }

    )

  }
  updateclientphone(){
    let phone=this.clientphoneForm.get('phone').value;
    this.ClientPhoneService.addClientPhone({client:this.currentclient.id,phone:phone}).subscribe(
      data=>{
        this.getclientdata();

      },
      err=>
      {
        console.log(err)
      }

    )


  }
  getPrice(item:CartItem)
  {
    if(item.item?.discount){
      return (item.item?.price - item.item?.discount) * item.quantity  
    }
    else
    {
      return item.item?.price  * item?.quantity 
    }
    
  }
  totalPrice(){
    let total = 0;
    for (let index = 0; index < this.cart.length; index++) {
      if(this.cart[index].item?.discount)
      total += Number(this.cart[index].item?.price-this.cart[index].item?.discount) * Number(this.cart[index].quantity)
      else
      total += Number(this.cart[index].item?.price) * Number(this.cart[index].quantity)
    }
    return total;
  }
  emailChecksubmin()
  {
    console.log(this.emailCheck.get('email').value)
    let clinet:IClient={email:this.emailCheck.get('email').value,name:"hassan"};
    this.ClientService.addClient(clinet).subscribe(
      data=>
      {
        this.currentclient=data
        console.log(this.currentclient)
        if(!this.currentclient?.is_active)
        {
        this.ClientService.sendClientKey(this.currentclient.email).subscribe(
          data=>
          {
            console.log(data)
          }
          ,err=>
          {
            console.log(err)
          }
        )
        this.getclientdata()
      }

    }
      ,err=>
      {
        console.log(err)
      }
    )
  }
  sendkeysubmit(){
    this.ClientService.activeClientKey(this.currentclient.email,Number(this.sendkeyForm.get('keyForm').value)).subscribe(
      data=>
      {
        
        this.currentclient=data;
        if(this.currentclient.is_active)
        {
          this.getclientdata()
    
        }
        console.log(this.currentclient)
      },err=>
      {
        console.log(err)
      }
      );
    
  }
  getclientdata(){


    this.clientForm.patchValue({
      name: this.currentclient.name,

    });
    
    this.ClientPhoneService.getAllClientPhonesByClientId(this.currentclient.id).subscribe(
      data=>
      {
      this.clientPhones=data;
      console.log(this.clientPhones)
      },
      err=>{
        console.log(err)
      }
    );
    this.ClientLocationService.getAllClientLocationsByClientId(this.currentclient.id).subscribe(
      data=>
      {
      this.clientsLocations=data;
      console.log(this.clientsLocations)
      },
      err=>{
        console.log(err)
      }
    );
  
  }
  deletephone(phone:IClientPhone)
  {
    this.ClientPhoneService.deleteClientPhoneById(phone?.id).subscribe(data=>
      {
        this.getclientdata();
      },
      err=>{
        console.log(err)
      }
      )
  }
  addlocation(){
    let address=this.ClientlocationForm.get('address').value;
    this.ClientLocationService.addClientLocation({client:this.currentclient.id,location:address}).subscribe(
      data=>{
        this.getclientdata();

      },
      err=>
      {
        console.log(err)
      }

    )

  }
  deleteaddress(address:IClientLocation)
  {
    this.ClientLocationService.deleteClientLocationById(address?.id).subscribe(data=>
      {
        this.getclientdata();
      },
      err=>{
        console.log(err)
      }
      )

  }
  addorder(){

    this.cuurentorder={client:this.currentclient.id,total:this.totalPrice(),address:Number(this.orderlocationForm.get('address').value),status:'pre'}
    this.OrderServiceService.addOrder(this.cuurentorder).subscribe(
      data=>
      {
        this.cuurentorder=data
        console.log(this.cuurentorder)
        this.cart.forEach(element=>{
          let orderitem:IOrderItem;
          orderitem.item=element?.item?.id;
          orderitem.order=this.cuurentorder?.id;
          orderitem.quantity=element?.quantity;
          if(orderitem.quantity>0)
          {
          this.OrderItemServiceService.addOrderItem(orderitem).subscribe(
            data=>
            {
              console.log(data);
            },
            err=>
            {
              console.log(err)
            }
          )}




        }
        )
      }
    )
  }

}
