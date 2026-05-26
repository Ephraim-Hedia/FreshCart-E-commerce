import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css',
})
export class SectionHeaderComponent {
  title = input.required<string>();
  titleHighlight = input<string>(); // Optional highlighted word
  viewAllLink = input<string>();
  viewAllText = input<string>('View All');


}
