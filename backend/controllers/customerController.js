import * as customerService from '../services/customerService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCustomers = asyncHandler(async (req, res) => {
    const customers = await customerService.getAllCustomers(req.user.id);
    return sendSuccess(res, customers, 'تم جلب قائمة العملاء بنجاح');
});

export const addCustomer = asyncHandler(async (req, res) => {
    const newCustomer = await customerService.createCustomer(req.body, req.user.id);
    return sendSuccess(res, newCustomer, 'تم إضافة العميل بنجاح', 201);
});