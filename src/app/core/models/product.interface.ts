export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  ratingsAverage?: number;
  ratingsQuantity: number;
  category: ProductCategory;
  subcategory: ProductSubcategory[];
  brand: ProductBrand;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
  };
  data: Product[];
}

export interface ProductReview {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDetailsResponse {
  data: Product & {
    reviews?: ProductReview[];
  };
}