import { supabase } from '../config/supabase.js';

export const processSale = async (saleData) => {
    const { customer_id, items, total_amount } = saleData;

    // 1. إنشاء الفاتورة الأساسية
    const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert([{ customer_id, total_amount }])
        .select();

    if (saleError) throw saleError;
    const saleId = sale[0].id;

    // 2. إعداد مصفوفة لتفاصيل الفاتورة
    const saleItems = items.map(item => ({
        sale_id: saleId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
    }));

    // 3. إعداد مصفوفة لحركات المخزن (Transactions)
    const transactions = items.map(item => ({
        product_id: item.product_id,
        transaction_type: 'out',
        quantity: item.quantity,
        price: item.price,
        notes: `بيع فاتورة رقم ${saleId}`
    }));

    // 4. تنفيذ العمليات (إضافة تفاصيل الفاتورة + إضافة الحركات للمخزن)
    const { error: itemsError } = await supabase.from('sale_items').insert(saleItems);
    if (itemsError) throw itemsError;

    const { error: transError } = await supabase.from('transactions').insert(transactions);
    if (transError) throw transError;

    return saleId;
};