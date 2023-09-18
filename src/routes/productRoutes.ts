import { Router, Request, Response } from "express";
import { object, string, z } from "zod";

import { getCompanyPrroducts, insertProduct } from "@/db/products";
import { Product } from "@/appTypes/products";
import { convertDBProductToProduct } from "@/utils/db";

const productRoutes = Router();

const newProductSchema = object({
  name: string(),
  gtin: string(),
  gtinType: string(),
  price: string(),
  description: string().optional(),
  image: string().optional(),
});

export type ZNewProduct = z.infer<typeof newProductSchema>;

interface ProductsPostRequest extends Request {
  body: { product: ZNewProduct; companyId: number };
}

productRoutes.post("/", async (req: ProductsPostRequest, res: Response) => {
  const result = await insertProduct(req.body.companyId, req.body.product);
  res.send(result);
});

productRoutes.get("/", async (_req: Request, res: Response) => {
  const products = await getCompanyPrroducts(1);
  const formattedResponse: APIResponse<Product[]> = {
    isSuccessful: true,
    data: products.map(convertDBProductToProduct),
  };
  res.send(formattedResponse);
});

export default productRoutes;
