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

  // ── Auth state (from AuthService signals) ──────────────────────────────────
  isLoggedIn = computed(() => this.authService.isLogged());
  userData   = computed(() => this.authService.userData()); // ✅ real data from JWT
  
  
  // ── UI State ───────────────────────────────────────────────────────────────
  isSticky             = signal(false);
  showTopStrip         = signal(true);
  isMobileMenuOpen     = signal(false);
  showUserDropdown     = signal(false);
  showCategoriesDropdown = signal(false);
  searchQuery          = '';
  
  // TODO: connect to CartService & WishlistService
  cartItemsCount     = signal(0);
  wishlistItemsCount = signal(0);
 
  // ── Categories ─────────────────────────────────────────────────────────────
  categories = [
    { name: 'All Categories',  route: '/categories' },
    { name: 'Electronics',     route: '/categories/electronics' },
    { name: "Women's Fashion", route: '/categories/womens-fashion' },
    { name: "Men's Fashion",   route: '/categories/mens-fashion' },
    { name: 'Beauty & Health', route: '/categories/beauty-health' },
  ];

 
  // ── Scroll ─────────────────────────────────────────────────────────────────
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.showTopStrip.set(scrollY < 50);
    this.isSticky.set(scrollY > 50);
  }
  
 
  // ── Search ─────────────────────────────────────────────────────────────────
  onSearch(): void {
    if (this.searchQuery.trim()) {
      // TODO: this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      console.log('Search:', this.searchQuery);
    }
  }
  
  // ── Mobile Menu ────────────────────────────────────────────────────────────  

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
    document.body.style.overflow = this.isMobileMenuOpen() ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

 
  // ── User Dropdown ──────────────────────────────────────────────────────────
  toggleUserDropdown(): void { this.showUserDropdown.update(v => !v); }
  closeUserDropdown():  void { this.showUserDropdown.set(false); }
 
  // ── Categories Dropdown ────────────────────────────────────────────────────
  openCategoriesDropdown():  void { this.showCategoriesDropdown.set(true); }
  closeCategoriesDropdown(): void { this.showCategoriesDropdown.set(false); }

 
  // ── User Actions ───────────────────────────────────────────────────────────
  signOut(): void {
    this.authService.signOut(); // clears token + userData + navigates to /
    this.closeUserDropdown();
    this.closeMobileMenu();
  }

    // TODO: replace with router.navigate() when pages are built
    navigateToProfile():   void { this.closeUserDropdown(); }
    navigateToOrders():    void { this.closeUserDropdown(); }
    navigateToWishlist():  void { this.closeUserDropdown(); }
    navigateToAddresses(): void { this.closeUserDropdown(); }
    navigateToSettings():  void { this.closeUserDropdown(); }
  
}
