import { Component, input } from '@angular/core';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';
import { CategoryCardComponent } from '../../../../shared/ui/category-card/category-card.component';
import { Category } from '../../../../core/models/category.interface';

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [SectionHeaderComponent, CategoryCardComponent],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent {
  categories = input.required<Category[]>();
}
