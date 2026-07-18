import { supabase } from '../config/supabase.js';

export const inventoryService = {
    // دالة لتعديل الكمية (بالموجب للشراء، بالسالب للبيع)
    adjustStock: async (productId, quantityChange) => {
        // 1. جلب الكمية الحالية
        const { data: product, error: fetchError } = await supabase
            .from('products')
            .select('stock_quantity')
            .eq('id', productId)
            .single();

        if (fetchError || !product) throw new Error("المنتج غير موجود");

        const newQuantity = product.stock_quantity + quantityChange;

        // 2. التحقق من عدم الوصول لسالب (في حالة البيع)
        if (newQuantity < 0) throw new Error("الكمية المتاحة في المخزن غير كافية");

        // 3. التحديث في قاعدة البيانات
        const { error: updateError } = await supabase
            .from('products')
            .update({ stock_quantity: newQuantity })
            .eq('id', productId);

        if (updateError) throw new Error("فشل تحديث المخزون");

        return newQuantity;
    }
};