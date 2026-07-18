import * as supplierService from '../services/supplierService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await supplierService.getAllSuppliers(req.user.id);
    return sendSuccess(res, suppliers, 'تم جلب قائمة الموردين بنجاح');
});

export const addSupplier = asyncHandler(async (req, res) => {
    const newSupplier = await supplierService.createSupplier(req.body, req.user.id);
    return sendSuccess(res, newSupplier, 'تم إضافة المورد بنجاح', 201);
});