export const processSale = async (saleData, userId) => {
    const { customer_id, items, total_amount } = saleData;

    // 1. إنشاء الفاتورة الأساسية مع إضافة الـ user_id
    const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert([{ customer_id, total_amount, user_id: userId }]) // تم الإضافة
        .select();

    if (saleError) throw saleError;
    const saleId = sale[0].id;

    // 2. إعداد مصفوفة لتفاصيل الفاتورة (نضيف user_id لكل عنصر)
    const saleItems = items.map(item => ({
        sale_id: saleId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        user_id: userId // تم الإضافة
    }));

    // 3. إعداد مصفوفة لحركات المخزن (نضيف user_id لكل حركة)
    const transactions = items.map(item => ({
        product_id: item.product_id,
        transaction_type: 'out',
        quantity: item.quantity,
        price: item.price,
        notes: `بيع فاتورة رقم ${saleId}`,
        user_id: userId // تم الإضافة
    }));

    // 4. تنفيذ العمليات
    const { error: itemsError } = await supabase.from('sale_items').insert(saleItems);
    if (itemsError) throw itemsError;

    const { error: transError } = await supabase.from('transactions').insert(transactions);
    if (transError) throw transError;

    return saleId;
};