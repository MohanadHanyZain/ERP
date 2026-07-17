import * as reportService from '../services/reportService.js';

export const getStats = async (req, res, next) => {
    try {
        const stats = await reportService.getDashboardStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};