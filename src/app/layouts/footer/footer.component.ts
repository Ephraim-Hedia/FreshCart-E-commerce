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
    { label: 'All Products', route: '/shop' },
    { label: 'Categories', route: '/categories' },
    { label: 'Brands', route: '/brands' },
    {
      label: 'Electronics',
      route: '/shop',
      queryParams: {
        category: '6439d2d167d9aa4ca970649f'
      }
    },
  
    {
      label: "Men's Fashion",
      route: '/shop',
      queryParams: {
        category: '6439d5b90049ad0b52b90048'
      }
    },
  
    {
      label: "Women's Fashion",
      route: '/shop',
      queryParams: {
        category: '6439d58a0049ad0b52b9003f'
      }
    }
  ];
 
  accountLinks = [
    { label: 'My Account', route: '/profile' },
    { label: 'Order History', route: '/allorders' },
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
    { label: 'Track Order', route: '/allorders' },
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
