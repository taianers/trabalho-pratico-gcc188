import mongoose from '../../database';

const ReporteSchema = new mongoose.Schema({
  motivo: {
    type: String,
    required: true,
  },
  idReceita: {
    type: String,
    required: true,
  },
  nomeReceita: {
    type: String,
    required: true,
  },
  idReporter: {
    type: String,
    required: true,
  },
  nomeReporter: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Reporte', ReporteSchema);
