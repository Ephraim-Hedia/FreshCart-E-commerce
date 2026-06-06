import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterModule, PageHeaderComponent],
  templateUrl: './terms.component.html',
})
export class TermsComponent {
  lastUpdated = 'January 1, 2026';
}