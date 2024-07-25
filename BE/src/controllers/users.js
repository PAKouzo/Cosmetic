import UserModel from "../models/users.js";
import { hashPassword } from "../helpers/bcryptjs.js";

const UserCTL = {
    signup: async(req, res)=>{
    try {
      const { name, email, password, confirmPassword, phone } = req.body
      const hash = await hashPassword(password);
      const user = await UserModel.create({
        name,
        email,
        password: hash,
        confirmPassword,
        phone,
      });
      res.status(200).send({
        message: "Register successfully!",
        data: user
      })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }}
}
export default UserCTL;