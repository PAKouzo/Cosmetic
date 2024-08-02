import UserModel from "../models/users.js";
import { comparePassword } from "../helpers/bcryptjs.js";
import jwt from "jsonwebtoken";

const UserMDW = {
        checkSignup: async (req, res, next) => {
            try {
            const { name, email, password, confirmPassword, phone } = req.body;
            const user = await UserModel.findOne({ email }); //Tìm ID người dùng
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Kiểm tra định dạng email
            const isCheckEmail = reg.test(email);
            if (user) throw new Error("Email already exists!"); //Thông báo lỗi email đã tồn tại 
            if (!name || !email || !password || !confirmPassword || !phone)
                throw new Error("The input is required!");
            if (password !== confirmPassword) 
                throw new Error("The password is equal!"); //Kiểm tra xác nhận mật khẩu 
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
        checkLogin: async(req, res, next) => {
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
        validateToken: async(req, res, next) => {
            const authHeader = req.headers['authorization'];
            if (authHeader) {
              const token = authHeader.split(' ')[1]; // Tách access token từ chuỗi "Bearer {access_token}"
          
              // Xác thực access token
              jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => { //Khuyến khích: không sử dụng logic jwt.verify trong try-catch vì lỗi xác thực token không đi vào trong khối catch, mà dùng thẳng callback để đảm bảo lỗi chính xác
                if (err) {
                  return res.status(401).json({ message: 'Access token is invalid' });
                } else {
                  // Lưu thông tin người dùng từ access token vào req
                  // tham số req sẽ được chuyển tiếp tới các handler tiếp theo
                  req.user = decoded; 
                  next();
                }
              });
            } else {
              res.status(401).json({ message: 'Access token is missing' });
            }
        },
};
export default UserMDW;