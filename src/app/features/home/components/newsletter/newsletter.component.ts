import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('newsletterSection') sectionRef!: ElementRef;
  private observer!: IntersectionObserver;

  email = signal<string>('');

  ngAfterViewInit(): void {
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
      // TODO: Implement newsletter subscription API call
      console.log('Subscribe email:', emailValue);
      this.email.set('');
    }
  }
}