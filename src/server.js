import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import joi from 'joi';
import { v4 as uuid } from 'uuid';

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

server.post('/sign-up', async (req, res) => {

})
server.post('/login', async (req, res) => {

})
server.get('/receipts', async (req, res) => {

})
server.post('/newCredit', async (req, res) => {

})
server.post('/newDebt', async (req, res) => {

})

server.listen(process.env.PORT, () => {
    console.log("server rodando")
});