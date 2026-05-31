import { Component, input, output } from '@angular/core';
import { WishlistProduct } from '../../../../core/models/wishlist.interface';

@Component({
  selector: 'app-wishlist-item',
  standalone: true,
  imports: [],
  templateUrl: './wishlist-item.component.html',
})
export class WishlistItemComponent {

  // ── Inputs ─────────────────────────────────────────────────────────────────
  product        = input.required<WishlistProduct>();
  isRemoving     = input<boolean>(false);
  isAddingToCart = input<boolean>(false);

  // ── Outputs ────────────────────────────────────────────────────────────────
  remove     = output<void>();
  addToCart  = output<void>();

  // ── Helpers ────────────────────────────────────────────────────────────────
  get hasDiscount(): boolean {
    return !!this.product().priceAfterDiscount &&
      this.product().priceAfterDiscount! < this.product().price;
  }

  get displayPrice(): number {
    return this.hasDiscount
      ? this.product().priceAfterDiscount!
      : this.product().price;
  }
}