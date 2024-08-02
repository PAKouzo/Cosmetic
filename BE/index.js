import express from "express";
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import multer from 'multer';
import cloudinary from 'cloudinary';

dotenv.config();

const app = express();
const { PORT, DB_URL } = process.env;

// Khởi tạo tùy chọn lưu trữ với Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/', upload.single('image'), (req, res) => {
  const file = req.file;

  if (!file) {
      return res.status(400).json({ error: 'Không có tệp được tải lên.' });
  }

  const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  const fileName = file.originalname.split('.')[0];

  cloudinary.uploader.upload(dataUrl, {
      public_id: fileName,
      resource_type: 'image'
  }, (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Lỗi khi tải lên ảnh.' });
      }

      res.json({ message: 'Ảnh được tải lên thành công.', url: result.secure_url });
  });
});

app.use(express.json());
mongoose.connect(DB_URL).then(() => {
  console.log("Connection successful");
});
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is running!");
});
