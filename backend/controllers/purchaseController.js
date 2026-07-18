import { supabase } from '../config/supabase.js';
import { inventoryService } from '../services/inventoryService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createPurchase = asyncHandler(async (req, res) => {
    const { product_id, quantity, cost_price } = req.body;

    // 1. زيادة المخزون
    await inventoryService.adjustStock(product_id, quantity);

    // 2. تسجيل عملية الشراء
    const { data, error } = await supabase
        .from('purchases')
        .insert([{ 
            product_id, 
            quantity, 
            cost_price, 
            user_id: req.user.id 
        }])
        .select();

    // إذا حدث خطأ من Supabase، نقوم بإلقاء خطأ ليلتقطه الـ asyncHandler
    if (error) {
        const err = new Error("فشل تسجيل عملية الشراء: " + error.message);
        err.statusCode = 400;
        throw err;
    }

    return sendSuccess(res, data[0], "تم تسجيل عملية الشراء بنجاح", 201);
});