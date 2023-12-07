import { DBLocation, Location } from "@/appTypes/locations";
import { DBProduct, Product } from "@/appTypes/products";

export const convertDBLocationToLocation = (
  dbLocation: DBLocation
): Location => {
  const {
    id,
    name,
    brand,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
    coordinate,
  } = dbLocation;
  return {
    id,
    name,
    brand,
    addressLine1: address_line_1,
    addressLine2: address_line_2,
    city,
    state,
    zipCode: zip_code,
    coordinate: {
      lat: coordinate.coordinates?.[1],
      lng: coordinate.coordinates?.[0],
    },
  };
};

export const convertDBProductToProduct = (dbProduct: DBProduct): Product => {
  const {
    id,
    gtin,
    gtin_Type,
    name,
    description,
    price,
    image,
    company_id,
    created_at,
  } = dbProduct;
  return {
    id,
    gtin,
    gtinType: gtin_Type,
    name,
    description,
    price,
    image,
    companyId: company_id,
    createdAt: created_at,
  };
};
