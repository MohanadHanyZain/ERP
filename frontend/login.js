document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', { // تأكد من الرابط الصحيح
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // تخزين التوكن في الـ localStorage ليكون متاحاً في كل النظام
            localStorage.setItem('token', data.token);
            alert('تم تسجيل الدخول بنجاح');
            // هنا سننتقل لاحقاً لصفحة الـ Dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'خطأ في تسجيل الدخول');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('حدث خطأ في الاتصال بالسيرفر');
    }
});