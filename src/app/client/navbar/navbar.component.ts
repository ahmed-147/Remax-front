import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/interface/cart-item';
import { IItem } from 'src/app/model/interface/iitem';
import { CartItemService } from 'src/app/service/cart-item.service';
import { SearchitemService } from 'src/app/service/searchitem.service';
import { ItemImgs } from 'src/app/model/interface/item-imgs';
import { ItemImgsService } from 'src/app/service/item-imgs.service';
import { IBrand } from 'src/app/model/interface/ibrand';
import { BrandServiceService } from 'src/app/service/brand-service.service';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { ICategory } from 'src/app/model/interface/icategory';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  
  hosttURL = environment.apiUrl
  port = environment.port
  imgDirectory : string = `${this.hosttURL}:${this.port}`;

  numCurrntItems : number ;
  results: IItem[];
  searchTerm : string  = ''; 
  itemImgs :ItemImgs [];
  categories : ICategory [];
  brands : IBrand[];

  
  cartItems:CartItem[];

  constructor(
    private CartItemService : CartItemService,
    private searchServ : SearchitemService,
    private itemImgServ : ItemImgsService,
    private categServ : CategoryServiceService,
    private brandServ : BrandServiceService,
    private cdr: ChangeDetectorRef,
    
     ) { 
      
    }

  ngOnInit(): void {
    this.getALLItems(); 
    this.itemImgServ.getAllItemImgs().subscribe(
      data => {
        this.itemImgs= data;
      },
      err => {
        console.log(err);
    }); 
    this.categServ.getAllCategories().subscribe(
      data => {
        this.categories= data;
      },
      err => {
        console.log(err);
    }); 
    this.brandServ.getAllBrands().subscribe(
      data => {
        this.brands= data;
      },
      err => {
        console.log(err);
    }); 
    
  }
  ngDoCheck(){
    
    this.cdr.detectChanges();
  }


  serachResult(){
    if (this.searchTerm.length != 0){
      this.searchServ.getItemsBySearch(this.searchTerm)
      .subscribe(data => {
        this.results = data;
      }
      );
    }
    else{
      this.results = []
    }
    
  }
  //-------------cart ----------
  getALLItems()
  {
    this.cartItems = this.CartItemService.getCartItems();
    return this.cartItems;
  }
  getCurrentPrice(item:IItem)
  {
    if(item?.discount){
      return item?.price - item?.discount  
    }
    else
    {
      return item?.price 
    }
    
  }
  subQuantity(item:CartItem){
    if (item.quantity>1){
      this.CartItemService.subtractQuantity(item.item);
      this.getALLItems();
    }
    
  }
  calcQuantity(item:IItem, quantity:number){
    if (Number(quantity)<item.quantity && Number(quantity)>=1){
      this.CartItemService.addItem(item,Number(quantity));
    }
    this.getALLItems();
  }
  addQuantity(item:CartItem){
    if (item.quantity+1<item.item.quantity){
      this.CartItemService.addQuantity(item.item);
      this.getALLItems();
    }

  }
  getTotalPrice(item:CartItem)
  {
    return item?.quantity * item.item?.price;
  }
  deleteItem(item:IItem){
    this.CartItemService.deleteQuantity(item);
    this.getALLItems();
  }
  totalPrice(){
    let total = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      total += Number(this.cartItems[index].item?.price) * Number(this.cartItems[index].quantity)
    }
    return total;
  }

  totalQuantity()
  {
    let total = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      total += Number(this.cartItems[index].quantity)
    }
    
    return total;
  }
  resetCart()
  {
    this.CartItemService.resetCart();
    this.getALLItems();
  }

  //---------------------

  getItemImg(itemId){
    return this.itemImgs?.filter(element => {return element.item == itemId })
  }

  changeCart(){
    
    this.totalQuantity()
  }

  //-------------search----------

}
