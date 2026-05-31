import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CartResponse } from '../models/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/api/v2/cart`;
 
  // ── Shared signals — consumed by navbar & cart page ────────────────────────
  cartCount = signal<number>(0);
  cartId    = signal<string | null>(null);
 
  // ── Helper: sync signals from any cart response ────────────────────────────
  private syncState(res: CartResponse): void {
    this.cartCount.set(res.numOfCartItems);
    this.cartId.set(res.cartId);
  }
 
  // ── API calls ──────────────────────────────────────────────────────────────
 
  getLoggedUserCart(): Observable<CartResponse> {
    return this.httpClient
      .get<CartResponse>(this.baseUrl)
      .pipe(tap(res => this.syncState(res)));
  }
 
  addProductToCart(productId: string): Observable<CartResponse> {
    return this.httpClient
      .post<CartResponse>(this.baseUrl, { productId })
      .pipe(tap(res => this.syncState(res)));
  }
 
  updateCartProductQuantity(productId: string, count: number): Observable<CartResponse> {
    return this.httpClient
      .put<CartResponse>(`${this.baseUrl}/${productId}`, { count })
      .pipe(tap(res => this.syncState(res)));
  }
 
  removeProductFromCart(productId: string): Observable<CartResponse> {
    return this.httpClient
      .delete<CartResponse>(`${this.baseUrl}/${productId}`)
      .pipe(tap(res => this.syncState(res)));
  }
 
  clearUserCart(): Observable<CartResponse> {
    return this.httpClient
      .delete<CartResponse>(this.baseUrl)
      .pipe(tap(res => this.syncState(res)));
  }
 
  applyCouponToCart(couponName: string): Observable<CartResponse> {
    return this.httpClient
      .put<CartResponse>(`${this.baseUrl}/applyCoupon`, { couponName })
      .pipe(tap(res => this.syncState(res)));
  }

}
