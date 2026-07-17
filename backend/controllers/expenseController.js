import * as expenseService from '../services/expenseService.js';

export const createExpense = async (req, res, next) => {
    try {
        const expense = await expenseService.addExpense(req.body);
        res.status(201).json({ success: true, data: expense });
    } catch (error) {
        next(error);
    }
};