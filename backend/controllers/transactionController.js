import * as transactionService from '../services/transactionService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const addTransaction = asyncHandler(async (req, res) => {
    const transaction = await transactionService.createTransaction(req.body, req.user.id);
    return sendSuccess(res, transaction, 'تم إضافة المعاملة بنجاح', 201);
});

export const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await transactionService.getTransactions(req.user.id);
    return sendSuccess(res, transactions, 'تم جلب قائمة المعاملات بنجاح');
});