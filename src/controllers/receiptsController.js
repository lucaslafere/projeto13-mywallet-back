import joi from 'joi';
import db from '../databases/mongo.js';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br.js';


export async function getReceipts(req, res) {
    const user = res.locals.user
    try {
        return res.send(user);
    } catch (error) {
        return res.sendStatus(500);
    }
};
export async function createCredit(req, res) {
    const user = res.locals.user
    const session = res.locals.session
    const credit = req.body;
    const creditSchema = joi.object({
        value: joi.number().positive().precision(2).required(),
        description: joi.string().max(18).required()
    });
    const { error } = creditSchema.validate(credit, { abortEarly: false });
    if (error) return res.status(400).send(error.details);

    try {


        await db.collection("users").updateOne(
            { _id: session.userId },
            {
                $push:
                {
                    receipts: { value: credit.value, description: credit.description, type: "credit", date: dayjs().locale('pt-br').format('DD/MM') }
                }
            }
        );
        return res.sendStatus(201);

    } catch (error) {
        return res.sendStatus(500);
    }
};
export async function createDebt(req, res) {
    const user = res.locals.user
    const session = res.locals.session
    const debt = req.body;
    const debtSchema = joi.object({
        value: joi.number().positive().precision(2).required(),
        description: joi.string().max(18).required()
    });
    const { error } = debtSchema.validate(debt, { abortEarly: false });
    if (error) return res.status(400).send(error.details);

    try {

        await db.collection("users").updateOne(
            { _id: session.userId },
            {
                $push:
                {
                    receipts: { value: debt.value, description: debt.description, type: "debt", date: dayjs().locale('pt-br').format('DD/MM') }
                }
            }
        );
        return res.sendStatus(201);

    } catch (error) {
        return res.sendStatus(500);
    }
};

