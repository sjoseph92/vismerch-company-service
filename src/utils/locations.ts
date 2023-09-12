import { DBLocation, Location } from "@/appTypes/locations";

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
    created_at,
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
    coordinate,
    createdAt: created_at,
  };
};
