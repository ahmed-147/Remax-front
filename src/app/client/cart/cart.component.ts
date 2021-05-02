import { CartItemService } from './../../service/cart-item.service';
import { IItem } from './../../model/interface/iitem';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/interface/cart-item';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'node:constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:CartItem[];
  constructor(
    private CartItemService: CartItemService,
  ) { }

  ngOnInit(): void {
    this.getALLItems();  
    
  }
  getALLItems()
  {
    this.cartItems = this.CartItemService.getCartItems();
  }
  getCurrentPrice(item:IItem)
  {
    if(item.discount){
      return item.price - item.discount  
    }
    else
    {
      return item.price 
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
    return item.quantity * item.item.price;
  }
  deleteItem(item:IItem){
    this.CartItemService.deleteQuantity(item);
    this.getALLItems();
  }
  totalPrice(){
    let total = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      total += Number(this.cartItems[index].item.price) * Number(this.cartItems[index].quantity)
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

}
