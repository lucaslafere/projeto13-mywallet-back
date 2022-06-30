import joi from 'joi';
import db from '../databases/mongo.js';

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
        value: joi.number().required(),
        description: joi.string().required()
    });
    const { error } = creditSchema.validate(credit, { abortEarly: false });
    if (error) return res.status(400).send(error.details);

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

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
                    receipts: credit
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
        negativeValue: joi.number().required(),
        description: joi.string().required()
    });
    const { error } = debtSchema.validate(debt, { abortEarly: false });
    if (error) return res.status(400).send(error.details);

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

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
                    receipts: debt
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