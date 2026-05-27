import { Component } from '@angular/core';
interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css',
})
export class FeaturesSectionComponent {
  features: Feature[] = [
    {
      id: '1',
      icon: 'truck',
      title: 'Free Shipping',
      description: 'On orders over 500 EGP',
      bgColor: 'bg-green-50',
    },
    {
      id: '2',
      icon: 'refresh',
      title: 'Easy Returns',
      description: '14-day return policy',
      bgColor: 'bg-green-50',
    },
    {
      id: '3',
      icon: 'shield',
      title: 'Secure Payment',
      description: '100% secure checkout',
      bgColor: 'bg-green-50',
    },
    {
      id: '4',
      icon: 'support',
      title: '24/7 Support',
      description: 'Contact us anytime',
      bgColor: 'bg-green-50',
    },
  ];

}
