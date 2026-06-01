import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandService } from '../../core/services/brand.service';
import { Brand } from '../../core/models/brand.interface';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterModule, PageHeaderComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  brands    = signal<Brand[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe({
      next: (res) => {
        this.brands.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}