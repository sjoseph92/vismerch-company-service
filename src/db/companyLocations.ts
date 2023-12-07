import { pool } from ".";
import { SuccessfulInsert } from "@/appTypes/db";

export const insertCompanyLocation = async (
  companyId: number,
  locationId: number
) => {
  try {
    const results = await pool.query<SuccessfulInsert>(
      `
        INSERT INTO
          company_locations (
            company_id,
            location_id
          )
        VALUES
          (
            $1,
            $2
          ) RETURNING id
        `,
      [companyId, locationId]
    );

    return results?.rows?.[0];
  } catch (err) {
    throw err;
  }
};
