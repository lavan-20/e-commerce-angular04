import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  cartItems : Product[] = [];
  totalCartValue: number = 0;

  constructor(private service: CartService){}

  ngOnInit(): void {
    this.service.getAllCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalCartValue = this.getTotalPrice();
    }
    )
  }
  getTotalPrice() : number{
    var total: number = 0;
    this.cartItems.forEach(item => total+=item.price);
    return total;
  }
  
  onClickCheckOut() {
    this.service.checkOut(this.cartItems).subscribe();
  }

  onClearAll() {
    this.service.clearAllCartItems().subscribe();
  }
}
