# 🛒 FreshCart — E-Commerce Frontend

A scalable, production-ready e-commerce frontend application built with **Angular 21**, **Tailwind CSS v4**, and **Angular Signals**. FreshCart consumes a RESTful backend API to provide a complete online shopping experience — from product browsing to checkout.

---

## 🚀 Live Demo

> API Base URL: `https://ecommerce.routemisr.com`

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 21 | Core framework (standalone components) |
| Tailwind CSS | 4.x | Utility-first styling |
| Angular Signals | built-in | Reactive state management |
| Angular SSR | 21 | Server-side rendering |
| RxJS | 7.8 | HTTP & async streams |
| ngx-toastr | 20 | Toast notifications |
| ngx-spinner | 21 | Loading indicator |
| FontAwesome Free | 7.x | Icons |
| Flowbite | 4.x | UI utilities (when needed) |
| TypeScript | 5.9 | Type safety |

---

## ✨ Features

### 🛍️ Shopping
- **Home Page** — Hero banner slider (3 slides, auto-play, dots + arrows), featured products, category section, deal banners with scroll animations, newsletter with staggered entrance animation
- **Product Listing** — Grid/list view toggle, sidebar filters (category, brand, price range), client-side keyword search, sort options, client-side pagination
- **Product Details** — Image gallery with thumbnail navigation, quantity selector, add to cart/wishlist, product tabs (details, reviews, shipping), related products slider
- **Search** — Navbar search navigates to shop with keyword pre-filled; client-side filtering by title, category name, and brand name

### 🛒 Cart & Checkout
- **Shopping Cart** — Add/remove/update quantities, item totals, order summary, free shipping badge
- **Checkout** — Saved addresses selector (auto-selects first, pre-fills form), manual address entry, Cash on Delivery / Pay Online (Stripe) payment methods, sticky order summary panel
- **Orders** — Full order history, collapsible order cards showing items + delivery address + summary, status badges (Processing / On the way / Delivered)

### ❤️ Wishlist
- Add/remove products reactively, table layout with product info and stock status, one-click add to cart

### 👤 Authentication
- **Sign In** — Email/password with JWT token storage
- **Sign Up** — Full registration with password strength indicator and terms agreement
- **Forgot Password** — 3-step flow: enter email → verify reset code → set new password
- **Route Guards** — `authGuard` protects private routes, `visitorGuard` redirects logged-in users away from auth pages

### 👤 Profile & Account
- **Settings** — Update profile info (name/email/phone), read-only account info, change password with show/hide toggles and match validation
- **Addresses** — List saved delivery addresses, add new, edit (frontend: add new + delete old via `switchMap`), delete with per-item spinner

### 📄 Pages
- **Categories** — Responsive grid, click any category → shop pre-filtered
- **Brands** — Responsive grid with purple theme, click any brand → shop pre-filtered
- **Contact Us** — Contact form with 5 info cards and social links
- **Privacy Policy** — 8 articles with hover icon animation
- **Terms of Service** — 8 articles with amber notice banner
- **404 Not Found** — Giant 404 with floating cart icon and quick navigation links

---

## 🗂️ Project Architecture

```
src/app/
├── core/                          # Global services, guards, interceptors
│   ├── auth/
│   │   ├── guards/
│   │   │   ├── auth-guard.ts      # Protects private routes
│   │   │   └── visitor-guard.ts   # Redirects logged-in users
│   │   └── services/
│   │       └── auth.service.ts    # JWT auth, signals, API calls
│   ├── interceptors/
│   │   ├── header-interceptor.ts  # Attaches Bearer token to requests
│   │   ├── loading-interceptor.ts # Shows/hides NgxSpinner
│   │   └── error-interceptor.ts   # Global error toasts (SSR-safe)
│   ├── models/                    # TypeScript interfaces
│   │   ├── address.interface.ts
│   │   ├── brand.interface.ts
│   │   ├── cart.interface.ts
│   │   ├── category.interface.ts
│   │   ├── order.interface.ts
│   │   ├── product.interface.ts
│   │   └── wishlist.interface.ts
│   └── services/
│       ├── address.service.ts
│       ├── brand.service.ts
│       ├── cart.service.ts        # cartCount + cartId signals
│       ├── category.service.ts
│       ├── order.service.ts
│       ├── products.service.ts
│       └── wishlist.service.ts    # wishlistCount + wishlistIds signals
│
├── features/                      # Feature pages (all lazy-loaded)
│   ├── home/
│   │   └── components/
│   │       ├── hero-banner/       # Custom auto-play slider (no library)
│   │       ├── categories-section/
│   │       ├── products-section/
│   │       ├── deal-banners/      # Intersection Observer entrance animation
│   │       └── newsletter/        # Staggered scroll animation
│   ├── shop/                      # Filters + client-side search & pagination
│   ├── product-details/           # Gallery + tabs + related products
│   ├── cart/
│   │   └── components/cart-item/  # Dumb component
│   ├── wishlist/
│   │   └── components/wishlist-item/
│   ├── checkout/                  # Saved addresses + payment methods
│   ├── orders/                    # Expandable order history
│   ├── profile/
│   │   └── components/
│   │       ├── settings/
│   │       └── addresses/
│   ├── categories/
│   ├── brands/
│   ├── login/
│   ├── register/
│   ├── forget-password/           # 3-step password reset
│   ├── contact/
│   ├── privacy/
│   ├── terms/
│   └── not-found/
│
├── shared/
│   └── ui/                        # Reusable dumb components
│       ├── page-header/           # Gradient banner used across all pages
│       ├── product-card/          # Connects to cart + wishlist signals
│       ├── category-card/         # Links to /shop?category=id
│       ├── section-header/
│       ├── form-input/
│       ├── features-section/      # Free shipping · returns · payment · support
│       └── social-auth-buttons/
│
└── layouts/
    ├── navbar/                    # Sticky, scroll-aware, mobile drawer
    └── footer/
```

