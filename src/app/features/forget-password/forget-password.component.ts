import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { FormInputComponent } from "../../shared/ui/form-input/form-input.component";


// Reuse same password match validator pattern
export function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const newPassword     = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  };
}


@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterModule, FormInputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {

  private readonly fb          = inject(FormBuilder);
  private readonly router      = inject(Router);
  private readonly authService = inject(AuthService);
 
  // Controls which step is currently shown: 1 | 2 | 3
  currentStep = signal<1 | 2 | 3>(1);
  isLoading   = signal(false);
 
  // Store email across steps (needed for resetPassword API)
  private userEmail = '';
 
  // ── Step 1: Email ──────────────────────────────────────────────────────────
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  get emailCtrl() { return this.emailForm.controls.email; }
 
  onSubmitEmail(): void {
    if (this.emailForm.invalid) { this.emailForm.markAllAsTouched(); return; }
    this.isLoading.set(true);
    const { email } = this.emailForm.value;
    this.authService.forgetPassword(email!).subscribe({
      next: () => {
        this.userEmail = email!;
        this.currentStep.set(2);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
 
  // ── Step 2: OTP / Reset Code ───────────────────────────────────────────────
  codeForm = this.fb.group({
    resetCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
  });
  get resetCodeCtrl() { return this.codeForm.controls.resetCode; }
 
  onSubmitCode(): void {
    if (this.codeForm.invalid) { this.codeForm.markAllAsTouched(); return; }
    this.isLoading.set(true);
    const { resetCode } = this.codeForm.value;
    this.authService.verifyResetCode(resetCode!).subscribe({
      next: () => {
        this.currentStep.set(3);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
 
  // ── Step 3: New Password ───────────────────────────────────────────────────
  passwordForm = this.fb.group({
    newPassword:     ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: passwordMatchValidator() });
 
  get newPasswordCtrl()     { return this.passwordForm.controls.newPassword; }
  get confirmPasswordCtrl() { return this.passwordForm.controls.confirmPassword; }
 
  onSubmitPassword(): void {
    if (this.passwordForm.invalid) { this.passwordForm.markAllAsTouched(); return; }
    this.isLoading.set(true);
    const { newPassword } = this.passwordForm.value;
    this.authService.resetPassword({
      email:       this.userEmail,
      newPassword: newPassword!,
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/login']);
      },
      error: () => this.isLoading.set(false),
    });
  }
 
  // ── Navigation helpers ─────────────────────────────────────────────────────
  goBack(): void {
    const prev = (this.currentStep() - 1) as 1 | 2 | 3;
    if (prev >= 1) this.currentStep.set(prev);
  }

}
