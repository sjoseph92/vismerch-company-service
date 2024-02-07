export interface Product {
  id: number;
  gtin: string;
  gtinType: string;
  name: string;
  description: string;
  price: string;
  image: string;
  companyId: number;
  createdAt: Date;
}

export interface DBProduct {
  id: number;
  gtin: string;
  gtin_Type: string;
  name: string;
  description: string;
  price: string;
  image: string;
  expirationDate: Date;
  company_id: number;
  created_at: Date;
}
