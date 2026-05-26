import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
 
  // Placeholder functions for future implementation
  onAddToWishlist(): void {
    // TODO: Implement after auth is ready
    console.log('Add to wishlist:', this.product()._id);
  }
 
  onAddToCart(): void {
    // TODO: Implement after cart service is ready
    console.log('Add to cart:', this.product()._id);
  }
 
  calculateDiscount(): number | null {
    const product = this.product();
    if (product.priceAfterDiscount && product.price) {
      return Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100
      );
    }
    return null;
  }
 
  getCurrentPrice(): number {
    const product = this.product();
    return product.priceAfterDiscount || product.price;
  }

}
