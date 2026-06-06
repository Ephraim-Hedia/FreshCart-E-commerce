import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterModule, PageHeaderComponent],
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent {
  lastUpdated = 'January 1, 2026';
}