import * as saleService from '../services/saleService.js';

export const createSale = async (req, res, next) => {
    try {
        const saleId = await saleService.processSale(req.body);
        res.status(201).json({ 
            success: true, 
            message: "تمت عملية البيع بنجاح", 
            saleId: saleId 
        });
    } catch (error) {
        next(error);
    }
};