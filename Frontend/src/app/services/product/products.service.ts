import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlBackend: string = "http://localhost:4000/api/locals/products/"

  constructor(
    private http: HttpClient) { }

  getProducts(localID: Number){
    return this.http.get(this.urlBackend + "/" + localID);
  }
}
