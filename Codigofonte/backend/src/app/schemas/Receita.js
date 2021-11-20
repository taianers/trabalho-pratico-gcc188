import mongoose from "../../database";

const ReceitaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    ingredientes: {
        type: String,
        require: true,
    },
    modoPreparo: {
        type: String,
        require: true,
    },
    tempoPreparo: {
        type: Number,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    qtdPorcoes: {
        type: Number,
        require: true
    },
    /* foto: [
        {
            type: String,
            require: true
        }
    ], */
    createAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Receita', ReceitaSchema);