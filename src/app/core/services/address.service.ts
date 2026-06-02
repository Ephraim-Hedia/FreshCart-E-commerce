import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AddAddressDto,
  AddressListResponse,
  AddressMutationResponse,
  AddressSingleResponse,
} from '../models/address.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/api/v1/addresses`;

  // POST /api/v1/addresses
  // Body: { name, details, phone, city }
  // Response: { status, message, data: Address[] }  ← remaining addresses
  addAddress(data: AddAddressDto): Observable<AddressMutationResponse> {
    return this.httpClient.post<AddressMutationResponse>(this.baseUrl, data);
  }

  // DELETE /api/v1/addresses/:id
  // Response: { status, message, data: [] }  ← remaining addresses (may be empty)
  removeAddress(addressId: string): Observable<AddressMutationResponse> {
    return this.httpClient.delete<AddressMutationResponse>(`${this.baseUrl}/${addressId}`);
  }

  // GET /api/v1/addresses/:id
  // Response: { status, data: Address }  ← single object
  getSpecificAddress(addressId: string): Observable<AddressSingleResponse> {
    return this.httpClient.get<AddressSingleResponse>(`${this.baseUrl}/${addressId}`);
  }

  // GET /api/v1/addresses
  // Response: { results, status, data: Address[] }
  getLoggedUserAddresses(): Observable<AddressListResponse> {
    return this.httpClient.get<AddressListResponse>(this.baseUrl);
  }
}