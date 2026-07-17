import { supabase } from '../config/supabase.js';

export const getDashboardStats = async (startDate, endDate) => {
    // إذا لم يتم إرسال تواريخ، سنجلب البيانات من بداية الزمن (أو يمكن وضع قيمة افتراضية)
    const start = startDate ? new Date(startDate).toISOString() : '1970-01-01T00:00:00Z';
    const end = endDate ? new Date(endDate).toISOString() : new Date().toISOString();

    // 1. جلب المبيعات في النطاق الزمني
    const { data: salesData } = await supabase
        .from('sales')
        .select('total_amount')
        .gte('created_at', start)
        .lte('created_at', end);
    const totalSales = salesData ? salesData.reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0) : 0;

    // 2. جلب المشتريات في النطاق الزمني
    const { data: purchasesData } = await supabase
        .from('purchases')
        .select('total_amount')
        .gte('created_at', start)
        .lte('created_at', end);
    const totalPurchases = purchasesData ? purchasesData.reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0) : 0;

    // 3. جلب المصروفات في النطاق الزمني
    const { data: expensesData } = await supabase
        .from('expenses')
        .select('amount')
        .gte('created_at', start)
        .lte('created_at', end);
    const totalExpenses = expensesData ? expensesData.reduce((acc, curr) => acc + parseFloat(curr.amount), 0) : 0;

    const netProfit = totalSales - totalPurchases - totalExpenses;

    return {
        period: { start, end },
        totalSales,
        totalPurchases,
        totalExpenses,
        netProfit
    };
};