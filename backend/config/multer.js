import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "real-estate-uploads",
    resource_type: "auto", // Allows both image & video uploads
  },
});

const upload = multer({ storage });

export default upload;
