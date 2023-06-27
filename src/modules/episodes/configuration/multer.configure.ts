import { diskStorage } from 'multer';
import * as path from 'path';

export const MULTER_CONFIGURATION = {
  storage: diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = path.extname(file.originalname);
      const filename = `${uniqueSuffix}${extension}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const extension = path.extname(file.originalname);
    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), true);
    }
  },
};
