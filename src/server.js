import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import joi from 'joi';
import { v4 as uuid } from 'uuid';
import bcrypt, { compareSync } from 'bcrypt';
import { signUp, login } from './controllers/userController.js';
import { getReceipts  } from './controllers/receiptsController.js';
import db from './databases/mongo.js';

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

server.post('/sign-up', signUp);

server.post('/login', login);

// receipts should send credit and debt data, not user data, fix in controller
server.get('/receipts', getReceipts);

server.post('/newCredit', async (req, res) => {

})
server.post('/newDebt', async (req, res) => {

})

server.listen(process.env.PORT, () => {
    console.log("server rodando")
});