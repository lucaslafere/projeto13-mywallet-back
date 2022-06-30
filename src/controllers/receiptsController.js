import bcrypt, { compareSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import joi from 'joi';
import db from '../databases/mongo.js';

export async function getReceipts (req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

    try {
    const session = await db.collection("sessions").findOne({token});
    if (!session) {
        return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({
        _id: session.userId
    });
    if (user) {
        delete user.password;
        delete user.confirmPassword;
        delete user._id;
        return res.send(user);
    } else return res.sendStatus(404);
    } catch (error) {
        return res.sendStatus(500);
    }
}