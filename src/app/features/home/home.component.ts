import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.interface';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/models/product.interface';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { DealBannersComponent } from './components/deal-banners/deal-banners.component';

@Component({
  selector: 'app-home',
  imports: [CategoriesSectionComponent,ProductsSectionComponent,DealBannersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly productsService = inject(ProductsService);
  
  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }
  
  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  private loadProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
    });
  }


}
