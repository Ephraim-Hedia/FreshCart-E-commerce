import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormInputComponent } from '../../shared/ui/form-input/form-input.component';
import { SocialAuthButtonsComponent } from '../../shared/ui/social-auth-buttons/social-auth-buttons.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormInputComponent, SocialAuthButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly fb     = inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMsg  = signal('');

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
    this.errorMsg.set('');

    const { email, password } = this.loginForm.value;
    console.log('Login:', { email, password });

    // TODO: inject AuthService and call login()
    // this.authService.login({ email, password }).subscribe({
    //   next: () => this.router.navigate(['/']),
    //   error: (err) => {
    //     this.errorMsg.set(err.error?.message || 'Login failed. Please try again.');
    //     this.isLoading.set(false);
    //   }
    // });

    // Simulate for now
    setTimeout(() => this.isLoading.set(false), 1000);
  }

  onGoogleLogin():   void { console.log('Google login'); }
  onFacebookLogin(): void { console.log('Facebook login'); }
}
