import { Router } from "express";
import userRouter from "./users.js";
import productRouter from "./products.js";
import orderRouter from "./order.js";

const router = Router();

router.use('/auth', userRouter)
router.use('/products', productRouter)
router.use('/order', orderRouter)
export default router;