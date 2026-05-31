import { Product } from './product.interface';

// Wishlist items are full Product objects (from GET /api/v1/wishlist)
export type WishlistProduct = Product;

// GET /api/v1/wishlist → returns full product objects
export interface WishlistResponse {
  status: string;
  count:  number;
  data:   WishlistProduct[];
}

// POST & DELETE /api/v1/wishlist → returns only product IDs
export interface WishlistMutationResponse {
  status:  string;
  message: string;
  data:    string[]; // array of product IDs only, not full products
}