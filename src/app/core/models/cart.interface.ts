// ── Nested types ───────────────────────────────────────────────────────────

export interface CartProductCategory {
    _id:   string;
    name:  string;
    slug:  string;
    image: string;
  }
  
  export interface CartProductBrand {
    _id:   string;
    name:  string;
    slug:  string;
    image: string;
  }
  
  export interface CartProductSubcategory {
    _id:      string;
    name:     string;
    slug:     string;
    category: string;
  }
  
  // ── Product nested inside a cart item ─────────────────────────────────────
  
  export interface CartProduct {
    _id:            string;
    id:             string;
    title:          string;
    slug:           string;
    quantity:       number;   // stock quantity
    imageCover:     string;
    ratingsAverage: number;
    category:       CartProductCategory;
    brand:          CartProductBrand;
    subcategory:    CartProductSubcategory[];
  }
  
  // ── Single item inside the cart ────────────────────────────────────────────
  
  export interface CartItem {
    _id:     string;   // cart item ID (used for remove/update)
    count:   number;   // quantity in cart
    price:   number;   // price per unit
    product: CartProduct;
  }
  
  // ── Cart data object ───────────────────────────────────────────────────────
  
  export interface CartData {
    _id:            string;
    cartOwner:      string;
    products:       CartItem[];
    totalCartPrice: number;
    createdAt:      string;
    updatedAt:      string;
    __v:            number;
  }
  
  // ── Shared response shape for ALL cart operations ──────────────────────────
  // (get, add, update quantity, remove item all return the same structure)
  
  export interface CartResponse {
    status:          string;
    message:         string;
    numOfCartItems:  number;
    cartId:          string | null;   // null when cart is cleared
    data:            CartData;
  }