import * as reportService from '../services/reportService.js';

export const getStats = async (req, res, next) => {
    try {
        // نستقبل التواريخ من الرابط مثل: /dashboard?startDate=2026-07-01&endDate=2026-07-31
        const { startDate, endDate } = req.query;
        const stats = await reportService.getDashboardStats(startDate, endDate);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};