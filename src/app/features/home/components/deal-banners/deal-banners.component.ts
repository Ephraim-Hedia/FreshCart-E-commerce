import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


interface DealBanner {
  id: string;
  badge: string;
  badgeIcon: string;
  title: string;
  subtitle: string;
  discount: string;
  code: string;
  bgColor: string;
  buttonText: string;
  buttonTextColor: string;
  link: string;
}
 

@Component({
  selector: 'app-deal-banners',
  imports: [RouterLink],
  templateUrl: './deal-banners.component.html',
  styleUrl: './deal-banners.component.css',
})
export class DealBannersComponent {
  banners: DealBanner[] = [
    {
      id: '1',
      badge: 'Deal of the Day',
      badgeIcon: '🔥',
      title: 'Fresh Organic Fruits',
      subtitle: 'Get up to 40% off on selected organic fruits',
      discount: '40% OFF',
      code: 'ORGANIC40',
      bgColor: 'bg-gradient-to-br from-green-500 via-green-600 to-teal-600',
      buttonText: 'Shop Now',
      buttonTextColor: 'text-green-600',
      link: '/products',
    },
    {
      id: '2',
      badge: 'New Arrivals',
      badgeIcon: '✨',
      title: 'Exotic Vegetables',
      subtitle: 'Discover our latest collection of premium vegetables',
      discount: '25% OFF',
      code: 'FRESH25',
      bgColor: 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-500',
      buttonText: 'Explore Now',
      buttonTextColor: 'text-orange-600',
      link: '/products',
    },
  ];


}
