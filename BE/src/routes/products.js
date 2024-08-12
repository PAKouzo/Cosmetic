import { Router } from "express";
import ProductCTL from "../controllers/products.js";
import ProductMDW from "../middlewares/products.js";
import UserMDW from "../middlewares/users.js";
const productRouter = Router();

//general
productRouter.post("/create", UserMDW.validateToken, ProductMDW.checkCreate, ProductCTL.create);
productRouter.put("/update/:productID", UserMDW.validateToken, ProductCTL.update);
productRouter.delete("/delete/:productID", UserMDW.validateToken, ProductCTL.delete);
productRouter.get("/get-by-id/:productID", UserMDW.validateToken, ProductCTL.getProductByID);
productRouter.put("/wishlist/:userID", UserMDW.validateToken, ProductCTL.addToWishlist);
productRouter.post("/rating/:productID", UserMDW.validateToken, ProductCTL.rating);


//admin
productRouter.get("/get-all", UserMDW.validateToken, UserMDW.isAdmin, ProductCTL.getAllProduct);

export default productRouter;

//thêm chức năng lấy tất cả sản phẩm của từng user