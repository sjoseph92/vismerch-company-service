import { getCompanyLocations } from "@/db/locations";
import { Router, Request, Response } from "express";

const locationRoutes = Router();

locationRoutes.get("/", async (_req: Request, res: Response) => {
  const locations = await getCompanyLocations(1);
  res.send(locations);
});

export default locationRoutes;
