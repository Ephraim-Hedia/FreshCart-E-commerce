import { Component, input } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';
import { ProductCardComponent } from '../../../../shared/ui/product-card/product-card.component';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [SectionHeaderComponent, ProductCardComponent],

  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  products = input.required<Product[]>();
}
