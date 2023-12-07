import { Coordinate, GeoJSONPoint } from "./geo";

export interface NewCompany {
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  coordinate: GeoJSONPoint;
}

export interface DBCompany {
  id: number;
  name: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  zip_code: string;
  coordinate: GeoJSONPoint;
}
export interface Company {
  id: number;
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  coordinate: Coordinate;
}
