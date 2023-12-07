import { NewCompany } from "../appTypes/companies";
import { insertCompany } from "../db/companies";
import { insertCompanyLocation } from "../db/companyLocations";
import { selectLocations } from "../db/locations";

const companyA: NewCompany = {
  name: "Company A",
  addressLine1: "13 Hampden Ct",
  addressLine2: null,
  city: "Charleston",
  state: "SC",
  zipCode: "29403",
  coordinate: {
    type: "point",
    coordinates: [-79.9367013879246, 32.79533649295389],
  },
};

export const createCompanies = async () => {
  const { id } = await insertCompany(companyA);
  const locations = await selectLocations();
  for (let i = 0; i < locations.length; i++) {
    const currLocation = locations[i];
    await insertCompanyLocation(id, currLocation.id);
  }
};

(async () => {
  await createCompanies();
})();
