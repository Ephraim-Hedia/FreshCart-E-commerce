import { Component, input, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
})
export class FormInputComponent {

  label       = input.required<string>();
  type        = input<string>('text');
  placeholder = input<string>('');
  icon        = input<string>('');
  control     = input.required<AbstractControl>();
  hint        = input<string>('');
  rightLabel  = input<string>('');
  rightRoute  = input<string>('');
 
  showPassword = signal(false);
 
  get isPassword(): boolean { return this.type() === 'password'; }
 
  get inputType(): string {
    return this.isPassword ? (this.showPassword() ? 'text' : 'password') : this.type();
  }
 
  get ctrl(): AbstractControl { return this.control(); }
 
  get isInvalid(): boolean {
    return this.ctrl.invalid && (this.ctrl.dirty || this.ctrl.touched);
  }
 
  get errorMessage(): string {
    const e = this.ctrl.errors;
    if (!e) return '';
    if (e['required'])  return `${this.label()} is required`;
    if (e['email'])     return 'Please enter a valid email address';
    if (e['minlength']) return `Minimum ${e['minlength'].requiredLength} characters required`;
    if (e['maxlength']) return `Maximum ${e['maxlength'].requiredLength} characters allowed`;
    if (e['pattern'])   return 'Please enter a valid value';
    if (e['mismatch'])  return 'Passwords do not match';
    return 'Invalid value';
  }
 
  togglePassword(): void { this.showPassword.update(v => !v); }

}
