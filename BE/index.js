import express from "express";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/database/index.js";

dotenv.config();

const app = express();
const { PORT} = process.env;

app.use(express.json());
connectDB();
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is running!");
});
