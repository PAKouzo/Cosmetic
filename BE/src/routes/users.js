import UserCTL from "../controllers/users.js";
import { Router } from "express";
const userRouter = Router();

userRouter.post('/signup', UserCTL.signup)
userRouter.put('/update-user/:id', UserCTL.updateUser)
userRouter.put('/delete-user/:id', UserCTL.deleteUser)


export default userRouter;
