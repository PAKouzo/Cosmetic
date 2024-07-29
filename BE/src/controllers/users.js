import UserModel from "../models/users.js";

const UserCTL = {  //Định nghĩa UserCTL để chứa các phương thức yêu cầu
    signup: async(req, res)=>{
    try{
        const { name, email, password, confirmPassword, phone } = req.body //Lấy các thông tin cần thiết từ body. Đây là các dữ liệu người dùng gửi lên đăng kí
        const users = await UserModel.create({ //Sử dụng UserModel để tạo người dùng mới trong CSDL. Dùng hàm await để đợi 1 Promise hoàn thành, nó sẽ tạm dừng hàm async cho đến khi Promise được hoàn thành hoặc bị từ chối
            name,
            email,
            password,
            confirmPassword,
            phone,
        });
        res.status(200).send({ //Nếu tạo người dùng thành công gửi phản hồi về
            message:"Register Successfully!",
            data: users
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
            if (!users){
                return res.status(404).send({
                    message:"User not found",
                })
            }
            res.status(200).send({ 
                message:"Login Successfully!",
                data: users
            })
        }
        catch(e){
            return res.status(404).json({
                message: e,
                users:{
                    email: users.email,
                    password: users.password
                }
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