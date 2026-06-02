import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly authService     = inject(AuthService);
  private readonly cartService     = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId      = inject(PLATFORM_ID);
  private readonly router          = inject(Router);

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId))
    {
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
        this.authService.email.set(localStorage.getItem('email') ?? '');
        this.authService.setUserFromToken();
 
        // ✅ Load real counts from API on every page refresh
        this.cartService.getLoggedUserCart().subscribe();
        this.wishlistService.getLoggedUserWishlist().subscribe();
      }

    }
  }

  // ── Auth state (from AuthService signals) ──────────────────────────────────
  isLoggedIn = computed(() => this.authService.isLogged());
  userData   = computed(() => this.authService.userData()); // ✅ real data from JWT
  
    // ── Cart & Wishlist counts from services (update navbar badge reactively) ──
    cartItemsCount     = computed(() => this.cartService.cartCount());
    wishlistItemsCount = computed(() => this.wishlistService.wishlistCount());


  // ── UI State ───────────────────────────────────────────────────────────────
  isSticky             = signal(false);
  showTopStrip         = signal(true);
  isMobileMenuOpen     = signal(false);
  showUserDropdown     = signal(false);
  showCategoriesDropdown = signal(false);
  searchQuery          = '';
  
  // ── Categories ─────────────────────────────────────────────────────────────
  categories = [
    { name: 'All Categories',  route: '/categories' },
    {
      name: 'Electronics',
      route: '/shop',
      queryParams: {
        category: '6439d2d167d9aa4ca970649f'
      }
    },
  
    {
      name: "Men's Fashion",
      route: '/shop',
      queryParams: {
        category: '6439d5b90049ad0b52b90048'
      }
    },
  
    {
      name: "Women's Fashion",
      route: '/shop',
      queryParams: {
        category: '6439d58a0049ad0b52b9003f'
      }
    },
    { name: 'Beauty & Health', 
      route: '/shop', 
      queryParams: {
        category: '6439d30b67d9aa4ca97064b1'
      }
    }
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
      this.router.navigate(['/shop'], { queryParams: { keyword: this.searchQuery.trim() } });
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
    this.cartService.cartCount.set(0);
    this.wishlistService.wishlistCount.set(0);
    this.closeUserDropdown();
    this.closeMobileMenu();
  }

  navigateToProfile():   void { this.router.navigate(['/profile']);             this.closeUserDropdown(); }
  navigateToOrders():    void { this.router.navigate(['/allorders']);           this.closeUserDropdown(); }
  navigateToWishlist():  void { this.router.navigate(['/wishlist']);            this.closeUserDropdown(); }
  navigateToAddresses(): void { this.router.navigate(['/profile/addresses']);   this.closeUserDropdown(); }
  navigateToSettings():  void { this.router.navigate(['/profile/settings']);    this.closeUserDropdown(); }
  
}