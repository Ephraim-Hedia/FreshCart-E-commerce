import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormInputComponent } from '../../shared/ui/form-input/form-input.component';
import { SocialAuthButtonsComponent } from '../../shared/ui/social-auth-buttons/social-auth-buttons.component';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormInputComponent, SocialAuthButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb          = inject(FormBuilder);
  private readonly router      = inject(Router);
  private readonly authService = inject(AuthService);

  // Only controls button state
  // Spinner  → handled globally by loadingInterceptor (NgxSpinner)
  // Errors   → handled globally by errorInterceptor  (ngx-toastr) 
  isLoading = signal(false);


  loginForm = this.fb.group({
    email:       ['', [Validators.required, Validators.email]],
    password:    ['', [Validators.required, Validators.minLength(6)]],
    keepSigned:  [false],
  });

  get emailCtrl()    { return this.loginForm.controls.email; }
  get passwordCtrl() { return this.loginForm.controls.password; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { email, password } = this.loginForm.value;

    this.authService.signIn({ email, password }).subscribe({
      next: (res) => {
        // headerInterceptor will attach this token to every subsequent request
        localStorage.setItem('freshToken', res.token); 
        this.router.navigate(['/']);
        this.authService.isLogged.set(true)
      },
      error: () => this.isLoading.set(false) // toastr already shown by interceptor
    });

    // Simulate for now
    setTimeout(() => this.isLoading.set(false), 1000);
  }

  onGoogleLogin():   void { console.log('Google login'); }
  onFacebookLogin(): void { console.log('Facebook login'); }
}
