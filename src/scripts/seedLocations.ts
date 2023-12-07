import { NewLocation } from "../appTypes/locations";
import { insertLocation } from "../db/locations";
import { parse } from "csv";
import { createReadStream } from "fs";

type LocationRecord = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

const createLocation = async (newLocation: LocationRecord) => {
  const name = newLocation[0];
  const brand = newLocation[1];
  const addressLine1 = newLocation[2];
  let addressLine2: string | null = null;
  if (newLocation[3].length > 0) {
    addressLine2 = newLocation[3];
  }
  const city = newLocation[4];
  const state = newLocation[5];
  const zipCode = newLocation[6];
  const coordinate = {
    type: "Point",
    coordinates: newLocation[7]
      .split(", ")
      .map((coor) => Number(coor))
      .reverse(),
  };
  const location: NewLocation = {
    name,
    brand,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    coordinate,
  };
  await insertLocation(location);
};

export const createLocations = async () => {
  const parser = createReadStream("src/scripts/vismerch_locations.csv").pipe(
    parse({ delimiter: ",", from_line: 2 })
  );

  for await (const record of parser) {
    const location = record as LocationRecord;
    await createLocation(location);
  }
};

(async () => {
  await createLocations();
})();
