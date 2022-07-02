import joi from 'joi';
import db from '../databases/mongo.js';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';


export async function getReceipts(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        }
        const user = await db.collection("users").findOne({
            _id: session.userId
        });
        if (user) {
            ;
            delete user.password;
            delete user.confirmPassword;
            return res.send(user);
        } else return res.sendStatus(404);
    } catch (error) {
        return res.sendStatus(500);
    }
};
export async function createCredit(req, res) {
    const credit = req.body;
    const creditSchema = joi.object({
        value: joi.number().positive().precision(2).required(),
        description: joi.string().max(18).required()
    });
    const { error } = creditSchema.validate(credit, { abortEarly: false });
    if (error) return res.status(400).send(error.details);

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);
    if(description.length > 18) {
        return res.status(401).send("Sua descriçao deve ter no máximo 18 caracteres");
    }
    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        };
        const user = await db.collection("users").findOne({
            _id: session.userId
        });
        await db.collection("users").updateOne(
            { _id: session.userId },
            {
                $push:
                {
                    receipts: {value: credit.value, description: credit.description, type: "credit", date: dayjs().locale('pt-br').format('DD/MM')}
                }
            }
        );
        delete user.password;
        delete user.confirmPassword;
        return res.sendStatus(201);

    } catch (error) {
        return res.sendStatus(500);
    }
};
export async function createDebt(req, res) {
    const debt = req.body;
    const debtSchema = joi.object({
        value: joi.number().positive().precision(2).required(),
        description: joi.string().max(18).required()
    });
    const { error } = debtSchema.validate(debt, { abortEarly: false });
    if (error) return res.status(400).send(error.details);

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);
    if(description.length > 18) {
        return res.status(401).send("Sua descriçao deve ter no máximo 18 caracteres");
    }
    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return res.sendStatus(401);
        };
        const user = await db.collection("users").findOne({
            _id: session.userId
        });
        await db.collection("users").updateOne(
            { _id: session.userId },
            {
                $push:
                {
                    receipts: {value: debt.value, description: debt.description, type: "debt", date: dayjs().locale('pt-br').format('DD/MM')}
                }
            }
        );
        delete user.password;
        delete user.confirmPassword;
        return res.sendStatus(201);

    } catch (error) {
        return res.sendStatus(500);
    }
};