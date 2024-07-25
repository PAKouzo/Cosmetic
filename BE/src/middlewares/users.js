import UserModel from "../models/users.js";
import { comparePassword } from "../helpers/bcryptjs.js";

const UserMDW = {
  checkSignup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, phone } = req.body;
      //find user by id
      const user = await UserModel.findOne({ email });
      //check the format of email
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isCheckEmail = reg.test(email);
      //throw error
      if (user) throw new Error("Email already exists!");
      if (!name || !email || !password || !confirmPassword || !phone)
        throw new Error("The input is required!");
      //check the accuracy of password and confirmPassword
      if (password !== confirmPassword)
        throw new Error("The password is equal!");
      if (isCheckEmail === false)
        throw new Error("Email must be a true format!");
      next();
    } catch (e) {
      res.status(400).send({
        message: e.message,
        status: "Failed!",
      });
    }
  },
};
export default UserMDW;
