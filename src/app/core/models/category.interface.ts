export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CategoryResponse {
    results: number;
    metadata: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
    };
    data: Category[];
  }