import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/model/interface/iitem';
import { IOrder } from 'src/app/model/interface/iorder';
import { IOrderItem } from 'src/app/model/interface/iorder-item';
import { ClientService } from 'src/app/service/client.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { OrderItemServiceService } from 'src/app/service/order-item-service.service';
import { OrderServiceService } from 'src/app/service/order-service.service';
import { IClient } from 'src/app/model/interface/iclient';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderTotal : number ; 
  orders : IOrder[] ;
  OrderItems : IOrderItem[];
  items : IItem[]; 
  clients : IClient[];

  orderSelect : boolean = false; 

  constructor(
    private orderServ : OrderServiceService, 
    private orderItemServ : OrderItemServiceService,
    private itemServ : ItemServiceService,
    private clientServ : ClientService ) { }

  ngOnInit(): void {
    this.fillTableData()
  }

  //---------------
  

  fillTableData(){
    this.orderServ.getAllOrders().subscribe(data=>{
      this.orders = data;
    },
    err=>{
      console.log(err.detail);
    });

    this.itemServ.getAllItems().subscribe(
      data=>{
      this.items = data
    },
    err=>{
      console.log(err.detail);
    });

    this.clientServ.getAllClients().subscribe(
      data=>{
      this.clients = data
    },
    err=>{
      console.log(err.detail);
    });

  }

  showOrderItems(OrderId){
    this.OrderItems = [];
    this.orderItemServ.getAllOrderItemsByOrderId(OrderId).subscribe(
    data=>{
      console.log(data);
      this.OrderItems = data;
    },
    err=>{
      console.log(err.detail);
    });
    this.orderSelect= true ;
  }

  deleteOrder(idItem){
    
  }

  getItemName(itemId):any{
    let itemName = this.items?.find(element =>{return element.id== itemId } )
    if (itemName){
      return itemName.name
    }
    else {
      return 'No Item Name'
    }
    
  }
  getClientName(clientID):any{
    let clientName = this.clients?.find(element =>{return element.id== clientID } )
    if (clientName){
      return clientName.name
    }
    else {
      return 'No Name'
    }
    
  }

  getItemPrice(itemId, itemQui): any {
    let itemPrice = this.items?.find(element =>{return element.id== itemId } )
    if (itemPrice){
      return itemPrice.price * itemQui
    }
    else {
      return 'No Price'
    }
  }



  //change status fun 


  preparedOrder(order: IOrder){
    order.status = 'not';
    this.orderServ.updateOrder(order.id,order).subscribe(
    data=>{
      this.orderServ.getAllOrders().subscribe(data=>{
        this.orders = data;
      },
      err=>{
        console.log(err.detail);
      });
    },
    err=>{
      console.log(err.detail);
    });
  }


  resetOrder(order: IOrder){

    order.status = 'pre';
    this.orderServ.updateOrder(order.id,order).subscribe(
    data=>{
      this.orderServ.getAllOrders().subscribe(data=>{
        this.orders = data;
      },
      err=>{
        console.log(err.detail);
      });
    },
    err=>{
      console.log(err.detail);
    });

  }

  deliveredOrder(order: IOrder){

    order.status = 'del';
    this.orderServ.updateOrder(order.id,order).subscribe(
    data=>{
      this.orderServ.getAllOrders().subscribe(data=>{
        this.orders = data;
      },
      err=>{
        console.log(err.detail);
      });
    },
    err=>{
      console.log(err.detail);
    });

  }
  

  // get roders by status 


  getOrders(): IOrder[]{
    return this.orders.filter(element => {return element.status == 'pre' })
  }
  getOrdersNotDeliver(): IOrder[]{
    return this.orders.filter(element => {return element.status == 'not' })
  }
  getOrdersDelivered(): IOrder[]{
    return this.orders.filter(element => {return element.status == 'del' })
  }

 

}
