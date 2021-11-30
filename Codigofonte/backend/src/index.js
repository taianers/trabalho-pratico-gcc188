import express from 'express';
import { Categoria, Receita, Auth, Reporte } from '@/app/controllers';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/categoria', Categoria);
app.use('/receita', Receita);
app.use('/auth', Auth);
app.use('/reporte', Reporte);

console.log(`Servidor rodando na porta ${port}`);
app.listen(port);
