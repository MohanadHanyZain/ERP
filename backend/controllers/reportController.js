import * as reportService from '../services/reportService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getStats = asyncHandler(async (req, res) => {
    // نستقبل التواريخ من الرابط
    const { startDate, endDate } = req.query;
    
    // جلب الإحصائيات
    const stats = await reportService.getDashboardStats(startDate, endDate, req.user.id);
    
    return sendSuccess(res, stats, 'تم جلب الإحصائيات بنجاح');
});