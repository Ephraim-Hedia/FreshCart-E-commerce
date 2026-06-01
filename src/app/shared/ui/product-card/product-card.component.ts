import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private readonly cartService     = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  product = input.required<Product>();

  // ── Loading states ─────────────────────────────────────────────────────────
  isAddingToCart    = signal(false);
  isWishlistLoading = signal(false);

  // ── Computed ───────────────────────────────────────────────────────────────
  isWishlisted = computed(() =>
    this.wishlistService.isInWishlist(this.product()._id)
  );

  discount = computed(() => {
    const p = this.product();
    if (p.priceAfterDiscount && p.priceAfterDiscount < p.price) {
      return Math.round(((p.price - p.priceAfterDiscount) / p.price) * 100);
    }
    return null;
  });

  displayPrice = computed(() =>
    this.product().priceAfterDiscount ?? this.product().price
  );

  // ── Actions ────────────────────────────────────────────────────────────────
  onAddToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isAddingToCart.set(true);
    this.cartService.addProductToCart(this.product()._id).subscribe({
      next:  () => this.isAddingToCart.set(false),
      error: () => this.isAddingToCart.set(false),
    });
  }

  toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isWishlistLoading.set(true);
    const id = this.product()._id;
    const action$ = this.isWishlisted()
      ? this.wishlistService.removeProductFromWishlist(id)
      : this.wishlistService.addProductToWishlist(id);
    action$.subscribe({
      next:  () => this.isWishlistLoading.set(false),
      error: () => this.isWishlistLoading.set(false),
    });
  }
}