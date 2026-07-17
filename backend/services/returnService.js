import { supabase } from '../config/supabase.js';

export const processCustomerReturn = async (returnData, userId) => {
    const { sale_id, product_id, quantity, reason } = returnData;

    // تسجيل المرتجع مع ربطه بـ user_id
    const { data: returnEntry, error: returnError } = await supabase
        .from('returns')
        .insert([{ sale_id, product_id, quantity, reason, type: 'customer', user_id: userId }])
        .select();
    
    if (returnError) throw returnError;

    // تسجيل حركة المخزن مع ربطها بـ user_id
    const { error: transError } = await supabase.from('transactions').insert([{
        product_id,
        user_id: userId, // ضروري جداً
        transaction_type: 'in',
        quantity,
        price: 0,
        notes: `مرتجع من فاتورة ${sale_id}`
    }]);

    if (transError) throw transError;
    return returnEntry[0];
};