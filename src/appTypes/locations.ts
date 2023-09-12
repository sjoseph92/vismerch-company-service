export interface Location {
  id: number;
  name: string;
  brand: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  coordinate: string;
  createdAt: string;
}

export interface DBLocation {
  id: number;
  name: string;
  brand: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  zip_code: string;
  coordinate: string;
  created_at: string;
}
