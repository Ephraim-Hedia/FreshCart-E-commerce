import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  // Required
  title          = input.required<string>();
  icon           = input.required<string>();   // FontAwesome class e.g. 'fa-box-open'
  breadcrumbLabel = input.required<string>();  // e.g. 'All Products'

  // Optional
  subtitle = input<string>('');
  gradient = input<'green' | 'purple' | 'blue' | 'orange'>('green');
}