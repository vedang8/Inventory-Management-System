import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api'; // Adjust your backend URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token from local storage (or another storage method)
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Add Bearer token
      'Content-Type': 'application/json'
    });
  }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/inventory`, { headers: this.getAuthHeaders() });
  }

  getLowStockProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/inventory/low-stock`, { headers: this.getAuthHeaders() });
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/inventory`, product, { headers: this.getAuthHeaders() });
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/inventory/${id}`, product, { headers: this.getAuthHeaders() });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inventory/${id}`, { headers: this.getAuthHeaders() });
  }
}