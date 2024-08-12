import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const {EMAIL_USERNAME, EMAIL_PASSWORD} = process.env;
const configEmail = async (email) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });
    let form = await transporter.sendMail({
        from: "COSMETIC",
        to: email,
        subject: "Send email!",
        text: "Hello",
        html: "<h1>Email</h1>"
    })
    return form;
}
export default configEmail;