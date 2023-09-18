import { ZNewProduct } from "@/routes/productRoutes";
import { pool } from ".";
import { DBProduct } from "@/appTypes/products";

const insertQueryText =
  "INSERT INTO products(name, gtin, gtin_type, price, description, image, company_id) VALUES($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING RETURNING id, created_at";

export const insertProducts = async (
  companyId: number,
  products: ZNewProduct[]
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText =
      "INSERT INTO products(name, gtin, gtin_type, price, description, image, company_id) VALUES($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING RETURNING id, created_at";
    for (let i = 0; i < products.length; i++) {
      const {
        name,
        gtin,
        gtinType,
        price,
        description = null,
        image = null,
      } = products[i];
      const insertResults = await client.query(queryText, [
        name,
        gtin,
        gtinType,
        price,
        description,
        image,
        companyId,
      ]);
      console.log(insertResults.rows);
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

export const insertProduct = async (
  companyId: number,
  product: ZNewProduct
) => {
  try {
    const {
      name,
      gtin,
      gtinType,
      price,
      description = null,
      image = null,
    } = product;
    const insertResults = await pool.query(insertQueryText, [
      name,
      gtin,
      gtinType,
      price,
      description,
      image,
      companyId,
    ]);

    return insertResults.rows?.[0];
  } catch (err) {
    throw err;
  }
};

export const getCompanyPrroducts = async (companyId: number) => {
  try {
    const productResults = await pool.query<DBProduct>(
      "SELECT * FROM products WHERE company_id = $1",
      [companyId]
    );

    return productResults.rows;
  } catch (err) {
    throw err;
  }
};
