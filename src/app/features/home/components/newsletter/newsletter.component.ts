import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css',
})
export class NewsletterComponent {
  email = signal<string>('');
 
  onSubscribe(): void {
    const emailValue = this.email();
    if (emailValue) {
      // TODO: Implement newsletter subscription API call
      console.log('Subscribe email:', emailValue);
      this.email.set('');
    }
  }

}
