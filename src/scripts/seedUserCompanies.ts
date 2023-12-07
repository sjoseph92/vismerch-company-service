import { insertUserCompany } from "../db/userCompanies";

export const createUserCompanies = async () => {
  const { id } = await insertUserCompany(1, 1);
  console.log(id);
  return;
};

(async () => {
  await createUserCompanies();
})();
