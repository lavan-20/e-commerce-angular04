import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  productList : Product[] = [];
  filteredProductList : Product[] = [];
  sortValue: string = "";

  constructor(private productService: ProductService, private cartService: CartService
    ,private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.productList = products;
      this.filteredProductList = products;
      console.log(this.filteredProductList);
    })
  }

  addToCart(product: Product): void{
    
    //Using mockoon
    /*this.cartService.addCartItem(product).subscribe({next: data =>
    this.snackBar.open("Product - "+product.title+" added to the cart!","",
      {
        duration : 2000,
        horizontalPosition: "right",
        verticalPosition: "top"
      })
    })*/
    //Using local storage
    this.cartService.addCartItem(product);
    this.snackBar.open("Product - "+product.title+" added to the cart!","",
      {
        duration : 2000,
        horizontalPosition: "right",
        verticalPosition: "top"
      });
  }

  filterByName(event: Event): void{
    this.filteredProductList = [];
    var searchTerm = (event.target as HTMLInputElement).value;
    this.productList.forEach(product => {
      if(product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
        this.filteredProductList.push(product);
    })
    this.onSort(this.sortValue);
  }

  onSort(sortValue: string) {
    if(!sortValue.length)
      return; 
    this.sortValue = sortValue;
    if(sortValue === "priceAsc")
      this.filteredProductList.sort((a,b)=> a.price - b.price)
    else
      this.filteredProductList.sort((a,b)=> b.price - a.price)
  }
 
}
