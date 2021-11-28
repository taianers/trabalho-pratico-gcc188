import mongoose from '../../database';

const ReceitaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  ingredientes: {
    type: String,
    required: true,
  },
  modoPreparo: {
    type: String,
    required: true,
  },
  tempoPreparo: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  qtdPorcoes: {
    type: Number,
    required: true,
  },
  foto: {
    type: String,
  },
  uidCriador: {
    type: String,
    required: true,
  },
  nomeCriador: {
    type: String,
    required: true,
  },
  /* foto: [
        {
            type: String,
            required: true
        }
    ], */
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Receita', ReceitaSchema);
