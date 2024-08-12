import UserModel from "../models/users.js";
import { hashPassword } from "../helpers/bcryptjs.js";
import Token from "../helpers/token.js";
import configEmail from "../configs/nodemailer.js";

const UserCTL = {
  signup: async (req, res) => {
    try {
      const { name, email, password, confirmPassword, phone } = req.body;
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
        data: user,
      });
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
      };
      const access_token = Token.generateToken(payload, 'AT')
      const refresh_token = Token.generateToken(payload, 'RT')
      res.status(200).send({
        message: "Login successful",
        data: payload,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      return res.status(400).json({
        message: e.message,
        status: "Failed",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { userID } = req.params;
      const { phone, birthday, bio } = req.body;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userID,
        {
          phone,
          birthday,
          bio,
        },
        { new: true }
      ); 

      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found",
          status: "Failed",
        });
      }

      res.status(200).send({
        message: "Update profile successfully",
        data: updatedUser,
      });
    } catch (e) {
      return res.status(400).json({
        message: e.message,
        status: "Failed",
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { userID } = req.params; 
      const userExist = await UserModel.findById(userID);
      if (!userExist) {
        return res.status(404).json({
          message: "User not found.",
        });
      }
      await UserModel.findByIdAndDelete(userID);
      res.status(200).json({
        message: "User deleted successfully.",
      });
    } catch (e) {
      res.status(404).json({
        message: e,
      });
    }
  },
  getUserByID: async (req, res) => {
    try {
      const { userID } = req.params;
      const userExist = await UserModel.findById(userID);
      if (!userExist) {
        return res.status(404).json({
          message: "User not found.",
        });
      }
      res.status(200).json({
        userExist,
      });
    } catch (e) {
      res.status(404).json({
        message: e,
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const userData = await UserModel.find();
      if (!userData) {
        return res.status(404).json({
          message: "User data not found.",
        });
      }
      res.status(200).json({
        userData,
      });
    } catch (e) {
      res.status(404).json({
        message: e,
      });
    }
  },
  // refreshToken: async (req, res) => {
  //   try{
  //     const authHeader = req.headers["authorization"];
  //     if (!authHeader) throw new Error("Token is required!");
  //     const token = authHeader.split(" ")[1];
  //     const newAT = Token.refeshToken(token)
  //     res.status(200).send({
  //       message: 'Refresh token successfully!',
  //       token: newAT
  //     })
  //   }
  //   catch(e){
  //     res.status(401).send({
  //       message: e.message,
  //       token: null,
  //     })
  //   }
  // }
  sendEmail: async (req, res) => {
    try{
      const {email} = req.body
      // const data = await UserModel.find({email})
      if (!email) throw new Error("Email not existed!");
      const sendMail = configEmail(email);
      res.status(200).send({
        message: "Send email succesfully!",
        data: sendMail
      })
    }
    catch(e){
      res.status(401).send({
        message: e.message,
        data: null
      })
    }
  }
};
export default UserCTL;
