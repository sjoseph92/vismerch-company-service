import { pool } from ".";
import { SuccessfulInsert } from "@/appTypes/db";

export const insertUserCompany = async (userId: number, companyId: number) => {
  try {
    const results = await pool.query<SuccessfulInsert>(
      `
        INSERT INTO
          user_companies (
            user_id,
            company_id
          )
        VALUES
          (
            $1,
            $2
          ) RETURNING id
        `,
      [userId, companyId]
    );

    return results?.rows?.[0];
  } catch (err) {
    throw err;
  }
};
