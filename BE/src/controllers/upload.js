import multer from 'multer';
import cloudinary from 'cloudinary';

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