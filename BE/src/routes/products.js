import { Router } from "express";
import ProductCTL from "../controllers/products.js";
import ProductMDW from "../middlewares/products.js";
const productRouter = Router();

productRouter.post('/create', ProductMDW.checkcreate, ProductCTL.create)
productRouter.put('/updateProduct/:productID', ProductCTL.updateProduct)
productRouter.delete('/deleteProduct/:productID', ProductCTL.deleteProduct)
productRouter.get('/getProductByID/', ProductCTL.getProductByID)
export default productRouter;
