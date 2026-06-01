import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { CartData } from '../../core/models/cart.interface';
import { FormInputComponent } from '../../shared/ui/form-input/form-input.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormInputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb           = inject(FormBuilder);
  private readonly router       = inject(Router);
  private readonly cartService  = inject(CartService);
  private readonly orderService = inject(OrderService);

  // ── State ──────────────────────────────────────────────────────────────────
  cartData      = signal<CartData | null>(null);
  isLoading     = signal(true);
  isPlacingOrder = signal(false);
  paymentMethod = signal<'cash' | 'online'>('cash');

  // ── Form ───────────────────────────────────────────────────────────────────
  addressForm = this.fb.group({
    city:    ['', [Validators.required, Validators.minLength(2)]],
    details: ['', [Validators.required, Validators.minLength(5)]],
    phone:   ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });

  get cityCtrl()    { return this.addressForm.controls.city; }
  get detailsCtrl() { return this.addressForm.controls.details; }
  get phoneCtrl()   { return this.addressForm.controls.phone; }

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  // ── Place Order ────────────────────────────────────────────────────────────
  placeOrder(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    const cartId = this.cartService.cartId();
    if (!cartId) return;

    const shippingAddress = {
      shippingAddress: {
        city:    this.addressForm.value.city!,
        details: this.addressForm.value.details!,
        phone:   this.addressForm.value.phone!,
      }
    };

    this.isPlacingOrder.set(true);

    if (this.paymentMethod() === 'cash') {
      this.orderService.createCashOrder(shippingAddress, cartId).subscribe({
        next: () => {
          this.cartService.cartCount.set(0);
          this.cartService.cartId.set(null);
          this.router.navigate(['/orders']);
        },
        error: () => this.isPlacingOrder.set(false),
      });
    } else {
      this.orderService.checkoutSession(cartId, shippingAddress).subscribe({
        next: (res) => {
          // Stripe redirects to external URL
          window.location.href = res.session.url;
        },
        error: () => this.isPlacingOrder.set(false),
      });
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  get itemsCount(): number {
    return this.cartData()?.products?.length ?? 0;
  }

  get subtotal(): number {
    return this.cartData()?.totalCartPrice ?? 0;
  }
}