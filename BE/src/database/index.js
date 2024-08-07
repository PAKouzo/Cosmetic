import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const {DB_URL} = process.env

const connectDB = async () => {
    const connectString = DB_URL
    return await mongoose.connect(connectString).then(()=>{
        console.log("Connection successful!")
    });
}
export default connectDB;

