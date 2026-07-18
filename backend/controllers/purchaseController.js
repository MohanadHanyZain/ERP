import { supabase } from '../config/supabase.js';
import { inventoryService } from '../services/inventoryService.js';

export const createPurchase = async (req, res, next) => {
    try {
        const { product_id, quantity, cost_price } = req.body;

        // 1. زيادة المخزون أولاً (قيمة موجبة لأنها توريد)
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

        if (error) throw error;

        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error); 
    }
};