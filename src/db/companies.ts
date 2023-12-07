import { NewCompany } from "@/appTypes/companies";
import { pool } from ".";
import { SuccessfulInsert } from "@/appTypes/db";

export const insertCompany = async (company: NewCompany) => {
  const { name, addressLine1, addressLine2, city, state, zipCode, coordinate } =
    company;
  try {
    const locations = await pool.query<SuccessfulInsert>(
      `
        INSERT INTO
          companies (
            name,
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
            ST_SetSRID(ST_GeomFromGeoJSON($7), 4326)
          ) RETURNING id
        `,
      [name, addressLine1, addressLine2, city, state, zipCode, coordinate]
    );

    return locations?.rows?.[0];
  } catch (err) {
    throw err;
  }
};
