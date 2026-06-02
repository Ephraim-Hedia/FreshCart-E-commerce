import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AddressService } from '../../../../core/services/address.service';
import { Address, AddAddressDto } from '../../../../core/models/address.interface';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addresses.component.html',
})
export class AddressesComponent implements OnInit {
  private readonly addressService = inject(AddressService);
  private readonly fb             = inject(FormBuilder);

  // ── State ──────────────────────────────────────────────────────────────────
  addresses  = signal<Address[]>([]);
  isLoading  = signal(true);
  showForm   = signal(false);
  editingId  = signal<string | null>(null); // null = adding, string = old address ID
  isSaving   = signal(false);
  deletingId = signal<string | null>(null);

  // ── Form ───────────────────────────────────────────────────────────────────
  addressForm = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    details: ['', [Validators.required, Validators.minLength(3)]],
    phone:   ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:    ['', [Validators.required, Validators.minLength(2)]],
  });

  get nameCtrl()    { return this.addressForm.controls.name; }
  get detailsCtrl() { return this.addressForm.controls.details; }
  get phoneCtrl()   { return this.addressForm.controls.phone; }
  get cityCtrl()    { return this.addressForm.controls.city; }

  get isEditing(): boolean { return this.editingId() !== null; }

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadAddresses();
  }

  // ── Load ───────────────────────────────────────────────────────────────────
  loadAddresses(): void {
    this.isLoading.set(true);
    this.addressService.getLoggedUserAddresses().subscribe({
      next: (res) => {
        this.addresses.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  // ── Open add form ──────────────────────────────────────────────────────────
  openAddForm(): void {
    this.editingId.set(null);
    this.addressForm.reset();
    this.showForm.set(true);
  }

  // ── Open edit form ─────────────────────────────────────────────────────────
  openEditForm(address: Address): void {
    this.editingId.set(address._id); // store old ID for delete step
    this.addressForm.patchValue({
      name:    address.name,
      details: address.details,
      phone:   address.phone,
      city:    address.city,
    });
    this.showForm.set(true);
  }

  // ── Cancel form ────────────────────────────────────────────────────────────
  cancelForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
    this.addressForm.reset();
  }

  // ── Add new address ───────────────────────────────────────────────────────
  addAddress(): void {
    if (this.addressForm.invalid) { this.addressForm.markAllAsTouched(); return; }
    this.isSaving.set(true);
    const dto: AddAddressDto = this.addressForm.value as AddAddressDto;
    this.addressService.addAddress(dto).subscribe({
      next: (res) => {
        this.addresses.set(res.data);
        this.cancelForm();
        this.isSaving.set(false);
      },
      error: () => this.isSaving.set(false),
    });
  }

  // ── Update = Add new first → then Delete old ───────────────────────────────
  updateAddress(): void {
    if (this.addressForm.invalid) { this.addressForm.markAllAsTouched(); return; }
    const oldId = this.editingId()!;
    this.isSaving.set(true);
    const dto: AddAddressDto = this.addressForm.value as AddAddressDto;
    this.addressService.addAddress(dto).pipe(
      switchMap(() => this.addressService.removeAddress(oldId))
    ).subscribe({
      next: (res) => {
        this.addresses.set(res.data);
        this.cancelForm();
        this.isSaving.set(false);
      },
      error: () => this.isSaving.set(false),
    });
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  deleteAddress(addressId: string): void {
    this.deletingId.set(addressId);
    this.addressService.removeAddress(addressId).subscribe({
      next: (res) => {
        this.addresses.set(res.data);
        this.deletingId.set(null);
      },
      error: () => this.deletingId.set(null),
    });
  }

  isDeletingAddress(id: string): boolean {
    return this.deletingId() === id;
  }
}