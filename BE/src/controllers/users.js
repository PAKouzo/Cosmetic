
import UserModel from "../models/users.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const { TOKEN_SECRET } = process.env;
const UserCTL = {  //Định nghĩa UserCTL để chứa các phương thức yêu cầu
    signup: async(req, res)=>{
    try{
        const { name, email, password, confirmPassword, phone } = req.body //Lấy các thông tin cần thiết từ body. Đây là các dữ liệu người dùng gửi lên đăng kí
        const hash = await hashPassword(password);
        const users = await UserModel.create({ //Sử dụng UserModel để tạo người dùng mới trong CSDL. Dùng hàm await để đợi 1 Promise hoàn thành, nó sẽ tạm dừng hàm async cho đến khi Promise được hoàn thành hoặc bị từ chối
            name,
            email,
            password: hash,
            confirmPassword,
            phone,
        });
        res.status(200).send({ //Nếu tạo người dùng thành công gửi phản hồi về
            message:"Register Successfully!",
            data: users,
        })
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }},

    login: async(req, res)=>{
        try{
            const { email, password } = req.body 
            const users = await UserModel.find({ 
                email,
                password,
            });
            const payload = {
                email: users.email,
                password: users.password
            }
            const token = jwt.sign(payload, TOKEN_SECRET, {expiresIn: '10s'});
            res.status(200).send({ token })
        }
        catch(e){
            return res.status(404).json({
                message: e,
                users: token
            })
        }},


    updateUser: async(req, res)=>{
        try{
            const {userID} = req.params //truy cập các tham số từ URL. Truy cập thông tin người dùng dựa trên userID
            const { phone, birthday, bio} = req.body;
            const users = await UserModel.findByIdAndUpdate(userID, {
                phone: phone,
                birthday: birthday,
                bio: bio,
            })
            res.status(200).send({
                message: 'Update profile successfully',
                data:users
            })
        }
        catch(e){
            return res.status(404).json({
                message: e
            })
        }},


    //     deleteUser: async(req, res)=>{
    //         try{
    //             const userId = req.params.id
    //             if(!userId){
    //                 return res.status(200).json({
    //                     status: 'ERR',
    //                     message: 'The userId is required'
    //                 })
    //             }
    //             const response = await UserService.deleteUser(userId, data)
    //             return res.status(200).json(response)
    //         }
    //         catch(e){
    //             return res.status(404).json({
    //                 message: e
    //             })
    //         }}
}

export default UserCTL;