import mongoose from '../../database';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
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
  isAdmin: {
    type: Boolean,
    default: false,
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

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;

//Apenas para facilitar a fase de desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  Usuario.findOne({ email: 'admin@buchinhocheio.com.br' })
    .then((res) => {
      if (!res) {
        Usuario.create({
          nome: 'Administração Buchinho Cheio',
          email: 'admin@buchinhocheio.com.br',
          senha: '12345678',
          isAdmin: true,
        }).catch(console.error);
      }
    })
    .catch(console.error);
}
