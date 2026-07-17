import * as returnService from '../services/returnService.js';

export const handleCustomerReturn = async (req, res, next) => {
    try {
        const result = await returnService.processCustomerReturn(req.body, req.userId);
        res.status(201).json({ success: true, message: "تم تسجيل المرتجع بنجاح", data: result });
    } catch (error) { next(error); }
};