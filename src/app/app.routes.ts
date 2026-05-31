import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';
import { visitorGuard } from './core/auth/guards/visitor-guard';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: "Home Page"
  },
  {
    path: "shop",
    loadComponent: () => import('./features/shop/shop.component').then(m => m.ShopComponent),
    title: "Shop Page"
  },
  {
    path: "categories",
    loadComponent: () => import('./features/categories/categories.component').then(m => m.CategoriesComponent),
    title: "Categories Page"
  },
  {
    path: "brands",
    loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent),
    title: "Brands Page"
  },
  {
    path: "wishlist",
    loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent),
    title: "Wishlist Page",
    canActivate:[authGuard]
  },
  {
    path: "checkout",
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: "Checkout Page",
    canActivate:[authGuard]
  },
  {
    path: "forget-password",
    loadComponent: () => import('./features/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
    title: "Forget Password Page",
    canActivate:[visitorGuard]
  },
  {
    path: "login",
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: "Login Page",
    canActivate:[visitorGuard]
  },
  {
    path: "register",
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
    title: "Register Page",
    canActivate:[visitorGuard]
  },
  {
    path: "cart",
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    title: "Cart Page",
    canActivate:[authGuard]
  },
  {
    path: "orders",
    loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),
    title: "Orders Page",
    canActivate:[authGuard]
  },
  {
    path: "**",
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: "Not Found Page"
  }
];
