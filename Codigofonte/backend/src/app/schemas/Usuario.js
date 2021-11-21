import mongoose from '../../database';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  senhaResetToken: {
    type: String,
    select: false,
  },
  senhaResetTokenExpiracao: {
    type: Date,
    select: false,
  },
});
UsuarioSchema.pre('save', function (next) {
  bcrypt
    .hash(this.senha, 10)
    .then((hash) => {
      this.senha = hash;
      next();
    })
    .catch((error) => {
      console.error('Erro ao criptografar senha', error);
    });
});

export default mongoose.model('Usuario', UsuarioSchema);
