import UserModel from "../models/users.js";
import { comparePassword } from "../helpers/bcryptjs.js";
import Regex from "../helpers/regex.js";
import Token from "../helpers/token.js";

const UserMDW = {
  checkSignup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, phone } = req.body;
      const user = await UserModel.findOne({ email }); //Tìm ID người dùng
      const checkEmail = Regex.email(email);
      const checkPhone = Regex.phone(phone);
      const checkPassword = Regex.password(password);
      if (user) throw new Error("Email already exists!"); //Thông báo lỗi email đã tồn tại
      if (!name || !email || !password || !confirmPassword || !phone)
        throw new Error("The input is required!");
      if (password !== confirmPassword)
        throw new Error("The password is equal!"); //Kiểm tra xác nhận mật khẩu
      if (checkEmail === false) throw new Error("Email must be a true format!");
      if (checkPhone === false) throw new Error("Phone must be a true format!");
      if (checkPassword === false) throw new Error(
        "Passwords need a minimum of 8 characters, at least one uppercase letter, one lowercase letter and one number!"
      );
      next();
    } catch (e) {
      res.status(400).send({
        message: e.message,
        status: "Failed!",
      });
    }
  },
  checkLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("Incorrect email or password");
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Incorrect email or password");
      }
      next();
    } catch (e) {
      return res.status(400).send({
        message: e.message,
        status: "Failed",
      });
    }
  },
  validateToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      Token.verifyToken(token, 'AT')
    }
    else {
      res.status(401).json({ message: "Access token is missing" });
    }
    next();
  },
  isAdmin: async (req, res, next) => {
    try{
      const {id} = req.params;
      const user = await UserModel.findById(id);
      if(!user) throw new Error("User don't existed!")
      if(user.isAdmin === false) throw new Error("Unauthorize access!")
      next();
    }
    catch(e){
      res.status(401).send({
        message: e.message,
        status: false
      })
    }
  }
};
export default UserMDW;
