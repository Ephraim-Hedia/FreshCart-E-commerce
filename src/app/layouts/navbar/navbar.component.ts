import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly pLATFORM_ID = inject(PLATFORM_ID)

  ngOnInit(): void {
    if(isPlatformBrowser(this.pLATFORM_ID))
    {
      if(localStorage.getItem('freshToken'))
      {
        this.authService.isLogged.set(true)
      }
    }
  }

  isLoggedIn = computed(()=>{
    return this.authService.isLogged()
  })
  
  isSticky = signal(false);
  showTopStrip = signal(true);
  isMobileMenuOpen = signal(false);
  searchQuery = '';
  cartItemsCount = signal(3);
  wishlistItemsCount = signal(5);
  showUserDropdown = signal(false);
  showCategoriesDropdown = signal(false);
  
  userData = signal({ name: 'sdf', email: 'sdf@gmail.com' });
 
  categories = [
    { name: 'All Categories', route: '/categories' },
    { name: 'Electronics', route: '/categories/electronics' },
    { name: "Women's Fashion", route: '/categories/womens-fashion' },
    { name: "Men's Fashion", route: '/categories/mens-fashion' },
    { name: 'Beauty & Health', route: '/categories/beauty-health' },
  ];
 
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showTopStrip.set(scrollY < 50);
    this.isSticky.set(scrollY > 50);
  }
 
  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Search:', this.searchQuery);
      // TODO: this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }
 
  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
    document.body.style.overflow = this.isMobileMenuOpen() ? 'hidden' : '';
  }
 
  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }
 
  toggleUserDropdown() { this.showUserDropdown.update(v => !v); }
  closeUserDropdown()  { this.showUserDropdown.set(false); }
 
  openCategoriesDropdown()  { this.showCategoriesDropdown.set(true); }
  closeCategoriesDropdown() { this.showCategoriesDropdown.set(false); }
 
  signOut() {
    this.authService.signOut()
    this.closeUserDropdown(); this.closeMobileMenu();
  }
  navigateToProfile()    { console.log('profile');      this.closeUserDropdown(); }
  navigateToOrders()     { console.log('orders');       this.closeUserDropdown(); }
  navigateToWishlist()   { console.log('wishlist');     this.closeUserDropdown(); }
  navigateToAddresses()  { console.log('addresses');    this.closeUserDropdown(); }
  navigateToSettings()   { console.log('settings');     this.closeUserDropdown(); }
}
