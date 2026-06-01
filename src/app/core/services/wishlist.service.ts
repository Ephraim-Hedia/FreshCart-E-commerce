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

  // ── Shared signals ─────────────────────────────────────────────────────────
  wishlistCount = signal<number>(0);
  
  // Set of product IDs currently in the wishlist
  // Used by any component to check if a product is wishlisted
  wishlistIds = signal<Set<string>>(new Set());

  // ── Helpers ────────────────────────────────────────────────────────────────
  isInWishlist(productId: string): boolean {
    return this.wishlistIds().has(productId);
  }

  private syncIds(ids: string[]): void {
    this.wishlistIds.set(new Set(ids));
    this.wishlistCount.set(ids.length);
  }


  // ── API calls ──────────────────────────────────────────────────────────────
 
  // GET → returns full product objects
  getLoggedUserWishlist(): Observable<WishlistResponse> {
    return this.httpClient
      .get<WishlistResponse>(this.baseUrl)
      .pipe(tap(res => {
        // Extract IDs from full product objects
        const ids = res.data.map(p => p._id);
        this.syncIds(ids);
      }));
  }
 
  // POST → returns array of product IDs only
  addProductToWishlist(productId: string): Observable<WishlistMutationResponse> {
    return this.httpClient
      .post<WishlistMutationResponse>(this.baseUrl, { productId })
      .pipe(tap(res => this.syncIds(res.data)));
  }
 
  // DELETE → returns array of product IDs only
  removeProductFromWishlist(productId: string): Observable<WishlistMutationResponse> {
    return this.httpClient
      .delete<WishlistMutationResponse>(`${this.baseUrl}/${productId}`)
      .pipe(tap(res => this.syncIds(res.data)));
  }

}