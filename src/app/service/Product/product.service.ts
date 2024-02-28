import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { any } from 'prop-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://apihaha.netlify.app/.netlify/functions/api/product';

  constructor(private http: HttpClient) { }

  getProdut(page: any): Observable<any>{
    return this.http.get<any>(
      `${this.apiUrl}?page=${page.page}&size=${page.size}`
    );
  }
  getOneProduct(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/detail/${id}`);
  }
  getCategoryProduct(id: any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/category/${id.id}?page=${id.page}&size=${id.size}`);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  addProduct(product: any){
    return this.http.post(`${this.apiUrl}`,product);
  }
  updateProduct(product: any){
    return this.http.put(`${this.apiUrl}/${product.id}`,product)
  }
}
