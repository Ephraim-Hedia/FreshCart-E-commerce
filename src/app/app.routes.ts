import { Routes } from '@angular/router';

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
    title: "Wishlist Page"
  },
  {
    path: "checkout",
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: "Checkout Page"
  },
  {
    path: "forget-password",
    loadComponent: () => import('./features/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
    title: "Forget Password Page"
  },
  {
    path: "login",
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: "Login Page"
  },
  {
    path: "register",
    loadComponent: () => import('./features/register/register.component').then(m => m.RegisterComponent),
    title: "Register Page"
  },
  {
    path: "cart",
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    title: "Cart Page"
  },
  {
    path: "orders",
    loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent),
    title: "Orders Page"
  },
  {
    path: "**",
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: "Not Found Page"
  }
];
