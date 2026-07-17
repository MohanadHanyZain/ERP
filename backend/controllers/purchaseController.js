import * as purchaseService from '../services/purchaseService.js';

export const createPurchase = async (req, res, next) => {
    try {
        const purchaseId = await purchaseService.processPurchase(req.body);
        res.status(201).json({ success: true, message: "تمت عملية الشراء وإضافة البضاعة للمخزن", purchaseId });
    } catch (error) {
        next(error);
    }
};