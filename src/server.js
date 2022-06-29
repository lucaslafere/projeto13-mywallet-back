import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import joi from 'joi';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

dotenv.config();
const server = express();
server.use(cors());
server.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

server.post('/sign-up', async (req, res) => {
    const user = req.body;
    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(15).required(),
        confirmPassword:joi.string().required().valid(joi.ref('password'))
    });
    const validation = signUpSchema.validate(user, { abortEarly: false });
    if (validation.error) {
        console.log(validation.error.details)
        res.status(422).send(validation.error.details);
        return;
    }
    const passwordHash = bcrypt.hashSync(user.password, 10);
    try {
        await mongoClient.connect();
        db = mongoClient.db("my-wallet");
        const collectionUsers = db.collection("users");
        const checkSameUser = await collectionUsers.findOne({email: user.email});

        if (checkSameUser) {
            res.status(409).send("Já existe um usuário cadastrado com esse email");
            return;
        }
        await collectionUsers.insertOne({...user, password: passwordHash, confirmPassword: passwordHash });
        res.sendStatus(201);
        return;
    } catch (error) {
        res.sendStatus(500);
        return;
    }

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