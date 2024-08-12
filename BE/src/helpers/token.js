import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { AT_SECRET, RT_SECRET } = process.env;
const Token = {
  generateToken: (document, type) => {
    const getSecretKey = type === "AT" ? AT_SECRET : RT_SECRET;
    const getExp = type === "AT" ? 30 : 3600 * 24 * 7;
    const token = jwt.sign(document, getSecretKey, { expiresIn: getExp });
    return token;
  },
  verifyToken: async (token, type) => {
    const getSecretKey = type === "AT" ? AT_SECRET : RT_SECRET;
    const verifyToken = jwt.verify(token, getSecretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Access token is invalid" });
      } else {
        req.user = decoded;
      }
    });
    return verifyToken;
  },
  // refeshToken: (token) => {
  //   jwt.verify(token, RT_SECRET, (err, decoded) => {
  //     if (err) {
  //       // return res.status(401).json({ message: "Access token is invalid" });
  //       return "Access token is invalid";
  //     } else {
  //       req.user = decoded;
  //       const {payload} = user;
  //       const newAT = Token.generateToken(payload, "AT");
  //       return newAT;
  //     }
  //   });
  // },
};
export default Token;

// type === "AT" ? AT_SECRET : RT_SECRET;
// if(type ==="AT"){
//     return AT_SECRET;
// }
// else{
//     return RT_SECRET
// }
