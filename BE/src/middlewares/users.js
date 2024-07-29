


//             checkUpdateUser: async(req, res, next)=>{
//                 const authHeader = req.headers['authorization']
//                 try{
//                     const token = authHeader.split('')[1];
//                     jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
//                         if(err){
//                             console.log("JWT verification failded: ", err.message);
//                             next
//                         }
//                     })
//                 }
//                 catch(e){
//                     return res.status(404).json({
//                         message: 'Access token is missing'
//                     })
//                 }},

//                 // updateUser: async(req, res)=>{
//                 //     try{
//                 //         const userId = req.params.id
//                 //         const data = req.body
//                 //         if(!userId){
//                 //             return res.status(200).json({
//                 //                 status: 'ERR',
//                 //                 message: 'The userId is required'
//                 //             })
//                 //         }
//                 //         const response = await UserService.updateUser(userId, data)
//                 //         return res.status(200).json(response)
//                 //     }
//                 //     catch(e){
//                 //         return res.status(404).json({
//                 //             message: e
//                 //         })
//                 //     }},
// }

// export default UserMDW;

import UserModel from "../models/users.js";
import { comparePassword } from "../helpers/bcryptjs.js";

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
        checkUpdateUser: async (req, res, next) => {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).json({
                    message: 'Access token is missing',
                    status: 'Failed',
                });
            }
            
            const token = authHeader.split(' ')[1];
            
            try {
                // Xác thực token
                jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        console.log("JWT verification failed: ", err.message);
                        return res.status(401).json({
                            message: 'Invalid or expired token',
                            status: 'Failed',
                        });
                    }
                    req.user = decoded;
                    next();
                });
            } catch (e) {
                return res.status(401).json({
                    message: 'Access token is invalid',
                    status: 'Failed',
                });
            }
        },
};
export default UserMDW;