import { Component, Input, OnInit } from '@angular/core';
import { IItem } from 'src/app/model/interface/iitem';
import { ItemImgsService } from 'src/app/service/item-imgs.service';
import { ItemImgs } from './../../../../model/interface/item-imgs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  imgDirectory : string = 'http://localhost:8000';
  itemImgs : ItemImgs [] ;
  currentPrict: number = 0;

  @Input() item: IItem;
  constructor(private itemImgServ :  ItemImgsService) { }

  ngOnInit(): void {

    this.itemImgServ.getAllItemImgsByItemId(this.item.id).subscribe(
      data => {
        this.itemImgs= data;
      },
      err => {
        console.log(err);
    });

    if(this.item.discount){
      this.currentPrict = this.item.price - this.item.discount  
    }
    else
    {
      this.currentPrict = this.item.price 
    }

    


  }

  

}
