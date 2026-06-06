import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/ui/page-header/page-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, FormsModule, PageHeaderComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  isSending = signal(false);
  isSent    = signal(false);

  form = {
    name:    '',
    email:   '',
    subject: '',
    message: '',
  };

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) return;
    this.isSending.set(true);
    // Static page — simulate send
    setTimeout(() => {
      this.isSending.set(false);
      this.isSent.set(true);
      this.form = { name: '', email: '', subject: '', message: '' };
      setTimeout(() => this.isSent.set(false), 4000);
    }, 1200);
  }
}