import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/api/v1/wishlist`;
 
  // Shared signal — consumed by navbar
  wishlistCount = signal<number>(0);
 
  // ── API calls ──────────────────────────────────────────────────────────────
 
  getLoggedUserWishlist(): Observable<any> {
    // ✅ removed {headers:{'token':''}} — headerInterceptor handles token automatically
    return this.httpClient
      .get<any>(this.baseUrl)
      .pipe(tap(res => this.wishlistCount.set(res.count ?? res.data?.length ?? 0)));
  }
 
  addProductToWishlist(productId: string): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl, { productId })
      .pipe(tap(res => this.wishlistCount.set(res.data?.length ?? 0)));
  }
 
  removeProductFromWishlist(productId: string): Observable<any> {
    // ✅ fixed: ${productId} not ${{productId}}
    return this.httpClient
      .delete<any>(`${this.baseUrl}/${productId}`)
      .pipe(tap(res => this.wishlistCount.set(res.data?.length ?? 0)));
  }

}
