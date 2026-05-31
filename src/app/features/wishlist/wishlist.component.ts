import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistProduct } from '../../core/models/wishlist.interface';
import { WishlistItemComponent } from './components/wishlist-item/wishlist-item.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterModule, WishlistItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService     = inject(CartService);

  // ── State ──────────────────────────────────────────────────────────────────
  items          = signal<WishlistProduct[]>([]);
  isPageLoading  = signal(true);
  removingId     = signal<string | null>(null);
  addingToCartId = signal<string | null>(null);

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadWishlist();
  }

  // ── Load ───────────────────────────────────────────────────────────────────
  loadWishlist(): void {
    this.isPageLoading.set(true);
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.items.set(res.data);
        this.isPageLoading.set(false);
      },
      error: () => this.isPageLoading.set(false),
    });
  }

  // ── Remove from wishlist ───────────────────────────────────────────────────
  onRemove(productId: string): void {
    this.removingId.set(productId);
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: () => {
        // Remove from local items signal
        this.items.update(items => items.filter(p => p._id !== productId));
        this.removingId.set(null);
      },
      error: () => this.removingId.set(null),
    });
  }

  // ── Add to cart ────────────────────────────────────────────────────────────
  onAddToCart(productId: string): void {
    this.addingToCartId.set(productId);
    this.cartService.addProductToCart(productId).subscribe({
      next: () => this.addingToCartId.set(null),
      error: () => this.addingToCartId.set(null),
    });
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  isRemoving(productId: string): boolean {
    return this.removingId() === productId;
  }

  isAddingToCart(productId: string): boolean {
    return this.addingToCartId() === productId;
  }
}