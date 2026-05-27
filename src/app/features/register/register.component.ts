import { Component, computed, inject, signal } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormInputComponent } from '../../shared/ui/form-input/form-input.component';
import { SocialAuthButtonsComponent } from '../../shared/ui/social-auth-buttons/social-auth-buttons.component';


// Custom validator: confirm password must match password
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password        = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule, FormInputComponent, SocialAuthButtonsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fb     = inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMsg  = signal('');

  registerForm = this.fb.group({
    name:            ['', [Validators.required, Validators.minLength(3)]],
    email:           ['', [Validators.required, Validators.email]],
    password:        ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)],],
    confirmPassword: ['', [Validators.required]],
    phone:           ['', [Validators.required, Validators.pattern(/^[0-9+\s\-]{7,15}$/)]],
    terms:           [false, [Validators.requiredTrue]],
  }, { validators: passwordMatchValidator() });

  get nameCtrl()            { return this.registerForm.controls.name; }
  get emailCtrl()           { return this.registerForm.controls.email; }
  get passwordCtrl()        { return this.registerForm.controls.password; }
  get confirmPasswordCtrl() { return this.registerForm.controls.confirmPassword; }
  get phoneCtrl()           { return this.registerForm.controls.phone; }

  // Password strength: 0 = empty, 1 = weak, 2 = medium, 3 = strong
  passwordStrength = computed(() => {
    const val = this.passwordCtrl.value ?? '';
    if (!val) return 0;
    let score = 0;
    if (val.length >= 8)  score++;
    if (/[0-9]/.test(val)) score++;
    if (/[!@#$%^&*]/.test(val)) score++;
    return score;
  });

  get strengthLabel(): string {
    const s = this.passwordStrength();
    if (s === 0) return '';
    if (s === 1) return 'Weak';
    if (s === 2) return 'Medium';
    return 'Strong';
  }

  get strengthColor(): string {
    const s = this.passwordStrength();
    if (s === 1) return 'text-red-500';
    if (s === 2) return 'text-yellow-500';
    return 'text-green-600';
  }

  get strengthBarColor(): string {
    const s = this.passwordStrength();
    if (s === 1) return 'bg-red-400';
    if (s === 2) return 'bg-yellow-400';
    return 'bg-green-500';
  }

  get strengthBarWidth(): string {
    const s = this.passwordStrength();
    if (s === 1) return 'w-1/3';
    if (s === 2) return 'w-2/3';
    if (s === 3) return 'w-full';
    return 'w-0';
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');

    const { name, email, password, phone } = this.registerForm.value;
    console.log('Register:', { name, email, password, phone });

    // TODO: inject AuthService and call register()
    // this.authService.register({ name, email, password, phone }).subscribe({
    //   next: () => this.router.navigate(['/login']),
    //   error: (err) => {
    //     this.errorMsg.set(err.error?.message || 'Registration failed. Please try again.');
    //     this.isLoading.set(false);
    //   }
    // });

    // Simulate for now
    setTimeout(() => this.isLoading.set(false), 1000);
  }

  onGoogleLogin():   void { console.log('Google register'); }
  onFacebookLogin(): void { console.log('Facebook register'); }
}
