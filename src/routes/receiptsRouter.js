import express from 'express';
import { getReceipts, createCredit, createDebt } from '../controllers/receiptsController.js';
import { validateUserToken } from '../middlewares/validateUser.js';

const router = express.Router();

router.get('/receipts', validateUserToken, getReceipts);
router.post('/newCredit', validateUserToken, createCredit);
router.post('/newDebt', validateUserToken, createDebt);

export default router;