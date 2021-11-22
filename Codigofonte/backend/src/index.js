import express from 'express';
import { Categoria, Auth } from '@/app/controllers';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/categoria', Categoria);
app.use('/auth', Auth);

console.log(`Servidor rodando na porta ${port}`);
app.listen(port);
