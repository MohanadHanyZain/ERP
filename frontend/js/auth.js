// frontend/js/auth.js
import { apiRequest } from './api.js';

const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // استدعاء الباك اند (نفترض أن الرابط هو auth/login)
        const response = await apiRequest('auth/login', 'POST', { email, password });
        
        if (response.token) {
            // تخزين الـ Token في المتصفح
            localStorage.setItem('token', response.token);
            alert('تم تسجيل الدخول بنجاح!');
            window.location.href = 'dashboard.html'; // سننشئها لاحقاً
        }
    } catch (error) {
        alert('فشل تسجيل الدخول: تأكد من البيانات');
        console.error(error);
    }
});