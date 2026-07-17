export const createSale = async (req, res, next) => {
    try {
        // تمرير الـ userId هنا
        const saleId = await saleService.processSale(req.body, req.userId);
        res.status(201).json({ 
            success: true, 
            message: "تمت عملية البيع بنجاح", 
            saleId: saleId 
        });
    } catch (error) {
        next(error);
    }
};