import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent implements AfterViewInit, OnDestroy {

  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('newsletterSection') sectionRef!: ElementRef;
  private observer!: IntersectionObserver;

  email = signal<string>('');

  ngAfterViewInit(): void {
    // IntersectionObserver is browser-only — skip during SSR pre-rendering
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('newsletter-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    this.observer.observe(this.sectionRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onSubscribe(): void {
    const emailValue = this.email();
    if (emailValue) {
      console.log('Subscribe email:', emailValue);
      this.email.set('');
    }
  }
}