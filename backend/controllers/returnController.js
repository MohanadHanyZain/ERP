import * as returnService from '../services/returnService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const handleCustomerReturn = asyncHandler(async (req, res) => {
    const result = await returnService.processCustomerReturn(req.body, req.user.id);
    return sendSuccess(res, result, "تم تسجيل المرتجع بنجاح", 201);
});