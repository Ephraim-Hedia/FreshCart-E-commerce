import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule, DecimalPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly route          = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService    = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  // ── State ──────────────────────────────────────────────────────────────────
  product        = signal<Product | null>(null);
  relatedProducts = signal<Product[]>([]);
  isLoading      = signal(true);
  isAddingToCart = signal(false);
  isAddingToWishlist = signal(false);
  selectedImage  = signal<string>('');
  quantity       = signal(1);
  activeTab      = signal<'details' | 'reviews' | 'shipping'>('details');

  // ── Computed ───────────────────────────────────────────────────────────────
  totalPrice = computed(() => {
    const p = this.product();
    if (!p) return 0;
    const price = p.priceAfterDiscount ?? p.price;
    return price * this.quantity();
  });

  hasDiscount = computed(() => {
    const p = this.product();
    return !!p?.priceAfterDiscount && p.priceAfterDiscount < p.price;
  });

  displayPrice = computed(() => {
    const p = this.product();
    if (!p) return 0;
    return p.priceAfterDiscount ?? p.price;
  });

  stars = computed(() => {
    const avg = this.product()?.ratingsAverage ?? 0;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(avg)) return 'full';
      if (i < avg)             return 'half';
      return 'empty';
    });
  });

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadProduct(params['id']);
    });
  }

  // ── Load product ───────────────────────────────────────────────────────────
  private loadProduct(id: string): void {
    this.isLoading.set(true);
    this.quantity.set(1);
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.product.set(res.data);
        this.selectedImage.set(res.data.imageCover);
        this.loadRelatedProducts(res.data.category._id);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  // ── Load related products ─────────────────────────────────────────────────
  private loadRelatedProducts(categoryId: string): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        const related = res.data
          .filter(p => p.category._id === categoryId && p._id !== this.product()?._id)
          .slice(0, 10);
        this.relatedProducts.set(related);
      },
    });
  }

  // ── Image gallery ─────────────────────────────────────────────────────────
  selectImage(img: string): void {
    this.selectedImage.set(img);
  }

  // ── Quantity ──────────────────────────────────────────────────────────────
  increaseQty(): void {
    const max = this.product()?.quantity ?? 99;
    if (this.quantity() < max) this.quantity.update(q => q + 1);
  }

  decreaseQty(): void {
    if (this.quantity() > 1) this.quantity.update(q => q - 1);
  }

  // ── Add to cart ───────────────────────────────────────────────────────────
  addToCart(): void {
    const id = this.product()?._id;
    if (!id) return;
    this.isAddingToCart.set(true);
    this.cartService.addProductToCart(id).subscribe({
      next: () => this.isAddingToCart.set(false),
      error: () => this.isAddingToCart.set(false),
    });
  }

  // ── Add to wishlist ───────────────────────────────────────────────────────
  addToWishlist(): void {
    const id = this.product()?._id;
    if (!id) return;
    this.isAddingToWishlist.set(true);
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: () => this.isAddingToWishlist.set(false),
      error: () => this.isAddingToWishlist.set(false),
    });
  }

  // ── Related product cart ──────────────────────────────────────────────────
  addRelatedToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe();
  }
}