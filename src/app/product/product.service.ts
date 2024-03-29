import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private client:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.client.get<Product[]>(environment.apiBaseUrl+"/products");
  }
}
