import { supabase } from '../config/supabase.js';
import { inventoryService } from '../services/inventoryService.js';
import { sendSuccess } from '../utils/responseHelper.js';
import asyncHandler from '../utils/asyncHandler.js';

export const createSale = asyncHandler(async (req, res) => {
    const { product_id, quantity } = req.body;

    // 1. تقليل المخزون
    await inventoryService.adjustStock(product_id, -quantity);

    // 2. تسجيل عملية البيع
    const { data, error } = await supabase
        .from('sales')
        .insert([{ product_id, quantity, user_id: req.user.id }])
        .select();

    // في حالة وجود خطأ من Supabase، نقوم بإلقاء خطأ ليلتقطه الـ asyncHandler
    if (error) {
        const err = new Error("فشل تسجيل عملية البيع: " + error.message);
        err.statusCode = 400;
        throw err;
    }

    return sendSuccess(res, data[0], "تم تسجيل عملية البيع بنجاح", 201);
});