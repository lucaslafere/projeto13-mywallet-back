import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import joi from 'joi';
import { v4 as uuid } from 'uuid';

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

server.listen(process.env.PORT, () => {
    console.log("server rodando")
});