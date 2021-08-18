import { Component, OnInit } from '@angular/core';
import { CartItemService } from './../../service/cart-item.service';
import { CartItem } from './../../model/interface/cart-item';
import { IItem } from 'src/app/model/interface/iitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClient } from './../../model/interface/iclient';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';
import { IClientLocation } from 'src/app/model/interface/iclient-location';
import { IClientPhone } from 'src/app/model/interface/iclient-phone';
import { ClientLocationService } from './../../service/client-location.service';
import { ClientPhoneService } from './../../service/client-phone.service';
import { IOrder } from './../../model/interface/iorder';
import { OrderServiceService } from './../../service/order-service.service';
import { OrderItemServiceService } from './../../service/order-item-service.service';
import { element } from 'protractor';
import { IOrderItem } from './../../model/interface/iorder-item';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart:CartItem [];

  currentclient:IClient;
  orderPhone : IClientPhone;
  orderLocation : IClientLocation;

  clientsLocations : IClientLocation[];
  clientPhones : IClientPhone[];

  newClientForm: FormGroup;

  clientphoneForm: FormGroup;
  ClientlocationForm: FormGroup;

  orderlocationForm: FormGroup;
  currentorder:IOrder;
  

  loading = false;
  loaded = false;
  phoneCheck = false ;
  phoneExist = false ;
  emailcheck = false ; 
  emailExist = false ;
  confirmed = false ;

  

  
  constructor(
    private CartItemService:CartItemService,
    private ClientLocationService:ClientLocationService,
    private ClientPhoneService:ClientPhoneService,
    private OrderServiceService:OrderServiceService,
    private OrderItemServiceService:OrderItemServiceService,
    private fb: FormBuilder,
    private ClientService: ClientService,
    private router: Router,
    ) 
    {
      
      this.newClientForm = this.fb.group({
        name: ['',[Validators.required,Validators.minLength(3)]],
        address: ['', [Validators.required, Validators.minLength(10)]],
        email: ['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      });

      this.clientphoneForm = this.fb.group({
        phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^01[0-9]*$")]
          ],
      });
      this.ClientlocationForm = this.fb.group({
        address: ['', [Validators.required, Validators.minLength(10)]],
      });

      this.orderlocationForm = this.fb.group({
        address: ['', [Validators.required]],
      });


    }

  selectfunction(){
    this.getclientdata();
    this.orderlocationForm.patchValue({
      address : this.clientsLocations[0].id
    });
    
  }

  ngOnInit(): void {
        this.cart=this.CartItemService.getCartItems();
  }

  updateclient(){
    
    // this.currentclient.name=this.clientForm.get('name').value;
    // this.ClientService.updateClient(this.currentclient?.id,this.currentclient).subscribe(
    //   data=>{
    //     this.currentclient=data;
    //   },
    //   err=>
    //   {
    //     console.log(err)
    //   }

    // )

  }

  updateclientphone(){
    // let phone=this.clientphoneForm.get('phone').value;
    // this.ClientPhoneService.addClientPhone({client:this.currentclient.id,phone:phone}).subscribe(
    //   data=>{
    //     this.getclientdata();

    //   },
    //   err=>
    //   {
    //     console.log(err)
    //   }

    // );


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
    
  }

  sendkeysubmit(){
    
  }
  getclientdata(){

  
  }

 
  addorder(){
    this.currentorder={
      client:this.currentclient?.id,
      phone:this.orderPhone?.id,
      total:this.totalPrice(),
      address:this.orderLocation?.id,
      status:'pre'
    }
    this.OrderServiceService.addOrder(this.currentorder).subscribe(
      data=>
      {
        this.currentorder = data;
        console.log(this.currentorder)
        this.cart.forEach(element=>{
          let orderitem: IOrderItem={
            item:element?.item?.id,
            order:this.currentorder?.id,
            quantity:element?.quantity
          };
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
          this.CartItemService.resetCart();
          this.router.navigateByUrl('home');

        }
        );
        
      }
    )
  }


  // ahmed code check out 
  changeCheckAlret(){
    this.phoneCheck = false;
    this.emailcheck = false ;
  }
  

  getClintAdresses (clintId): any  {
    this.ClientLocationService.getAllClientLocationsByClientId(clintId).subscribe(
      data => 
      {
        this.clientsLocations = data
      },
      err=>{
        console.log(err.status)
      });

  }

  checkaddressExist(address): IClientLocation {
    let cientLocation : IClientLocation ; 
    this.clientsLocations.forEach(loc =>{
      if(loc.location == address ){
        cientLocation = loc;
      }
    });
    return cientLocation 
  }

  checkPhoneExist(){
    this.loading = true;
    let phone=this.clientphoneForm.get('phone').value;
    this.ClientPhoneService.checkClientExist(phone).subscribe(
      data=>{
        this.currentclient = data;
        if(data.name != '' ){
          this.phoneExist = true ;
          this.getClintAdresses(data.id);
          this.newClientForm.patchValue({
            email: data.email,
            name: data.name
          });
        }
        else{
          this.phoneExist = false ;
          this.newClientForm.patchValue({
            email: '',
            name: ''
          });
          this.clientsLocations = [];
        }
        this.loading = false;
        this.loaded = true;
        this.emailcheck = false ;
        this.phoneCheck = true;
      },
      err=>
      {
        console.log(err)
      }

    )
  }

  checkEmailExist(){
    let email= this.newClientForm.get('email').value;
    this.ClientService.getClientsByEmail(email).subscribe(
      data=>{
        if(data.name != '' ){
          this.emailExist = true ;
          this.getClintAdresses(data.id);
          this.newClientForm.patchValue({
            name: data.name,
          });
        }
        else{
          this.emailExist = false ;
          this.newClientForm.patchValue({
            name: '' ,
          });
          this.clientsLocations = [];
        }
        this.phoneCheck = false;
        this.emailcheck = true ;
      },
      err=>
      {
        console.log(err)
    });

  }

  goBack(){
    this.confirmed = false ; 
  }

  confirmInforfrom(){
    
    let cilentphon = this.clientphoneForm.get('phone').value;
    let cilentaddress  = this.checkaddressExist(this.newClientForm.get('address').value) ;

      if(this.currentclient?.id){
        let clientInForm =
        {
          id: this.currentclient?.id ,
          name: this.newClientForm.get('name').value, 
          email: this.newClientForm.get('email').value,
        };

        if (!this.phoneExist){
          this.ClientPhoneService.addClientPhone({client:this.currentclient?.id,phone:cilentphon}).subscribe(
              data=>{
                this.orderPhone = data;
              },
              err=>
              {
                console.log(err);
          });
        }
        else{
          
          this.ClientPhoneService.getAllClientPhonesByClientId(this.currentclient?.id).subscribe(
            data => {
              data.forEach(phone => {
                if(phone.phone == cilentphon){
                  this.orderPhone = phone;
                }
              });
            },
            err => {}
            )
        }

        if(!cilentaddress){
          this.ClientLocationService.addClientLocation({client: this.currentclient?.id ,location : this.clientphoneForm.get('address').value }).subscribe(
            data=>{
              this.orderLocation = data;
            },
            err=>
            {
              console.log(err)
            });
        }
        else{
          this.orderLocation = cilentaddress;
        }
        
        this.ClientService.updateClient(this.currentclient?.id,clientInForm).subscribe(
          data=>{
            this.currentclient = data;
          },
          err=>
          {
            console.log(err)
        });
         
        
      }
      else{
        let clientInForm:IClient =
        {
          name: this.newClientForm.get('name').value, 
          email: this.newClientForm.get('email').value,
        };

        this.ClientService.addClient(clientInForm).subscribe(
          data=>{
            this.currentclient = data;
            this.ClientPhoneService.addClientPhone({client: data?.id, phone:cilentphon}).subscribe(
              data=>{ 
                this.orderPhone = data;
              },
              err=> { 
                console.log(err); 
              });
            this.ClientLocationService.addClientLocation({client: this.currentclient?.id ,location : this.newClientForm.get('address').value }).subscribe(
              data=>{this.orderLocation = data;},
              err=>  {console.log(err)});
            
          },
          err => { console.log(err)});

      } 
      this.confirmed = true;
  }
  
}
