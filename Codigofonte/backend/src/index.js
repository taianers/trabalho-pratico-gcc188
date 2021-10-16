import express, { Router } from 'express';

const app = express();
const port = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = new Router();

router.get('/')

console.log(`Servidor rodando na porta ${port}`);
app.listen(port);