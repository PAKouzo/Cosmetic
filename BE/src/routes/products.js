import { Router } from "express";
import ProductCTL from "../controllers/products.js";
const productRouter = Router();

productRouter.post('/create',  ProductCTL.create)
export default productRouter;
