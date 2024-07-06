import UserCTL from "../controllers/users.js";
import { Router } from "express";
const userRouter = Router();

userRouter.post('/signup', UserCTL.signup)

export default userRouter;
