import { Component, computed, input, output } from '@angular/core';
import { CartItem } from '../../../../core/models/cart.interface';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {

  // ── Inputs ─────────────────────────────────────────────────────────────────
  item      = input.required<CartItem>();
  isLoading = input<boolean>(false);

  // ── Outputs ────────────────────────────────────────────────────────────────
  increase = output<void>();
  decrease = output<void>();
  remove   = output<void>();

  // ── Computed (no API calls — pure display logic) ───────────────────────────
  itemTotal = computed(() => this.item().price * this.item().count);
  sku       = computed(() => this.item().product._id.slice(-6).toUpperCase());
}