import UserModel from "../models/users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
const { TOKEN_SECRET } = process.env;
const UserCTL = {
    signup: async(req, res)=>{
    try{
        const {name, email, password, confirmPassword, phone} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);  
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(email)
        if(!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: "error",
                message: "The input is required"
            })
        }
        else if(!isCheckEmail){
            return res.status(200).json({
              status: "error",
              message: "The input is email",
            });
        }else if(password !== confirmPassword){
            return res.status(200).json({
              status: "error",
              message: "The password is equal",
            });
        }
        console.log('isCheckEmail: ', isCheckEmail)
        const user = await UserModel.create({
          name,
          email,
          password: hash,
          confirmPassword,
          phone,
        });
        return res.status(200).send({
            message: "Register successfull",
            data: user
        })
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }}
}
export default UserCTL;