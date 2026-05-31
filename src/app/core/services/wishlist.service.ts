import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WishlistMutationResponse, WishlistResponse } from '../models/wishlist.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl    = `${environment.baseUrl}/api/v1/wishlist`;

  // Shared signal — consumed by navbar
  wishlistCount = signal<number>(0);

  // ── API calls ──────────────────────────────────────────────────────────────

  // GET → returns full product objects
  getLoggedUserWishlist(): Observable<WishlistResponse> {
    return this.httpClient
      .get<WishlistResponse>(this.baseUrl)
      .pipe(tap(res => this.wishlistCount.set(res.count ?? res.data?.length ?? 0)));
  }

  // POST → returns array of product IDs only (not full products)
  addProductToWishlist(productId: string): Observable<WishlistMutationResponse> {
    return this.httpClient
      .post<WishlistMutationResponse>(this.baseUrl, { productId })
      .pipe(tap(res => this.wishlistCount.set(res.data?.length ?? 0)));
  }

  // DELETE → returns array of product IDs only (not full products)
  removeProductFromWishlist(productId: string): Observable<WishlistMutationResponse> {
    return this.httpClient
      .delete<WishlistMutationResponse>(`${this.baseUrl}/${productId}`)
      .pipe(tap(res => this.wishlistCount.set(res.data?.length ?? 0)));
  }
}