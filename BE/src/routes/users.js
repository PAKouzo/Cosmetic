import UserCTL from "../controllers/users.js";
import { Router } from "express";
import UserMDW from "../middlewares/users.js";
const userRouter = Router();

//general
userRouter.post('/signup', UserMDW.checkSignup, UserCTL.signup)
userRouter.post('/login', UserMDW.checkLogin, UserCTL.login)
userRouter.get("/get-by-id/:userID", UserMDW.validateToken, UserCTL.getUserByID);
userRouter.put("/update/:userID", UserMDW.validateToken, UserCTL.update);
// userRouter.post("/refresh-token", UserCTL.refreshToken)
userRouter.post('/send-mail', UserCTL.sendEmail)
//admin
userRouter.delete("/admin/delete/:userID", UserMDW.validateToken, UserMDW.isAdmin, UserCTL.delete);
userRouter.get("/admin/get-all", UserMDW.validateToken, UserMDW.isAdmin, UserCTL.getAllUser);
export default userRouter;
