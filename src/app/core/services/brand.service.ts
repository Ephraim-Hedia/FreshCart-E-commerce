import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Brand, BrandResponse } from '../models/brand.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly httpClient = inject(HttpClient);

  getAllBrands(): Observable<BrandResponse> {
    return this.httpClient.get<BrandResponse>(
      `${environment.baseUrl}/api/v1/brands`
    );
  }

  getSpecificBrand(brandId: string): Observable<{ data: Brand }> {
    return this.httpClient.get<{ data: Brand }>(
      `${environment.baseUrl}/api/v1/brands/${brandId}`
    );
  }
}