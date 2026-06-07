import {
  Component, OnInit, OnDestroy, signal, computed
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

interface HeroSlide {
  title:        string;
  subtitle:     string;
  primaryBtn:   { label: string; link: string };
  secondaryBtn: { label: string; link: string };
  gradient:     string;   // Tailwind gradient classes for overlay
}

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.css',
})
export class HeroBannerComponent implements OnInit, OnDestroy {

  currentIndex = signal(0);
  isAnimating  = signal(false);  // text entrance animation trigger

  slides: HeroSlide[] = [
    {
      title:        'Fresh Products Delivered to your Door',
      subtitle:     'Get 20% off your first order',
      primaryBtn:   { label: 'Shop Now',   link: '/shop' },
      secondaryBtn: { label: 'View Deals', link: '/shop' },
      gradient:     'from-green-500/90 to-green-400/50',
    },
    {
      title:        'Premium Quality Guaranteed',
      subtitle:     'Fresh from farm to your table',
      primaryBtn:   { label: 'Shop Now',    link: '/shop' },
      secondaryBtn: { label: 'Learn More',  link: '/shop' },
      gradient:     'from-green-600/90 to-teal-500/50',
    },
    {
      title:        'Fast & Free Delivery',
      subtitle:     'Same day delivery available',
      primaryBtn:   { label: 'Order Now',      link: '/shop' },
      secondaryBtn: { label: 'Delivery Info',  link: '/shop' },
      gradient:     'from-emerald-600/90 to-green-400/50',
    },
  ];

  private autoPlayInterval: ReturnType<typeof setInterval> | null = null;
  readonly autoPlayDelay = 4000;

  ngOnInit(): void {
    this.startAutoPlay();
    this.triggerTextAnimation();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  goTo(index: number): void {
    if (index === this.currentIndex()) return;
    this.currentIndex.set(index);
    this.triggerTextAnimation();
    this.restartAutoPlay();
  }

  prev(): void {
    const prev = (this.currentIndex() - 1 + this.slides.length) % this.slides.length;
    this.goTo(prev);
  }

  next(): void {
    const next = (this.currentIndex() + 1) % this.slides.length;
    this.goTo(next);
  }

  // ── Text entrance animation ────────────────────────────────────────────────
  private triggerTextAnimation(): void {
    this.isAnimating.set(false);
    setTimeout(() => this.isAnimating.set(true), 50);
  }

  // ── Auto-play ──────────────────────────────────────────────────────────────
  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}