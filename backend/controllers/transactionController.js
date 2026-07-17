import * as transactionService from '../services/transactionService.js';

export const addTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
        next(error);
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionService.getTransactions();
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        next(error);
    }
};