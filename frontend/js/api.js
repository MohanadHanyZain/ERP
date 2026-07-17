// frontend/js/api.js

const API_BASE_URL = 'http://localhost:3000'; // تأكد أنه نفس بورت الباك اند

// دالة موحدة لطلب البيانات (تضيف التوكين تلقائياً)
export const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
    
    // التعامل مع الأخطاء (401, 403, إلخ)
    if (response.status === 401) {
        // توجيه المستخدم لصفحة تسجيل الدخول إذا انتهت الجلسة
        window.location.href = '/login.html';
        throw new Error('Unauthorized');
    }

    return await response.json();
};