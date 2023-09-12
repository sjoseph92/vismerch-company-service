import { Location } from "@/appTypes/locations";
import { pool } from ".";

export const getCompanyLocations = async (companyId: number) => {
  try {
    const locations = await pool.query<Location>(
      "SELECT locations.* FROM company_locations JOIN locations ON company_locations.location_id = locations.id WHERE company_locations.company_id = $1",
      [companyId]
    );

    return locations.rows;
  } catch (err) {
    throw err;
  }
};
