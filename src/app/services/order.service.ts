import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class OrderService {
  private token: string = '';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token') as string;
  }

  getOrders() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get('/api/orders', { headers });
  }
}