---

## 🔁 Application Routes

| Route | Component | Guard |
|---|---|---|
| `/` | HomeComponent | — |
| `/shop` | ShopComponent | — |
| `/categories` | CategoriesComponent | — |
| `/brands` | BrandsComponent | — |
| `/products/:id/:slug` | ProductDetailsComponent | — |
| `/cart` | CartComponent | `authGuard` |
| `/wishlist` | WishlistComponent | `authGuard` |
| `/checkout` | CheckoutComponent | `authGuard` |
| `/allorders` | OrdersComponent | `authGuard` |
| `/profile` → `/profile/settings` | SettingsComponent | `authGuard` |
| `/profile/addresses` | AddressesComponent | `authGuard` |
| `/login` | LoginComponent | `visitorGuard` |
| `/register` | RegisterComponent | `visitorGuard` |
| `/forget-password` | ForgetPasswordComponent | `visitorGuard` |
| `/contact` | ContactComponent | — |
| `/privacy` | PrivacyComponent | — |
| `/terms` | TermsComponent | — |
| `/**` | NotFoundComponent | — |

---

## ⚙️ State Management

All state is managed with **Angular Signals** — no NgRx or external state library.

### Global Reactive Signals

```typescript
// AuthService
isLogged = signal<boolean>(false)
userData  = signal<{ id: string; name: string; email: string }>()
email     = signal<string>('')

// CartService
cartCount = signal<number>(0)          // reactive navbar badge
cartId    = signal<string | null>(null)

// WishlistService
wishlistCount = signal<number>(0)                    // reactive navbar badge
wishlistIds   = signal<Set<string>>(new Set())       // reactive product card toggle
```

### Shop Page — Client-side Data Pipeline

```
API call (category / brand / price / sort)
    ↓
products signal          → raw results from API
    ↓
filteredProducts computed → keyword filter (title · category name · brand name)
    ↓
totalFilteredPages computed
    ↓
pagedProducts computed   → slice(start, start + pageSize)
    ↓
HTML renders pagedProducts()
```

---

## 🔒 HTTP Interceptors

| Interceptor | Behavior |
|---|---|
| `headerInterceptor` | Attaches `Authorization: Bearer <token>` to every outgoing request |
| `loadingInterceptor` | Shows NgxSpinner on request start, hides on completion |
| `errorInterceptor` | Displays `err.error.message` via ngx-toastr (browser-only, SSR-safe) |

---

## 🎨 Design System

```css
/* src/styles.css — CSS Theme Variables */
--color-primary:   #16a34a   /* green-600  */
--color-secondary: #101828   /* dark navy  */
--color-danger:    #fb2c36   /* red        */
```

### Reusable Page Header

```html
<app-page-header
  title="All Products"
  icon="fa-box-open"
  breadcrumbLabel="All Products"
  subtitle="Explore our complete product collection"
  gradient="green"   <!-- green | purple | blue | orange -->
/>
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 9+
- Angular CLI 21+

### Installation

```bash
# Clone the repository
git clone https://github.com/Ephraim-Hedia/FreshCart-E-commerce.git
cd FreshCart-E-commerce

# Install dependencies
npm install

# Start the development server
npm start
# → http://localhost:4200
```

### Available Scripts

```bash
npm start          # Development server (ng serve)
npm run build      # Production build
npm run watch      # Build and watch (development)
npm test           # Run unit tests (vitest)
npm run serve:ssr:Route_E-commerce  # Run SSR production server
```

---

## 📡 API Reference

All requests go to: `https://ecommerce.routemisr.com`

| Domain | Method | Endpoint |
|---|---|---|
| **Auth** | POST | `/api/v1/auth/signin` |
| | POST | `/api/v1/auth/signup` |
| | POST | `/api/v1/auth/forgotPasswords` |
| | POST | `/api/v1/auth/verifyResetCode` |
| | PUT | `/api/v1/auth/resetPassword` |
| **User** | PUT | `/api/v1/users/changeMyPassword` |
| | PUT | `/api/v1/users/updateMe` |
| **Products** | GET | `/api/v1/products?page&limit&sort&category&brand&price[gte]&price[lte]` |
| **Categories** | GET | `/api/v1/categories` |
| **Brands** | GET | `/api/v1/brands` |
| **Cart** | GET/POST/PUT/DELETE | `/api/v1/cart` |
| **Wishlist** | GET/POST/DELETE | `/api/v1/wishlist` |
| **Orders** | POST | `/api/v1/orders/:cartId` (cash) |
| | POST | `/api/v1/orders/checkout-session/:cartId` (online) |
| | GET | `/api/v1/orders/user/:userId` |
| **Addresses** | GET/POST/DELETE | `/api/v1/addresses` |

---

## 📐 Architecture Principles

- **Feature-based structure** — each feature owns its pages, components, services, and models
- **Standalone components** — no NgModules, fully tree-shakeable
- **Smart / Dumb separation** — smart components handle API/state; dumb components are pure UI
- **Signals over Subjects** — `signal()` and `computed()` for all reactive state
- **Lazy loading** — all feature routes use `loadComponent()` for optimal bundle splitting
- **Mobile-first** — every layout is designed mobile-first and scales up
- **Tailwind only** — no inline styles; component-scoped CSS only for animations

---

## 👨‍💻 Author

**Ephraim Hedia**
GitHub: [@Ephraim-Hedia](https://github.com/Ephraim-Hedia)

---

## 📄 License

This project is developed for educational purposes as part of the Route Academy Angular curriculum.