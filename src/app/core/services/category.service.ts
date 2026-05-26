import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category, CategoryResponse } from '../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient)

  getAllCategories(): Observable<CategoryResponse> {
    return this.httpClient.get<CategoryResponse>(
      `${environment.baseUrl}/api/v1/categories`
    );
  }

  getSpecificCategory(categoryId: string): Observable<{ data: Category }> {
    return this.httpClient.get<{ data: Category }>(
      `${environment.baseUrl}/api/v1/categories/${categoryId}`
    );
  }

}
