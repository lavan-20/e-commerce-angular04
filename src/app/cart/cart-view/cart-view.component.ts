import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  cartItems : Product[] = [];
  totalCartValue: number = 0;

  constructor(private service: CartService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    /* Using Mockoon
    this.service.getAllCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalCartValue = this.getTotalPrice();
    }
    )*/
    //Using local storage
    this.cartItems = this.service.getAllCartItems();
    this.totalCartValue = this.getTotalPrice();
  }
  getTotalPrice() : number{
    var total: number = 0;
    this.cartItems.forEach(item => total+=item.price);
    return total;
  }
  
  onClickCheckOut() {
    if(this.cartItems.length == 0)
      this.snackBar.open("Please add items to the cart before checkout!","",{
        "duration":1000,
        "horizontalPosition":"right",
        "verticalPosition":"top"
      });
    else
      this.service.checkOut(this.cartItems).subscribe({
        next: data => 
          this.snackBar.open("Checkout successful!","",{
            "duration":1000,
            "horizontalPosition":"right",
            "verticalPosition":"top"
          })
      });
  }

  onClearAll() {
    //Using Mockoon
    //this.service.clearAllCartItems().subscribe();

    //Using local Storage
    this.service.clearAllCartItems();
    this.cartItems = [];
  }
}
