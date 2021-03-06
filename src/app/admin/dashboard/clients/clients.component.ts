import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/model/interface/iclient';
import { IClientLocation } from 'src/app/model/interface/iclient-location';
import { IClientPhone } from 'src/app/model/interface/iclient-phone';
import { ClientLocationService } from 'src/app/service/client-location.service';
import { ClientPhoneService } from 'src/app/service/client-phone.service';
import { ClientService } from 'src/app/service/client.service';
import { Location } from '@angular/common';
import { IOrder } from 'src/app/model/interface/iorder';
import { OrderServiceService } from 'src/app/service/order-service.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientOrders : IOrder [];
  clients : IClient[];
  clientsLocations : IClientLocation[];
  clientPhones : IClientPhone[];

  constructor(
    private cilentServ :ClientService,
    private clientLocationServ : ClientLocationService,
    private clientPhoneServ : ClientPhoneService,
    private orderServ : OrderServiceService
  ) { }

  ngOnInit(): void {
    this.fillTableData()
  }

  fillTableData(){
    this.cilentServ.getAllClients().subscribe(data=>{
      this.clients = data;
    },
    err=>{
      console.log(err.detail);
    });

    this.clientPhoneServ.getAllClientPhones().subscribe(
      data =>{
        this.clientPhones = data
      },
      err =>{
        console.log(err);
        
    });

    this.clientLocationServ.getAllClientLocations().subscribe(
      data =>{
        this.clientsLocations = data
      },
      err =>{
        console.log(err);
        
    });

    this.orderServ.getAllOrders().subscribe(data=>{
      this.clientOrders = data;
    },
    err=>{
      console.log(err.detail);
    });
   
  }

  getClientLocations(clientId):string{
    let locations = ''
    let clientloca = this.clientsLocations?.filter(element =>{return element.client == clientId});
    if (clientloca?.length){
      for (let loc of clientloca ){
        locations += loc.location + ', '
      }
    }
    else{
      locations = 'no location'
    }
    return locations
  }

  getClientPhones(clientId): string  {
    let phones = ''
    let clientPhone = this.clientPhones?.filter(element =>{return element.client == clientId});
   
    if (clientPhone?.length){
      for (let ph of clientPhone ){
        phones += ph.phone + ', ';
      }
    }
    else{
      phones = 'no phone';
    }
    return phones;
  }

  getClientOrders(clientId):any{
    let clientOrders = this.clientOrders?.filter(element =>{return element.client == clientId});
    return clientOrders?.length
  }
   
}
