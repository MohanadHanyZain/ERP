export const createPurchase = async (req, res, next) => {
    try {
        // نمرر الـ req.userId القادم من الـ middleware
        const purchaseId = await purchaseService.processPurchase(req.body, req.userId);
        res.status(201).json({ success: true, message: "تمت عملية الشراء وإضافة البضاعة للمخزن", purchaseId });
    } catch (error) {
        next(error);
    }
};