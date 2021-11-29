import multer from 'multer';
import Slugify from '../../utils/Slugify';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/images');
  },
  filename: (req, file, cb) => {
    const nomeArquivo = file.originalname;
    cb(null, Slugify(nomeArquivo) + Date.now() + path.extname(nomeArquivo));
  },
});

export default multer({ storage: storage });
