import { supabase } from '../config/supabase.js';
import { inventoryService } from '../services/inventoryService.js';

export const createSale = async (req, res, next) => {
    try {
        const { product_id, quantity } = req.body;

        // 1. تنفيذ حركة المخزون أولاً (خصم الكمية)
        // نمرر القيمة بالسالب لأنها عملية بيع
        await inventoryService.adjustStock(product_id, -quantity);

        // 2. تسجيل عملية البيع
        const { data, error } = await supabase
            .from('sales')
            .insert([{ product_id, quantity, user_id: req.user.id }])
            .select();

        if (error) throw error;

        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error); // سيتم التقاط الخطأ بواسطة الـ errorHandler الذي أنشأناه
    }
};