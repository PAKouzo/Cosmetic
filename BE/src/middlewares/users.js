import UserModel from "../models/users";

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
}

export default UserMDW;