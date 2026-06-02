import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';

// Password match validator
function passwordMatchValidator(group: import('@angular/forms').AbstractControl) {
  const password = group.get('password')?.value;
  const rePassword = group.get('rePassword')?.value;
  if (password && rePassword && password !== rePassword) {
    group.get('rePassword')?.setErrors({ mismatch: true });
    return { mismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  private readonly fb          = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  // ── State ──────────────────────────────────────────────────────────────────
  isSavingProfile   = signal(false);
  isChangingPassword = signal(false);
  showCurrentPw     = signal(false);
  showNewPw         = signal(false);
  showConfirmPw     = signal(false);

  // ── Computed from auth signal ──────────────────────────────────────────────
  userData = this.authService.userData;

  // ── Profile form ───────────────────────────────────────────────────────────
  profileForm = this.fb.group({
    name:  ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });

  get nameCtrl()  { return this.profileForm.controls.name; }
  get emailCtrl() { return this.profileForm.controls.email; }
  get phoneCtrl() { return this.profileForm.controls.phone; }

  // ── Password form ──────────────────────────────────────────────────────────
  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    password:        ['', [Validators.required, Validators.minLength(6)]],
    rePassword:      ['', [Validators.required]],
  }, { validators: passwordMatchValidator });

  get currentPasswordCtrl() { return this.passwordForm.controls.currentPassword; }
  get passwordCtrl()        { return this.passwordForm.controls.password; }
  get rePasswordCtrl()      { return this.passwordForm.controls.rePassword; }

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    // Pre-fill profile form from current auth state
    this.profileForm.patchValue({
      name:  this.authService.userData().name,
      email: this.authService.userData().email,
    });
  }

  // ── Save profile ───────────────────────────────────────────────────────────
  saveProfile(): void {
    if (this.profileForm.invalid) { this.profileForm.markAllAsTouched(); return; }
    this.isSavingProfile.set(true);
    this.authService.updateLoggedUserData(this.profileForm.value).subscribe({
      next: (res) => {
        // Update userData signal with new values
        this.authService.userData.update(u => ({
          ...u,
          name:  this.profileForm.value.name  ?? u.name,
          email: this.profileForm.value.email ?? u.email,
        }));
        this.isSavingProfile.set(false);
      },
      error: () => this.isSavingProfile.set(false),
    });
  }

  // ── Change password ────────────────────────────────────────────────────────
  changePassword(): void {
    if (this.passwordForm.invalid) { this.passwordForm.markAllAsTouched(); return; }
    this.isChangingPassword.set(true);
    this.authService.updateLoggedUserPassword(this.passwordForm.value).subscribe({
      next: () => {
        this.passwordForm.reset();
        this.isChangingPassword.set(false);
      },
      error: () => this.isChangingPassword.set(false),
    });
  }
}