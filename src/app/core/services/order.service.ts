import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  // this service need token from the header interceptor 

  private readonly httpClient = inject(HttpClient); 
  
  createCashOrder(shippingAddress:object,cartId:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v2/orders/${cartId}`,shippingAddress)
  }

  getUserOrders(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`)
  }

  checkoutSession(cartId:string,shippingAddress:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,shippingAddress)
  }

  // shipping address object sample
  // "shippingAddress": {
  //   "details": "Test address",
  //   "phone": "01000000000",
  //   "city": "Cairo",
  //   "postalCode": "12345"
  // }
}
