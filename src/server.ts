import express, { Express } from "express";
import dotenv from "dotenv";
import locationRoutes from "./routes/locationRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/locations", locationRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
