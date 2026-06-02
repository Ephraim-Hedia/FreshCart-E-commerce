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

interface Brand { _id: string; name: string; slug: string; image: string; }

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterModule, FormsModule, ProductCardComponent, PageHeaderComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly route           = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService    = inject(BrandService);

  // ── Data ───────────────────────────────────────────────────────────────────
  products   = signal<Product[]>([]);  // raw results from API
  categories = signal<Category[]>([]);
  brands     = signal<Brand[]>([]);

  // ── UI state ───────────────────────────────────────────────────────────────
  isLoading    = signal(true);
  showFilters  = signal(false);
  viewMode     = signal<'grid' | 'list'>('grid');
  clientPage   = signal(1);   // client-side pagination page
  readonly pageSize = 12;     // items per page

  // ── Filter state ──────────────────────────────────────────────────────────
  searchKeyword      = signal('');
  selectedCategories = signal<string[]>([]);
  selectedBrands     = signal<string[]>([]);
  minPrice           = signal<number | null>(null);
  maxPrice           = signal<number | null>(null);
  sortBy             = signal('');

  // ── Client-side keyword filter ────────────────────────────────────────────
  // API keyword is broken → filter by title, category name, brand name in browser
  filteredProducts = computed(() => {
    const kw = this.searchKeyword().toLowerCase().trim();
    if (!kw) return this.products();
    return this.products().filter(p =>
      p.title.toLowerCase().includes(kw) ||
      p.category.name.toLowerCase().includes(kw) ||
      p.brand.name.toLowerCase().includes(kw)
    );
  });

  // ── Client-side pagination on filtered results ─────────────────────────────
  totalFilteredPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredProducts().length / this.pageSize))
  );

  pagedProducts = computed(() => {
    const page  = this.clientPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  priceRanges = [
    { label: 'Under 500', max: 500 },
    { label: 'Under 1K',  max: 1000 },
    { label: 'Under 5K',  max: 5000 },
    { label: 'Under 10K', max: 10000 },
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
    this.route.queryParams.subscribe(params => {
      if (params['category']) this.selectedCategories.set([params['category']]);
      if (params['brand'])    this.selectedBrands.set([params['brand']]);
      if (params['keyword'])  this.searchKeyword.set(params['keyword']);
      this.clientPage.set(1);
      this.loadProducts();
    });
  }

  // ── Load ───────────────────────────────────────────────────────────────────
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

  loadProducts(): void {
    this.isLoading.set(true);

    const query: ProductsQueryParams = { page: 1, limit: 100 };
    // ✅ Load up to 100 products — keyword filtered client-side
    // page param removed from API call (we handle pagination client-side)
    if (this.sortBy())                    query.sort     = this.sortBy();
    if (this.selectedCategories().length) query.category = this.selectedCategories().join(',');
    if (this.selectedBrands().length)     query.brand    = this.selectedBrands().join(',');
    if (this.minPrice() !== null)         query.minPrice = this.minPrice()!;
    if (this.maxPrice() !== null)         query.maxPrice = this.maxPrice()!;

    this.productsService.getAllProducts(query).subscribe({
      next: (res) => {
        this.products.set(res.data ?? []);
        this.clientPage.set(1);   // reset to first page on new load
        this.isLoading.set(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => this.isLoading.set(false),
    });
  }

  // ── Search (client-side only) ─────────────────────────────────────────────
  onSearch(): void {
    // No API call needed — filteredProducts computed reacts instantly
  }

  // ── Filters ────────────────────────────────────────────────────────────────
  toggleCategory(id: string): void {
    this.selectedCategories.update(cats =>
      cats.includes(id) ? cats.filter(c => c !== id) : [...cats, id]
    );
    this.clientPage.set(1);
    this.loadProducts();
  }
  isCategorySelected(id: string): boolean { return this.selectedCategories().includes(id); }

  toggleBrand(id: string): void {
    this.selectedBrands.update(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id]);
    this.clientPage.set(1);
    this.loadProducts();
  }
  isBrandSelected(id: string): boolean { return this.selectedBrands().includes(id); }

  setPriceRange(max: number): void {
    this.maxPrice.set(this.maxPrice() === max ? null : max);
    if (this.maxPrice() !== null) this.minPrice.set(null);
    this.clientPage.set(1);
    this.loadProducts();
  }
  isPriceRangeActive(max: number): boolean { return this.maxPrice() === max; }

  onSortChange(value: string): void { this.sortBy.set(value); this.loadProducts(1); }

  resetFilters(): void {
    this.searchKeyword.set('');
    this.selectedCategories.set([]);
    this.selectedBrands.set([]);
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.sortBy.set('');
    this.clientPage.set(1);
    this.clientPage.set(1);
    this.loadProducts();
  }

  // ── Pagination (client-side on filteredProducts) ──────────────────────────
  goToPage(page: number): void {
    if (page < 1 || page > this.totalFilteredPages()) return;
    this.clientPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get pageNumbers(): number[] {
    const total = this.totalFilteredPages(), current = this.clientPage();
    const pages: number[] = [];
    for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) pages.push(i);
    return pages;
  }

  // ── Active filters count ───────────────────────────────────────────────────
  activeFiltersCount = computed(() =>
    this.selectedCategories().length +
    this.selectedBrands().length +
    (this.maxPrice() !== null ? 1 : 0)
  );
}