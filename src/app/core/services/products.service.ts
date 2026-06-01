import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductDetailsResponse, ProductsResponse } from '../models/product.interface';

export interface ProductsQueryParams {
  keyword?:   string;
  page?:      number;
  limit?:     number;
  sort?:      string;
  category?:  string;
  brand?:     string;
  minPrice?:  number;
  maxPrice?:  number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(query: ProductsQueryParams = {}): Observable<ProductsResponse> {
    let params = new HttpParams();
    if (query.keyword)  params = params.set('keyword',          query.keyword);
    if (query.page)     params = params.set('page',             query.page);
    if (query.limit)    params = params.set('limit',            query.limit);
    if (query.sort)     params = params.set('sort',             query.sort);
    if (query.category) params = params.set('category[in]',     query.category);
    if (query.brand)    params = params.set('brand[in]',        query.brand);
    if (query.minPrice) params = params.set('price[gte]',       query.minPrice);
    if (query.maxPrice) params = params.set('price[lte]',       query.maxPrice);

    return this.httpClient.get<ProductsResponse>(
      `${environment.baseUrl}/api/v1/products`, { params }
    );
  }

  getSpecificProduct(productId: string): Observable<ProductDetailsResponse> {
    return this.httpClient.get<ProductDetailsResponse>(
      `${environment.baseUrl}/api/v1/products/${productId}`
    );
  }
}