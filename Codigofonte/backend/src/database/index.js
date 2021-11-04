import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/buchinho-cheio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Servidor MongoDB iniciado com sucesso!'))
  .catch((error) =>
    console.log(`Ocorreu o seguinte erro ao iniciar o MongoDB: ${error}`),
  );

mongoose.Promise = global.Promise;

export default mongoose;
