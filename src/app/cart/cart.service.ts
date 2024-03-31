import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  constructor(private client: HttpClient) { }

  //Using Mockoon
  /*getAllCartItems():Observable<Product[]>{
    return this.client.get<Product[]>(environment.apiBaseUrl+"/cart");
  }
  clearAllCartItems():Observable<void>{
    return this.client.delete<void>(environment.apiBaseUrl+"/cart");
  }

  addCartItem(product: Product):Observable<void>{
    return this.client.post<void>(environment.apiBaseUrl+"/cart", product);
  }

  */

  //Start -- with local Storage
  cartItems:Product[]=[];

  getAllCartItems():Product[]{
    var cartItems = localStorage.getItem("cartItems");
    if(cartItems!= null){
      this.cartItems = JSON.parse(cartItems);
      return this.cartItems;
    }
    return [];
  }

  clearAllCartItems():void{
    this.cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  addCartItem(product: Product):void{
    this.cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  //End -- with local Storage

  checkOut(cartItems: Product[]):Observable<void>{
    return this.client.post<void>(environment.apiBaseUrl+"/checkout", cartItems);
  }
}
