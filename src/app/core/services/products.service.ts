import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductDetailsResponse, ProductsResponse } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly httpClient = inject(HttpClient)

  getAllProducts(): Observable<ProductsResponse> {
    return this.httpClient.get<ProductsResponse>(
      `${environment.baseUrl}/api/v1/products`
    );
  }
 
  getSpecificProduct(productId: string): Observable<ProductDetailsResponse> {
    return this.httpClient.get<ProductDetailsResponse>(
      `${environment.baseUrl}/api/v1/products/${productId}`
    );
  }

}
