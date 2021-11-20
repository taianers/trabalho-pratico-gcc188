import express from 'express';
import { Categoria, Receita } from '@/app/controllers';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/categoria', Categoria);
app.use('/receita', Receita);

console.log(`Servidor rodando na porta ${port}`);
app.listen(port);
