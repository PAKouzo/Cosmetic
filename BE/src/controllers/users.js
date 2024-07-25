import UserService from "../services/UserService.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
const { TOKEN_SECRET } = process.env;
const UserCTL = {
    create: async(req, res)=>{
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
        const user = await UserService.create({
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
    }},


    updateUser: async(req, res)=>{
        try{
            const userId = req.params.id
            const data = req.body
            if(!userId){
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The userId is required'
                })
            }
            const response = await UserService.updateUser(userId, data)
            return res.status(200).json(response)
        }
        catch(e){
            return res.status(404).json({
                message: e
            })
        }},


        deleteUser: async(req, res)=>{
            try{
                const userId = req.params.id
                if(!userId){
                    return res.status(200).json({
                        status: 'ERR',
                        message: 'The userId is required'
                    })
                }
                const response = await UserService.deleteUser(userId, data)
                return res.status(200).json(response)
            }
            catch(e){
                return res.status(404).json({
                    message: e
                })
            }}
}

export default UserCTL;