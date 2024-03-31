import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  cartList : Product[] =[];

  constructor(private client: HttpClient) { }

  getAllCartItems():Observable<Product[]>{
    return this.client.get<Product[]>(environment.apiBaseUrl+"/cart");
  }

  clearAllCartItems():Observable<void>{
    return this.client.delete<void>(environment.apiBaseUrl+"/cart");
  }

  addCartItem(product: Product):Observable<void>{
    return this.client.post<void>(environment.apiBaseUrl+"/cart", product);
  }

  checkOut(cartItems: Product[]):Observable<void>{
    return this.client.post<void>(environment.apiBaseUrl+"/checkout", cartItems);
  }
}
