import { Component, signal } from '@angular/core';

// Placeholder interface — will be replaced with real model when AddressesService is implemented
export interface Address {
  _id:     string;
  name:    string;
  details: string;
  phone:   string;
  city:    string;
}

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [],
  templateUrl: './addresses.component.html',
})
export class AddressesComponent {
  // ── Placeholder state ──────────────────────────────────────────────────────
  // TODO: Replace with real AddressesService when implemented
  addresses = signal<Address[]>([]);
  isLoading = signal(false);

  // These will be wired to the service when ready
  onAddAddress():    void { /* TODO */ }
  onEditAddress(id: string):   void { /* TODO */ }
  onDeleteAddress(id: string): void { /* TODO */ }
}