


//     //     deleteUser: async(req, res)=>{
//     //         try{
//     //             const userId = req.params.id
//     //             if(!userId){
//     //                 return res.status(200).json({
//     //                     status: 'ERR',
//     //                     message: 'The userId is required'
//     //                 })
//     //             }
//     //             const response = await UserService.deleteUser(userId, data)
//     //             return res.status(200).json(response)
//     //         }
//     //         catch(e){
//     //             return res.status(404).json({
//     //                 message: e
//     //             })
//     //         }}
// }



import UserModel from "../models/users.js";
import { hashPassword } from "../helpers/bcryptjs.js";
import { comparePassword } from "../helpers/bcryptjs.js";
import jwt from "jsonwebtoken";

const UserCTL = { //Định nghĩa UserCTL để chứa các phương thức yêu cầu
    signup: async(req, res)=>{
    try {
      const { name, email, password, confirmPassword, phone } = req.body //Lấy các thông tin cần thiết từ body. Đây là các dữ liệu người dùng gửi lên đăng kí
      const hash = await hashPassword(password);
      const user = await UserModel.create({ //Sử dụng UserModel để tạo người dùng mới trong CSDL. Dùng hàm await để đợi 1 Promise hoàn thành, nó sẽ tạm dừng hàm async cho đến khi Promise được hoàn thành hoặc bị từ chối
        name,
        email,
        password: hash,
        confirmPassword,
        phone,
      });
      res.status(200).send({ //Nếu tạo người dùng thành công gửi phản hồi về
        message: "Register successfully!",
        data: user
      })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }},

    login: async(req, res) => {
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
            const payload = {
                id: user.id,
                email: user.email,
                password: user.password
            };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            res.status(200).send({
                message: "Login successful",
                access_token: token,
                data: payload
            });
        } catch (e) {
            return res.status(400).json({
                message: e.message,
                status: "Failed",
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userID } = req.params; // Lấy userID từ params
            const { phone, birthday, bio } = req.body;
            
            // Cập nhật thông tin người dùng
            const updatedUser = await UserModel.findByIdAndUpdate(userID, {
                phone,
                birthday,
                bio
            }, { new: true }); // { new: true } để trả về tài liệu đã được cập nhật
            
            if (!updatedUser) {
                return res.status(404).json({
                    message: 'User not found',
                    status: 'Failed',
                });
            }
            
            res.status(200).send({
                message: 'Update profile successfully',
                data: updatedUser
            });
        } catch (e) {
            return res.status(400).json({
                message: e.message,
                status: 'Failed',
            });
        }
    },
}
export default UserCTL;