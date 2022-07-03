import db from '../databases/mongo.js';

async function validateUserToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    }
    const user = await db.collection("users").findOne({
        _id: session.userId
    });
    if (!user) return res.sendStatus(401);
    delete user.password;
    delete user.confirmPassword;
    res.locals.user = user;
    res.locals.session = session;
    next();
}


export {validateUserToken}