import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DealBanner {
  id:              string;
  badge:           string;
  badgeIcon:       string;
  title:           string;
  subtitle:        string;
  discount:        string;
  code:            string;
  bgColor:         string;
  buttonText:      string;
  buttonTextColor: string;
  link:            string;
}

@Component({
  selector: 'app-deal-banners',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './deal-banners.component.html',
  styleUrl: './deal-banners.component.css',
})
export class DealBannersComponent implements AfterViewInit, OnDestroy {

  @ViewChildren('bannerCard') bannerCards!: QueryList<ElementRef>;
  private observer!: IntersectionObserver;

  banners: DealBanner[] = [
    {
      id:              '1',
      badge:           'Deal of the Day',
      badgeIcon:       '🔥',
      title:           'Fresh Organic Fruits',
      subtitle:        'Get up to 40% off on selected organic fruits',
      discount:        '40% OFF',
      code:            'ORGANIC40',
      bgColor:         'bg-gradient-to-br from-emerald-500 to-emerald-700',
      buttonText:      'Shop Now',
      buttonTextColor: 'text-emerald-600',
      link:            '/shop',
    },
    {
      id:              '2',
      badge:           'New Arrivals',
      badgeIcon:       '✨',
      title:           'Exotic Vegetables',
      subtitle:        'Discover our latest collection of premium vegetables',
      discount:        '25% OFF',
      code:            'FRESH25',
      bgColor:         'bg-gradient-to-br from-orange-400 to-rose-500',
      buttonText:      'Explore Now',
      buttonTextColor: 'text-orange-500',
      link:            '/shop?sort=-createdAt',
    },
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Small staggered delay per card
            const delay = (entry.target as HTMLElement).dataset['delay'] ?? '0';
            setTimeout(() => {
              entry.target.classList.add('banner-visible');
            }, +delay);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.bannerCards.forEach(ref => this.observer.observe(ref.nativeElement));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}