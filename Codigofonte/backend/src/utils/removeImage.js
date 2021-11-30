import path from 'path';
import fs from 'fs';

export default (filename) => {
  if (filename) {
    const diretorio = path.resolve('./src/images');
    const caminho = path.join(diretorio, filename);

    if (fs.existsSync(caminho)) {
      fs.unlinkSync(caminho);
    }
  }
};
