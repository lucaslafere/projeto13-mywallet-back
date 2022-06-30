import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { signUp, login } from './controllers/userController.js';
import { getReceipts, createCredit, createDebt } from './controllers/receiptsController.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

server.post('/sign-up', signUp);

server.post('/login', login);

server.get('/receipts', getReceipts);

server.post('/newCredit', createCredit);

server.post('/newDebt', createDebt);

server.listen(process.env.PORT);