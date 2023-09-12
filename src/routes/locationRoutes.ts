import { Router, Request, Response } from "express";

import { Location } from "@/appTypes/locations";
import { getCompanyLocations } from "@/db/locations";
import { convertDBLocationToLocation } from "@/utils/locations";

const locationRoutes = Router();

locationRoutes.get("/", async (_req: Request, res: Response) => {
  const locations = await getCompanyLocations(1);
  const formattedResponse: APIResponse<Location[]> = {
    isSuccessful: true,
    data: locations.map(convertDBLocationToLocation),
  };
  res.send(formattedResponse);
});

export default locationRoutes;
