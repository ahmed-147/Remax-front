import { IItem } from 'src/app/model/interface/iitem';
import { CartItem } from './../model/interface/cart-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  cartItem: CartItem[];
  constructor() { 
    console.log(localStorage.getItem('items'));
    if (localStorage.getItem('items') != null) {
      console.log('good');
    }
    else {
      console.log('not good');
      let items:CartItem[] = [];
      localStorage.setItem("items", JSON.stringify(items));
  }
  }
  getCartItems(){
    return JSON.parse(localStorage.getItem("items"));
  }
  setCartItem(){
    
  }
  addItem(iitem: IItem) {
    var items:CartItem[] = <CartItem[]>JSON.parse(localStorage.getItem("items"));
    
    let item = items.find(arr => arr.item.id == iitem.id);
    console.log(item);
    if (item){
      items = items.map(arr =>{
        if(arr.item.id == iitem.id){
          arr.quantity+=1;
        }
        return arr;
      })

    }
    else{
      let cartitem:CartItem = {item:iitem,quantity:1};
      items.push(cartitem);
    }
    localStorage.setItem("items", JSON.stringify(items));

}
subtractQuantity(iitem: IItem){
  var items:CartItem[] = <CartItem[]>JSON.parse(localStorage.getItem("items"));
  items = items.map(arr =>{
    if(arr.item.id == iitem.id)
    {
      arr.quantity-=1;
    }
    return arr;

  })
  localStorage.setItem("items", JSON.stringify(items))
}
addQuantity(iitem: IItem){
  var items:CartItem[] = <CartItem[]>JSON.parse(localStorage.getItem("items"));
  items = items.map(arr =>{
    if(arr.item.id == iitem.id)
    {
      arr.quantity+=1;
    }
    return arr;

  })
  localStorage.setItem("items", JSON.stringify(items));
}
deleteQuantity(iitem: IItem){
  var items:CartItem[] = <CartItem[]>JSON.parse(localStorage.getItem("items"));
  items = items.filter(arr =>arr.item.id != iitem.id);
  localStorage.setItem("items", JSON.stringify(items));
}
resetCart(){
  var items = [];
  localStorage.setItem("items", JSON.stringify(items));
}
}

