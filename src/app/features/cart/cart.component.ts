import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { CartData, CartItem } from '../../core/models/cart.interface';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, FormsModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  // ── State ──────────────────────────────────────────────────────────────────
  cartData         = signal<CartData | null>(null);
  isPageLoading    = signal(true);
  loadingItemId    = signal<string | null>(null);
  couponCode       = '';
  showCouponInput  = signal(false);
  isApplyingCoupon = signal(false);

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadCart();
  }

  // ── Load ───────────────────────────────────────────────────────────────────
  loadCart(): void {
    this.isPageLoading.set(true);
    this.cartService.getLoggedUserCart().subscribe({
      next:  (res) => { this.cartData.set(res.data); this.isPageLoading.set(false); },
      error: ()    => this.isPageLoading.set(false),
    });
  }

  // ── Quantity (called from child outputs) ───────────────────────────────────
  onIncrease(item: CartItem): void {
    this.updateQuantity(item.product._id, item.count + 1);
  }

  onDecrease(item: CartItem): void {
    if (item.count <= 1) return;
    this.updateQuantity(item.product._id, item.count - 1);
  }

  private updateQuantity(productId: string, count: number): void {
    this.loadingItemId.set(productId);
    this.cartService.updateCartProductQuantity(productId, count).subscribe({
      next:  (res) => { this.cartData.set(res.data); this.loadingItemId.set(null); },
      error: ()    => this.loadingItemId.set(null),
    });
  }

  // ── Remove (called from child output) ─────────────────────────────────────
  onRemove(productId: string): void {
    this.loadingItemId.set(productId);
    this.cartService.removeProductFromCart(productId).subscribe({
      next:  (res) => { this.cartData.set(res.data); this.loadingItemId.set(null); },
      error: ()    => this.loadingItemId.set(null),
    });
  }

  // ── Clear ──────────────────────────────────────────────────────────────────
  clearCart(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => this.cartData.set(res.data),
    });
  }

  // ── Coupon ─────────────────────────────────────────────────────────────────
  applyCoupon(): void {
    if (!this.couponCode.trim()) return;
    this.isApplyingCoupon.set(true);
    this.cartService.applyCouponToCart(this.couponCode).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.showCouponInput.set(false);
        this.couponCode = '';
        this.isApplyingCoupon.set(false);
      },
      error: () => this.isApplyingCoupon.set(false),
    });
  }

  // ── Helper ─────────────────────────────────────────────────────────────────
  isItemLoading(productId: string): boolean {
    return this.loadingItemId() === productId;
  }
}