import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService, ProductsQueryParams } from '../../core/services/products.service';
import { CategoryService } from '../../core/services/category.service';
import { BrandService } from '../../core/services/brand.service';
import { Product } from '../../core/models/product.interface';
import { Category } from '../../core/models/category.interface';
import { ProductCardComponent } from '../../shared/ui/product-card/product-card.component';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterModule, FormsModule, ProductCardComponent,PageHeaderComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly route            = inject(ActivatedRoute);
  private readonly productsService  = inject(ProductsService);
  private readonly categoryService  = inject(CategoryService);
  private readonly brandService     = inject(BrandService);

  // ── Data signals ───────────────────────────────────────────────────────────
  products      = signal<Product[]>([]);
  categories    = signal<Category[]>([]);
  brands        = signal<Brand[]>([]);

  // ── UI state ───────────────────────────────────────────────────────────────
  isLoading       = signal(true);
  showFilters     = signal(false); // mobile filter sidebar toggle
  viewMode        = signal<'grid' | 'list'>('grid');
  currentPage     = signal(1);
  totalPages      = signal(1);
  totalResults    = signal(0);

  // ── Filter state ──────────────────────────────────────────────────────────
  searchKeyword      = signal('');
  selectedCategories = signal<string[]>([]);
  selectedBrands     = signal<string[]>([]);
  minPrice           = signal<number | null>(null);
  maxPrice           = signal<number | null>(null);
  sortBy             = signal('');

  // ── Price quick filters ───────────────────────────────────────────────────
  priceRanges = [
    { label: 'Under 500',  max: 500 },
    { label: 'Under 1K',   max: 1000 },
    { label: 'Under 5K',   max: 5000 },
    { label: 'Under 10K',  max: 10000 },
  ];

  sortOptions = [
    { label: 'Relevance',   value: '' },
    { label: 'Price: Low',  value: 'price' },
    { label: 'Price: High', value: '-price' },
    { label: 'Top Rated',   value: '-ratingsAverage' },
    { label: 'Newest',      value: '-createdAt' },
  ];

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
    // Pre-select category from query param (e.g. navigating from categories page)
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategories.set([params['category']]);
      }
      this.loadProducts(1);
    });
  }

  // ── Load helpers ──────────────────────────────────────────────────────────
  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => this.categories.set(res.data),
    });
  }

  private loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => this.brands.set(res.data),
    });
  }

  loadProducts(page = 1): void {
    this.isLoading.set(true);
    this.currentPage.set(page);

    const query: ProductsQueryParams = {
      page,
      limit: 12,
    };

    if (this.searchKeyword().trim()) query.keyword  = this.searchKeyword().trim();
    if (this.sortBy())              query.sort      = this.sortBy();
    if (this.selectedCategories().length) query.category = this.selectedCategories().join(',');
    if (this.selectedBrands().length)     query.brand    = this.selectedBrands().join(',');
    if (this.minPrice() !== null)   query.minPrice  = this.minPrice()!;
    if (this.maxPrice() !== null)   query.maxPrice  = this.maxPrice()!;

    this.productsService.getAllProducts(query).subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.totalPages.set(res.metadata.numberOfPages);
        this.totalResults.set(res.results);
        this.isLoading.set(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => this.isLoading.set(false),
    });
  }

  // ── Search ────────────────────────────────────────────────────────────────
  onSearch(): void {
    this.loadProducts(1);
  }

  // ── Category filter ───────────────────────────────────────────────────────
  toggleCategory(id: string): void {
    this.selectedCategories.update(cats =>
      cats.includes(id) ? cats.filter(c => c !== id) : [...cats, id]
    );
    this.loadProducts(1);
  }

  isCategorySelected(id: string): boolean {
    return this.selectedCategories().includes(id);
  }

  // ── Brand filter ──────────────────────────────────────────────────────────
  toggleBrand(id: string): void {
    this.selectedBrands.update(brands =>
      brands.includes(id) ? brands.filter(b => b !== id) : [...brands, id]
    );
    this.loadProducts(1);
  }

  isBrandSelected(id: string): boolean {
    return this.selectedBrands().includes(id);
  }

  // ── Price quick filter ────────────────────────────────────────────────────
  setPriceRange(max: number): void {
    // Toggle off if already selected
    if (this.maxPrice() === max) {
      this.maxPrice.set(null);
    } else {
      this.minPrice.set(null);
      this.maxPrice.set(max);
    }
    this.loadProducts(1);
  }

  isPriceRangeActive(max: number): boolean {
    return this.maxPrice() === max;
  }

  // ── Sort ──────────────────────────────────────────────────────────────────
  onSortChange(value: string): void {
    this.sortBy.set(value);
    this.loadProducts(1);
  }

  // ── Reset filters ─────────────────────────────────────────────────────────
  resetFilters(): void {
    this.searchKeyword.set('');
    this.selectedCategories.set([]);
    this.selectedBrands.set([]);
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.sortBy.set('');
    this.loadProducts(1);
  }

  // ── Pagination ────────────────────────────────────────────────────────────
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.loadProducts(page);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    const start = Math.max(1, current - 2);
    const end   = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // ── Active filters count (for mobile badge) ───────────────────────────────
  activeFiltersCount = computed(() =>
    this.selectedCategories().length +
    this.selectedBrands().length +
    (this.maxPrice() !== null ? 1 : 0)
  );
}