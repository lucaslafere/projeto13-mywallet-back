import bcrypt, { compareSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import joi from 'joi';
import db from '../databases/mongo.js';

export async function signUp(req, res) {
    const user = req.body;
    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(15).required(),
        confirmPassword: joi.string().required().valid(joi.ref('password'))
    });
    const validation = signUpSchema.validate(user, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }
    const passwordHash = bcrypt.hashSync(user.password, 10);
    try {
        const collectionUsers = db.collection("users");
        const checkSameUser = await collectionUsers.findOne({ email: user.email });

        if (checkSameUser) {
            return res.status(409).send("Já existe um usuário cadastrado com esse email");

        }
        await collectionUsers.insertOne({ ...user, password: passwordHash, confirmPassword: passwordHash, receipts: [] });
        return res.sendStatus(201);
    } catch (error) {
        return res.sendStatus(500);
    }
}
export async function login(req, res) {
    const userLogin = req.body;
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(15).required()
    })
    try {
        const collectionUsers = db.collection("users");
        const existingUser = await collectionUsers.findOne({ email: userLogin.email });

        if (userLogin && compareSync(userLogin.password, existingUser.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: existingUser._id,
                token
            });

            return res.status(201).send({ token });

        } else { return res.status(401).send("Email e/ou senha inválidos") }

    } catch (error) {
        return res.sendStatus(500);
    }
}
