import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly httpClient = inject(HttpClient)

  addProductToCart(productId:string):Observable<any>{
    // need token
    return this.httpClient.post(`${environment.baseUrl}/api/v2/cart`,{
      "productId": productId
    })
  }

  getLoggedUserCart():Observable<any>{
    // need token from the interceptor
    return this.httpClient.get(`${environment.baseUrl}/api/v2/cart`)
  }

  updateCartProductQuantity(productId:string,count:number):Observable<any>{
    // need token from the interceptor
    return this.httpClient.put(`${environment.baseUrl}/api/v2/cart/${productId}`,{
      "count": count
    })
  }

  removeProductFromCart(productId:string):Observable<any>{
    // need token from the interceptor
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart/${productId}`)
  }

  clearUserCart():Observable<any>
  {
    // need token from the interceptor
    return this.httpClient.delete(`${environment.baseUrl}/api/v2/cart`)
  }

  applyCouponToCart(couponName:string):Observable<any>
  {
    // need token from the interceptor
    return this.httpClient.put(`${environment.baseUrl}/api/v2/cart/applyCoupon`,{
      "couponName": couponName
    })
  }
}
