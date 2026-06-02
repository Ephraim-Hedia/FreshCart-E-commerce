// ── Address object (from all responses) ───────────────────────────────────
export interface Address {
    _id:     string;
    name:    string;    // label e.g. "Home", "Work"
    details: string;    // street details
    phone:   string;
    city:    string;
  }
  
  // ── Request body for add ───────────────────────────────────────────────────
  export interface AddAddressDto {
    name:    string;
    details: string;
    phone:   string;
    city:    string;
  }
  
  // ── GET /api/v1/addresses → all addresses ─────────────────────────────────
  export interface AddressListResponse {
    status:  string;
    results: number;
    data:    Address[];
  }
  
  // ── POST /api/v1/addresses → add address ──────────────────────────────────
  // ── DELETE /api/v1/addresses/:id → remove address ─────────────────────────
  // Both return same shape — data is remaining addresses array
  export interface AddressMutationResponse {
    status:  string;
    message: string;
    data:    Address[];  // remaining addresses after add/remove
  }
  
  // ── GET /api/v1/addresses/:id → single address ────────────────────────────
  export interface AddressSingleResponse {
    status: string;
    data:   Address;    // single object, NOT array
  }