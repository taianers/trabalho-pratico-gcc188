import mongoose from '@/database';

const CategoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Categoria', CategoriaSchema);
