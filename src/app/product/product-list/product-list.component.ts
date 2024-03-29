import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  productList : Product[] = [];

  constructor(private service: ProductService){}

  ngOnInit(): void {
    this.service.getAllProducts().subscribe(products => {
      this.productList = products;
      console.log(products);
    })
  }

}
