import { DBLocation, NewLocation } from "@/appTypes/locations";
import { pool } from ".";
import { SuccessfulInsert } from "@/appTypes/db";

export const getCompanyLocations = async (companyId: number) => {
  try {
    const locations = await pool.query<DBLocation>(
      "SELECT locations.* FROM company_locations JOIN locations ON company_locations.location_id = locations.id WHERE company_locations.company_id = $1",
      [companyId]
    );

    return locations.rows;
  } catch (err) {
    throw err;
  }
};

export const selectLocations = async () => {
  try {
    const locations = await pool.query<DBLocation>(
      `
      SELECT
          id,
          name,
          brand,
          address_line_1,
          address_line_2,
          city,
          state,
          zip_code,
          ST_AsGeoJSON (ST_Transform (coordinate, 4326))
      FROM
          locations
      `
    );
    return locations.rows;
  } catch (err) {
    throw err;
  }
};

export const insertLocation = async (location: NewLocation) => {
  const {
    name,
    brand,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    coordinate,
  } = location;
  try {
    const locations = await pool.query<SuccessfulInsert>(
      `
      INSERT INTO
        locations (
          name,
          brand,
          address_line_1,
          address_line_2,
          city,
          state,
          zip_code,
          coordinate
        )
      VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          ST_SetSRID(ST_GeomFromGeoJSON($8), 4326)
        ) RETURNING id
      `,
      [
        name,
        brand,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        coordinate,
      ]
    );

    return locations?.rows?.[0];
  } catch (err) {
    throw err;
  }
};
