import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AddressService } from '../../core/services/address.service';
import { CartData } from '../../core/models/cart.interface';
import { Address } from '../../core/models/address.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly fb             = inject(FormBuilder);
  private readonly router         = inject(Router);
  private readonly cartService    = inject(CartService);
  private readonly orderService   = inject(OrderService);
  private readonly addressService = inject(AddressService);

  // ── State ──────────────────────────────────────────────────────────────────
  cartData        = signal<CartData | null>(null);
  savedAddresses  = signal<Address[]>([]);
  selectedAddress = signal<Address | null>(null);  // chosen saved address
  showManualForm  = signal(false);                  // toggle manual entry form
  isLoading       = signal(true);
  isPlacingOrder  = signal(false);
  paymentMethod   = signal<'cash' | 'online'>('cash');

  // ── Form (manual entry) ────────────────────────────────────────────────────
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

    this.addressService.getLoggedUserAddresses().subscribe({
      next: (res) => {
        this.savedAddresses.set(res.data);
        // Auto-select first saved address if available
        if (res.data.length > 0) {
          this.selectSavedAddress(res.data[0]);
        } else {
          // No saved addresses → show manual form directly
          this.showManualForm.set(true);
        }
      },
      error: () => this.showManualForm.set(true),
    });
  }

  // ── Address selection ──────────────────────────────────────────────────────
  selectSavedAddress(address: Address): void {
    this.selectedAddress.set(address);
    this.showManualForm.set(false);
    // Pre-fill form with selected address data (used in placeOrder)
    this.addressForm.patchValue({
      city:    address.city,
      details: address.details,
      phone:   address.phone,
    });
  }

  openManualForm(): void {
    this.selectedAddress.set(null);
    this.showManualForm.set(true);
    this.addressForm.reset();
  }

  // ── Place Order ────────────────────────────────────────────────────────────
  placeOrder(): void {
    // Must have either a selected saved address or a valid manual form
    if (!this.selectedAddress() && this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    const cartId = this.cartService.cartId();
    if (!cartId) return;

    // Use selected address data or manual form data
    const addr = this.selectedAddress();
    const shippingAddress = {
      shippingAddress: {
        city:    addr ? addr.city    : this.addressForm.value.city!,
        details: addr ? addr.details : this.addressForm.value.details!,
        phone:   addr ? addr.phone   : this.addressForm.value.phone!,
      }
    };

    this.isPlacingOrder.set(true);

    if (this.paymentMethod() === 'cash') {
      this.orderService.createCashOrder(shippingAddress, cartId).subscribe({
        next: () => {
          this.cartService.cartCount.set(0);
          this.cartService.cartId.set(null);
          this.router.navigate(['/allorders']);
        },
        error: () => this.isPlacingOrder.set(false),
      });
    } else {
      this.orderService.checkoutSession(cartId, shippingAddress).subscribe({
        next: (res) => {
          window.location.href = res.session.url;
        },
        error: () => this.isPlacingOrder.set(false),
      });
    }
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  isAddressSelected(address: Address): boolean {
    return this.selectedAddress()?._id === address._id;
  }

  get canPlaceOrder(): boolean {
    return !!(this.selectedAddress() || this.addressForm.valid);
  }

  get itemsCount(): number {
    return this.cartData()?.products?.length ?? 0;
  }

  get subtotal(): number {
    return this.cartData()?.totalCartPrice ?? 0;
  }
}