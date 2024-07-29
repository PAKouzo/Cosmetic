import UserModel from "../models/users.js";

const UserMDW = {
    checkSignup: async(req, res, next)=>{
    try{
        const {name, email, password, confirmPassword, phone} = req.body;
        const user = await UserModel.findOne({ email });
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(email);
        if (user) throw new Errpr ("Email already exists");
        if(!name || !email || !password || !confirmPassword || !phone){
            throw new Error ("The input is required!")
        }
        if(isCheckEmail === false){
            throw new Error ("Email must be a true format")
        }
        if(password !== confirmPassword){
            throw new Error ("The password is equal");
        }
        next();
    }
    catch(e){
        return res.status(404).send({
            message: e,
            status: "Failed!",
        })
    }},

    checkLogin: async(req, res, next)=>{
        const { email, password } = req.body;
        try{
            const user = await UserModel.findOne({ email }); //Hàm findOne(trong Moongoose) dùng để kiểm tra xem có người dùng nào xác thực trong CSDL hay không
            if (!user) {
                throw new Error ("Incorrect email");
            }
            else{
                const verifyPassword = await bcrypt.compare( password, user.password) //dùng hàm compare để so sánh mật khẩu người dùng nhập với mật khẩu trên CSDL
                if(!verifyPassword){
                    throw new Error ("Incorrect password");
                }
            }
            
            next();
        }
        catch(e){
            return res.status(404).send({
                message: e,
                status: "Unsuccessful",
                data: null,
            })
        }},
}

export default UserMDW;