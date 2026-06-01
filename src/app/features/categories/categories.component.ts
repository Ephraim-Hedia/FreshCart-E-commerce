import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.interface';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';
import { CategoryCardComponent } from '../../shared/ui/category-card/category-card.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterModule, PageHeaderComponent, CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  categories  = signal<Category[]>([]);
  isLoading   = signal(true);

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}