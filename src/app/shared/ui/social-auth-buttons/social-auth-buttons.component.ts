import { Component, output } from '@angular/core';

@Component({
  selector: 'app-social-auth-buttons',
  standalone: true,
  imports: [],
  templateUrl: './social-auth-buttons.component.html',
  styleUrl: './social-auth-buttons.component.css',
})
export class SocialAuthButtonsComponent {

  googleClick   = output<void>();
  facebookClick = output<void>();
 
  onGoogle():   void { this.googleClick.emit(); }
  onFacebook(): void { this.facebookClick.emit(); }

}
