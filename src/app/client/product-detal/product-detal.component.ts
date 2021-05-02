import { CartItemService } from './../../service/cart-item.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from 'src/app/model/interface/iitem';
import { ItemImgsService } from 'src/app/service/item-imgs.service';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { ItemImgs } from 'src/app/model/interface/item-imgs';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { IBrand } from 'src/app/model/interface/ibrand';
import { ICategory } from 'src/app/model/interface/icategory';


@Component({
  selector: 'app-product-detal',
  templateUrl: './product-detal.component.html',
  styleUrls: ['./product-detal.component.css'],
   
})
export class ProductDetalComponent implements OnInit {
  brand : IBrand ;
  categ : ICategory ;
  item : IItem ;
  ItemImgs : ItemImgs[] ;
  itemId : number = 0 ;
  imgDirectory : string = 'http://localhost:8000';
  
  constructor(
    private _activedRoute : ActivatedRoute,
    private itemImgServ : ItemImgsService,
    private itemServ : ItemServiceService,
    private barndServ : BrandServiceService,
    private categServ : CategoryServiceService,
    private cartServices: CartItemService,
    ) {}

  ngOnInit(): void {
    this.itemId = this._activedRoute.snapshot.params["pid"];

    this.itemServ.getAllItemsById(this.itemId).subscribe(
      data => {
        this.item = data;

        this.barndServ.getAllBrandsById(this.item?.brand).subscribe(
          data => {
            this.brand = data ;
          },
          err => {
            console.log(err)
        });
    
        this.categServ.getAllCategoriesById(this.item?.category).subscribe(
          data => {
            this.categ = data ;
          },
          err => {
            console.log(err)
        });
      },
      err => {
        console.log(err)
    });

    this.itemImgServ.getAllItemImgsByItemId(this.itemId).subscribe(
      data => {
        this.ItemImgs = data;
      },
      err => {
        console.log(err)
    });

    

  }
  addToCart(item:IItem,quantity:number)
  {
    this.cartServices.addItem(item,quantity);
    console.log(this.cartServices.getCartItems());


  }


}
