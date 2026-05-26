import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  shopLinks = [
    { label: 'All Products', route: '/products' },
    { label: 'Categories', route: '/categories' },
    { label: 'Brands', route: '/brands' },
    { label: 'Electronics', route: '/products?category=electronics' },
    { label: "Men's Fashion", route: '/products?category=mens-fashion' },
    { label: "Women's Fashion", route: '/products?category=womens-fashion' },
  ];
 
  accountLinks = [
    { label: 'My Account', route: '/account' },
    { label: 'Order History', route: '/orders' },
    { label: 'Wishlist', route: '/wishlist' },
    { label: 'Shopping Cart', route: '/cart' },
    { label: 'Sign In', route: '/login' },
    { label: 'Create Account', route: '/register' },
  ];
 
  supportLinks = [
    { label: 'Contact Us', route: '/contact' },
    { label: 'Help Center', route: '/help' },
    { label: 'Shipping Info', route: '/shipping' },
    { label: 'Returns & Refunds', route: '/returns' },
    { label: 'Track Order', route: '/track-order' },
  ];
 
  legalLinks = [
    { label: 'Privacy Policy', route: '/privacy' },
    { label: 'Terms of Service', route: '/terms' },
    { label: 'Cookie Policy', route: '/cookies' },
  ];
 
  socialLinks = [
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Twitter', icon: 'twitter', url: '#' },
    { name: 'Instagram', icon: 'instagram', url: '#' },
    { name: 'YouTube', icon: 'youtube', url: '#' },
  ];

}
