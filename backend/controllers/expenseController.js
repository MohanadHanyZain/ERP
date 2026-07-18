import * as expenseService from '../services/expenseService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createExpense = asyncHandler(async (req, res) => {
    const expense = await expenseService.addExpense(req.body, req.user.id);
    return sendSuccess(res, expense, 'تم إضافة المصروف بنجاح', 201);
});