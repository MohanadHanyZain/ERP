# ERP Backend Documentation

## 1. نظرة عامة على النظام

هذا المشروع عبارة عن Backend لخدمة إدارة متجر/مؤسسة صغيرة تعتمد على بنية REST API مبنية على Node.js وExpress مع Supabase كخادم قاعدة بيانات PostgreSQL كمكون أساسي للبيانات. الهدف التجاري من النظام هو تمكين الإدارة اليومية للمخزون والمبيعات والمشتريات والمصروفات والعملاء والموردين، مع دعم مصادقة المستخدمين وتجزئة البيانات حسب المستخدم/المتجر.

### طبيعة النظام
- نوع النظام: ERP/Inventory Management Backend (تطبيق إدارة عمليات متجر/مؤسسة صغيرة).
- النمط العملي: SaaS-lite / multi-tenant من خلال فكرة المستخدم لكل متجر منفصل.
- الاستخدامات الأساسية:         
  - إدارة المنتجات والمخزون.
  - تسجيل المبيعات والمشتريات.
  - إدارة العملاء والموردين.
  - تسجيل المصروفات وتوليد إحصائيات لوحة التحكم.
  - إدارة المستخدمين والأذونات الأساسية.

### الهدف التجاري
النسخة الحالية تركز على توفير واجهة برمجية جاهزة للربط مع Frontend، بحيث يمكن للنظام أن يدير العمليات التشغيلية اليومية للشركة بشكل منظم، مع الحفاظ على فصل البيانات بين المستخدمين عبر حقل user_id في الجداول.

## 1.1 اقتراح فكرة العمل كـ Business Model

بدلًا من أن يكون المشروع مجرد Backend عام لإدارة متجر، فالأفضل تحويله إلى منتج تجاري واضح ومحدد باسم:

### اسم المقترح التجاري
Smart Retail ERP

### الفكرة التجارية
نظام SaaS متكامل لإدارة متاجر البيع بالتجزئة الصغيرة والمتوسطة، ويخدم قطاعًا واضحًا مثل:
- محلات الملابس
- محلات الإلكترونيات الصغيرة
- محلات البقالة والمستلزمات المنزلية
- محلات الصيدليات الصغيرة
- متاجر البيع بالجملة والتجزئة

### المشكلة التي يحلها النظام
أغلب أصحاب المتاجر الصغيرة يعتمدون على أوراق أو Excel أو تطبيقات منفصلة، مما يؤدي إلى:
- فقدان السيطرة على المخزون
- صعوبة متابعة المبيعات اليومية
- عدم معرفة الربح الحقيقي
- صعوبة متابعة الموردين والعملاء
- تعقيد إدارة المرتجعات والمصروفات

### القيمة المقترحة
النظام يقدم حلًا واحدًا يجمع بين:
- نقطة بيع (POS)
- إدارة المخزون
- إدارة المشتريات
- إدارة العملاء والموردين
- إدارة المصروفات
- تقارير مالية تشغيلية
- صلاحيات للوصول حسب الدور

### نموذج الإيرادات المقترح
- اشتراك شهري أو سنوي لكل متجر
- خطة أساسية للمخازن الصغيرة
- خطة احترافية للشركات ذات الفروع المتعددة
- خدمة إعداد أولي وترحيل البيانات
- دعم فني قابل للتجديد

### الميزة التنافسية الأساسية
التركيز على البساطة والسرعة والقدرة على التشغيل الفوري، بدلًا من أن يكون النظام معقدًا جدًا مثل ERP كبير.

---

## 1.2 قائمة مهام كاملة ومفصلة لجعل Backend جاهز 100%

هذه قائمة مهام تنفيذية عملية يجب تنفيذها على المشروع حتى يصبح الـ Backend جاهزًا بالكامل للربط مع Frontend وإطلاقه على مستوى إنتاجي.

### المرحلة 1: أساسيات البنية والتوحيد
1. توحيد اسماء المتغيرات عبر المشروع
   - استبدال req.userId بـ req.user.id في كل Controllers والخدمات
   - توحيد استخدام userId كمتغير رئيسي في جميع الدوال

2. إنشاء طبقة Responses موحدة
   - إنشاء helper لردود النجاح والخطأ
   - ضمان أن كل Endpoint يُرجع نفس الشكل مثل:
     {
       "success": true,
       "data": {},
       "message": ""
     }

3. إنشاء طبقة Errors موحدة
   - تعريف أخطاء مخصصة مثل ValidationError وAuthError وNotFoundError وConflictError
   - جعل errorHandler يرسل رسائل احترافية موحدة

4. إنشاء middleware عام للـ async handling
   - منع تكرار try/catch في كل Controller
   - استخدام wrapper يجلب الأخطاء تلقائيًا

5. إضافة validation موحد على جميع الـ Routes
   - التأكد من صحة كل request body وparams وquery
   - إضافة schemas خاصة لكل مورد

6. تنظيم الـ Routes على أساس API versioning
   - تغيير المسارات إلى الشكل التالي:
     /api/v1/auth
     /api/v1/products
     /api/v1/sales
     /api/v1/purchases
   - هذا يجعل المستقبل أكثر مرونة ويجنب التعارضات

### المرحلة 2: تحسين الأمان الكامل
1. استبدال القيم الثابتة في JWT بالمتغيرات البيئية
   - JWT_SECRET يجب أن يكون من env بالكامل
   - عدم الاعتماد على قيمة افتراضية ضعيفة

2. إضافة refresh token mechanism
   - تخزين refresh token بشكل آمن
   - دعم تسجيل الخروج من جميع الأجهزة

3. تفعيل Row Level Security في Supabase
   - منع المستخدم من الوصول إلى بيانات مستخدم آخر
   - تطبيق سياسات على الجداول المهمة مثل products وsales وcustomers وsuppliers

4. إضافة rate limiting على Endpoints الحساسة
   - /auth/login
   - /auth/register
   - /api/v1/sales
   - /api/v1/purchases

5. إضافة logging للأحداث الحساسة
   - تسجيل محاولات تسجيل الدخول الفاشلة
   - تسجيل العمليات الحساسة مثل الحذف أو تعديل الأسعار أو حذف المخزون

6. إضافة حماية ضد SQL/NoSQL injection أو input abuse
   - استخدام validation صارم
   - منع الإدخال غير المتوقع أو غير المهيأ

### المرحلة 3: تطوير إدارة المستخدمين والأدوار
1. إنشاء جدول profiles أو accounts منفصل عن users إذا لزم الأمر
   - تخزين اسم المتجر، البلد، العملة، الصورة، الحالة

2. إضافة صلاحيات دقيقة بدلاً من الأدوار البسيطة فقط
   - admin
   - manager
   - cashier
   - viewer

3. إضافة صلاحية لكل وحدة على حدة
   - إدارة المنتجات
   - إدارة المبيعات
   - إدارة المشتريات
   - إدارة التقارير
   - إدارة المستخدمين

4. دعم دعوات المستخدمين إلى المتجر
   - إضافة مستخدم جديد من خلال invitation link أو email
   - تعيين الدور عند الإنضمام

5. إضافة إعدادات المتجر الأساسية
   - اسم المتجر
   - العملة
   - العنوان
   - رقم الهاتف
   - إعدادات الضرائب
   - إعدادات سياسة الخصومات

### المرحلة 4: تطوير إدارة المنتجات والمخزون بالكامل
1. تحسين نموذج المنتج بشكل احترافي
   - إضافة SKU
   - إضافة barcode
   - إضافة unit
   - إضافة cost_price و selling_price بشكل واضح
   - إضافة image_url
   - إضافة description
   - إضافة low_stock_threshold

2. إضافة نظام فئات ذكي
   - فئات فرعية
   - تمييز المنتجات حسب النوع أو العلامة التجارية

3. إضافة نظام تنبيهات المخزون
   - إذا كان المنتج أقل من الحد الأدنى، يرسل تنبيه
   - دعم تنبيه عند نفاذ المخزون

4. تحسين حركة المخزون بشكل كامل
   - إضافة سجل شامل لكل حركة للمخزون
   - تسجيل سبب الحركة: شراء، بيع، مرتجع، تعديل يدوي، خسارة، شحن، إرجاع مورد

5. دعم التعديل اليدوي للمخزون
   - تعديل مباشر للكمية مع سبب العملية
   - تسجيل المسؤول الذي نفذ التعديل

6. إضافة تقارير المخزون
   - المنتجات الأقل توافرًا
   - المنتجات الأكثر حركة
   - المنتجات ذات الربح الأعلى

### المرحلة 5: تطوير المبيعات والطلبات بالكامل
1. إنشاء نظام فواتير بيع احترافي
   - دعم أكثر من منتج في الفاتورة الواحدة
   - دعم الخصومات
   - دعم الضرائب
   - دعم طرق الدفع: نقدًا، بطاقة، تحويل، آجل

2. دعم الفواتير المؤجلة أو الآجلة
   - إضافة حقل balance_due أو outstanding_amount
   - تتبع ديون العملاء

3. إضافة نظام المرتجعات والردود
   - دعم مرتجع كامل أو جزئي للفاتورة
   - إنشاء رصيد مرتجع أو استرداد مبلغ

4. تحسين تسجيل المبيعات في قاعدة البيانات
   - إنشاء جدول sales و sale_items بشكل موحد ومتكامل
   - ربط كل عنصر بمنتج واحد وعميل واحد

5. دعم طباعة أو إرسال الفواتير
   - PDF أو receipt JSON جاهز للـ Frontend

### المرحلة 6: تطوير المشتريات والموردين بالكامل
1. تحسين إدارة الموردين
   - اسم المورد، هاتف، عنوان، بريد، رصيد مورد، ملاحظات

2. إنشاء نظام مشتريات احترافي
   - إدخال فاتورة شراء كاملة مع عناصر متعددة
   - ربط كل عنصر بمنتج ومورد

3. إضافة أوامر شراء (Purchase Orders)
   - إنشاء طلب شراء قبل استلام البضاعة
   - تحويل الطلب إلى فاتورة شراء عند الاستلام

4. تتبع أسعار الشراء والتكلفة
   - حفظ cost_price لكل عملية شراء
   - حساب متوسط تكلفة المنتج عند تعدد الشراءات

### المرحلة 7: تطوير المصروفات والتقارير المالية
1. إضافة نظام مصروفات متكامل
   - تصنيف المصروفات
   - ربطها بالمتجر أو القسم أو الموظف
   - دعم الإشارات أو الملاحظات

2. إضافة تقارير مالية أساسية
   - إجمالي المبيعات
   - إجمالي المشتريات
   - إجمالي المصروفات
   - صافي الربح
   - الربح حسب المنتج
   - الربح حسب الفترة الزمنية

3. إضافة لوحة تحكم احترافية
   - إجمالي اليوم
   - إجمالي الشهر
   - أعلى منتجات مبيعًا
   - أقل منتج متوفر
   - نسبة التحويل

### المرحلة 8: تحسين الـ API للـ Frontend
1. إضافة pagination على كل list endpoint
   - limit, page, search, sort

2. إضافة filtering وsearch على كل الموارد
   - البحث بالاسم، الكود، الفئة، التاريخ

3. إضافة دعم query params موحد
   - page
   - limit
   - search
   - fromDate
   - toDate
   - status

4. إضافة response metadata
   - totalCount
   - page
   - totalPages

5. توحيد أسماء الحقول بين Backend وFrontend
   - تجنب أسماء غير متسقة أو عربية في payload

### المرحلة 9: التطوير على مستوى الجودة والاختبار
1. كتابة اختبارات unit و integration
   - اختبارات على auth
   - اختبارات على inventory
   - اختبارات على sales/purchases

2. إضافة اختبارات API باستخدام Postman أو Newman أو Jest
   - التأكد من صحة الـ Endpoints قبل الربط مع Frontend

3. إعداد بيئة testing مستقلة
   - قاعدة بيانات اختبارات منفصلة
   - بيانات وهمية جاهزة

### المرحلة 10: الاستعداد للإطلاق والنشر
1. إعداد Docker أو deployment بيئي
   - backend containerized
   - env vars منفصلة لكل بيئة

2. إضافة CI/CD
   - auto deploy عند push إلى main

3. إضافة monitoring و health checks
   - /health مع معلومات مفصلة
   - logging centralized

4. إعداد النسخ الاحتياطي والتعافي
   - backup strategy لقاعدة البيانات
   - recovery plan

5. إعداد الوثائق الفنية النهائية
   - OpenAPI/Swagger
   - دليل المطورين
   - دليل المستخدم الإداري

---

## 2. هيكلية التقنيات (Tech Stack Architecture)

### المكونات التقنية الأساسية
- Runtime: Node.js
- Framework: Express.js
- Language: JavaScript (ES Modules)
- Database: Supabase (PostgreSQL as a Service)
- Auth: JWT + bcryptjs
- Validation: Joi
- Middleware: CORS, Morgan, custom auth/role/error handlers
- Environment management: dotenv

### بنية الطبقات المعمارية

1. Layer 1 - Entry Point
   - الملف: server.js
   - دوره:
     - تهيئة Express
     - تحميل المتغيرات البيئية
     - ربط الـ Middleware العامة
     - تسجيل جميع Routes
     - تشغيل الخادم

2. Layer 2 - Routes
   - كل ملف في مجلد routes يحدد مجموعة من الـ Endpoints الخاصة بنطاق معين.
   - الدور:
     - استقبال الطلب
     - تسليم الطلب إلى Controller المناسب
     - تطبيق Middleware مثل التحقق من التوثيق والأدوار

3. Layer 3 - Controllers
   - المجلد controllers يحتوي منطق معالجة الطلبات.
   - الدور:
     - استلام payload أو params أو query
     - استدعاء service layer
     - تشكيل الاستجابة النهائية

4. Layer 4 - Services
   - المجلد services يحتوي منطق الأعمال الحقيقي والتفاعل مع Supabase.
   - الدور:
     - تنفيذ العمليات على البيانات
     - إدارة المعاملات المنطقية (حيث أمكن)
     - تطبيق سياسات العمل مثل تحديث المخزون

5. Layer 5 - Data Layer
   - يتم الوصول إلى Supabase عبر client موحد من config/supabase.js.
   - يتم تخزين البيانات في جداول PostgreSQL داخل Supabase.

### كيف يتفاعل Node.js مع Supabase
- يتم إنشاء عميل Supabase باستخدام createClient من مكتبة @supabase/supabase-js.
- يتم استيراد هذا العميل إلى Services وControllers عند الحاجة.
- يتم تنفيذ العمليات باستخدام:
  - select
  - insert
  - update
  - delete
  - eq / gte / lte / single
- يتم استخدام user_id كوسيلة لعزل البيانات بين المستخدمين (على الرغم من أن هذه السياسة تحتاج إلى تقويتها عبر Row Level Security في Supabase).

### ملاحظات معمارية مهمة
- النظام لا يستخدم ORM مثل Prisma أو Sequelize؛ بل يعتمد على supabase-js مباشرة.
- هذا يجعل الكود بسيطًا لكنه يضع مسؤولية بناء الاستعلامات والضبط الأمني على يد المطور.
- توجد جوانب تنفيذية غير متناسقة في الكود الحالي، ما يجعلها غير جاهزة بالكامل للـ Frontend دون تحسينات.

---

## 3. هيكل المشروع

```text
backend/
  config/
    supabase.js
  constants/
    roles.js
  controllers/
    authController.js
    categoryController.js
    customerController.js
    expenseController.js
    productController.js
    purchaseController.js
    reportController.js
    returnController.js
    saleController.js
    supplierController.js
    transactionController.js
  middleware/
    authMiddleware.js
    errorHandler.js
    roleMiddleware.js
    validate.js
  routes/
    authRoutes.js
    categoryRoutes.js
    customerRoutes.js
    expenseRoutes.js
    productRoutes.js
    purchaseRoutes.js
    reportRoutes.js
    returnRoutes.js
    saleRoutes.js
    supplierRoutes.js
    transactionRoutes.js
  services/
    categoryService.js
    customerService.js
    expenseService.js
    inventoryService.js
    productService.js
    purchaseService.js
    reportService.js
    returnService.js
    saleService.js
    supplierService.js
    transactionService.js
  server.js
  package.json
```

---

## 4. نموذج البيانات (Data Schema)

لا يوجد ملف SQL أو migrations مدمج في المشروع حاليًا، لذلك يتم وصف المخطط المعتمد من خلال الكود الحالي واستخدامات الخدمات. فيما يلي نموذج بيانات مقترح/مستخدم فعليًا من خلال التطبيق.

### 4.1 الجداول الأساسية

#### users
الغرض: تخزين بيانات المستخدمين/الأصحاب أو المدراء.

الحقول الأساسية:
- id: uuid
- email: text
- password_hash: text
- store_name: text
- role: text (admin/manager/cashier)
- created_at: timestamp

العلاقات:
- users 1:N مع جميع الجداول الأخرى التي تحمل user_id.

#### categories
- id: uuid
- name: text
- description: text
- user_id: uuid
- created_at: timestamp

العلاقات:
- categories 1:N مع products.

#### products
- id: uuid
- name: text
- price: numeric
- stock_quantity: integer
- category_id: uuid
- user_id: uuid
- created_at: timestamp

العلاقات:
- products N:1 مع categories.
- products 1:N مع sale_items, purchase_items, transactions.

#### customers
- id: uuid
- name: text
- phone: text
- user_id: uuid
- created_at: timestamp

العلاقات:
- customers 1:N مع sales.

#### suppliers
- id: uuid
- name: text
- phone: text
- email: text
- user_id: uuid
- created_at: timestamp

العلاقات:
- suppliers 1:N مع purchases.

#### sales
- id: uuid
- customer_id: uuid
- total_amount: numeric
- user_id: uuid
- created_at: timestamp

العلاقات:
- sales 1:N مع sale_items.
- sales 1:N مع returns.

#### sale_items
- id: uuid
- sale_id: uuid
- product_id: uuid
- quantity: integer
- price: numeric
- user_id: uuid
- created_at: timestamp

#### purchases
- id: uuid
- supplier_id: uuid
- total_amount: numeric
- user_id: uuid
- created_at: timestamp

العلاقات:
- purchases 1:N مع purchase_items.

#### purchase_items
- id: uuid
- purchase_id: uuid
- product_id: uuid
- quantity: integer
- price: numeric
- user_id: uuid
- created_at: timestamp

#### expenses
- id: uuid
- title: text
- amount: numeric
- notes: text
- created_at: timestamp

#### transactions
- id: uuid
- product_id: uuid
- transaction_type: text (in/out)
- quantity: integer
- price: numeric
- notes: text
- user_id: uuid
- created_at: timestamp

#### returns
- id: uuid
- sale_id: uuid
- product_id: uuid
- quantity: integer
- reason: text
- type: text
- user_id: uuid
- created_at: timestamp

### 4.2 العلاقات المنطقية بين الجداول
- المستخدم يمتلك بياناته الخاصة عبر user_id.
- كل منتج ينتمي إلى فئة.
- كل فاتورة مبيعات لها تفاصيل متعددة (sale_items).
- كل فاتورة مشتريات لها تفاصيل متعددة (purchase_items).
- كل حركة في المخزون تُسجل في transactions.
- كل مرتجع مرتبط بعملية بيع معينة.

### 4.3 ملاحظات على النموذج الحالي
النموذج الحالي غير متكامل تمامًا من ناحية التطبيع والتوحيد. يوجد تداخل بين:
- تسجيل المبيعات/المشتريات في الجداول الأساسية وبين تفاصيلها في الجداول التفصيلية.
- استخدام stock_quantity مباشرة داخل products مع تسجيل الحركات في transactions، مما يجعل المخزون يعتمد على حسابات لاحقة وليس على سجل موثوق بالكامل.
- عدم وجود migrations أو schema versioning يجعل من الصعب إدارة التغييرات على بنية البيانات عبر البيئات.

---

## 5. شرح الـ APIs

### 5.1 Health Check
| Method | Path | Description | Auth |
|---|---|---|---|
| GET | /health | فحص صحة الخادم | No |

Response:
```json
{
  "success": true,
  "message": "System is healthy!"
}
```

### 5.2 Authentication
| Method | Path | Description | Request | Response |
|---|---|---|---|---|
| POST | /auth/register | تسجيل مستخدم جديد | {"email":"","password":"","store_name":""} | 201 + success message |
| POST | /auth/login | تسجيل دخول | {"email":"","password":""} | 200 + JWT token |

### 5.3 Products
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | /products | عرض كل المنتجات | JWT required | none | قائمة المنتجات مع category name |
| GET | /products/:id | عرض منتج واحد | JWT required | id in URL | منتج واحد |
| POST | /products | إضافة منتج | JWT + admin | {"name":"","price":0,"stock_quantity":0,"category_id":"uuid"} | المنتج المنشأ |
| PUT | /products/:id | تعديل منتج | JWT + admin | partial/complete product payload | المنتج المحدث |
| DELETE | /products/:id | حذف منتج | JWT + admin | id in URL | رسالة نجاح |

### 5.4 Categories
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | /categories | عرض التصنيفات | JWT | none | قائمة التصنيفات |
| POST | /categories | إضافة تصنيف | JWT + admin | {"name":"","description":""} | التصنيف المنشأ |

### 5.5 Customers
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | /customers | عرض العملاء | JWT | none | قائمة العملاء |
| POST | /customers | إضافة عميل | JWT + admin/manager | {"name":"","phone":""} | العميل المنشأ |

### 5.6 Suppliers
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | /suppliers | عرض الموردين | JWT | none | قائمة الموردين |
| POST | /suppliers | إضافة مورد | JWT | {"name":"","phone":"","email":""} | المورد المنشأ |

### 5.7 Transactions
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | /transactions | عرض الحركات | JWT | none | قائمة الحركات |
| POST | /transactions | إضافة حركة | JWT | {"product_id":"","transaction_type":"in/out","quantity":1,"price":0,"notes":""} | الحركة المنشأة |

### 5.8 Sales
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| POST | /sales | تسجيل بيع | JWT | {"product_id":"","quantity":1} | الفاتورة/العملية المنشأة |

### 5.9 Purchases
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| POST | /purchases | تسجيل شراء | JWT + admin/manager | {"product_id":"","quantity":1,"cost_price":0} | العملية المنشأة |

### 5.10 Expenses
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| POST | /expenses | تسجيل مصروف | JWT + admin | {"amount":0,"description":""} | المصروف المنشأ |

### 5.11 Dashboard / Reports
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| GET | /dashboard | عرض إحصائيات لوحة التحكم | JWT | query: startDate, endDate | تحصيل إجمالي المبيعات والمشتريات والمصروفات والربح الصافي |

### 5.12 Returns
| Method | Path | Description | Auth | Request | Response |
|---|---|---|---|---|---|
| POST | /returns/customer | تسجيل مرتجع عميل | JWT | {"sale_id":"","product_id":"","quantity":1,"reason":""} | سجل المرتجع |

---

## 6. التدفق التشغيلي (System Flow)

### 6.1 تدفق المصادقة
1. العميل يرسل البريد وكلمة المرور إلى /auth/login.
2. Controller يطلب المستخدم من Supabase.
3. يتم مقارنة كلمة المرور مع password_hash باستخدام bcrypt.
4. في حال النجاح، يتم إنشاء JWT يحتوي على id و role.
5. يُعاد الرمز إلى العميل لاستخدامه في كل طلب لاحق.

### 6.2 تدفق إضافة منتج
1. العميل يرسل الطلب إلى /products عبر POST.
2. Router يطبق verifyToken ثم checkRole ثم validate.
3. Controller يستدعي productService.createProduct.
4. Service يضيف المنتج إلى جدول products مع user_id.
5. يتم إرجاع المنتج المنشأ إلى العميل.

### 6.3 تدفق تسجيل بيع
1. يتم استلام طلب البيع من العميل.
2. Controller يستدعي inventoryService.adjustStock مع كمية سالبة.
3. إذا كان المخزون كافيًا، يتم تحديث stock_quantity في products.
4. يتم تسجيل الفاتورة/العملية في sales.
5. يتم تسجيل الحركة في transactions.
6. يتم إرسال الاستجابة النهائية إلى العميل.

### 6.4 تدفق تسجيل شراء
1. يتم استلام طلب الشراء.
2. inventoryService.adjustStock يرفع المخزون.
3. يتم تسجيل العملية في purchases.
4. يتم تسجيل الحركة في transactions.
5. يتم إرسال النتيجة إلى العميل.

### 6.5 تدفق لوحة التحكم
1. العميل يرسل GET /dashboard مع startDate/endDate اختيارية.
2. Controller يستدعي reportService.getDashboardStats.
3. Service يجلب المبيعات والمشتريات والمصروفات من Supabase.
4. يتم احتساب netProfit.
5. يتم إرجاع كائن إحصائي واحد.

---

## 7. الثغرات الحالية والتناقضات المعمارية

### 7.1 ثغرة في سياق المستخدم
الـ Middleware authMiddleware يضع البيانات في req.user:
```js
req.user = decoded;
```
لكن العديد من Controllers تستخدم req.userId بدلًا من req.user.id.

النتيجة:
- قد يصل التطبيق إلى قيمة undefined.
- بعض العمليات مثل категории/عملاء/موردين/معاملات/مرتجعات قد تفشل أو تعطي بيانات غير صحيحة.

### 7.2 خطأ في Route الخاص بالمنتجات
في server.js يوجد تعريف منفصل لـ GET /products/:id:
```js
app.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(id);
});
```
وهذا غير مرتبط بالـ Product service الحالي، ويؤدي إلى خطأ بسبب غياب الكائن Product.

### 7.3 استخدام غير متسق للـ Roles
- بعض المسارات محمية جيدًا.
- بعض المسارات مثل suppliers و transactions لا تستخدم checkRole على الإطلاق.
- authController لا يضع role عند التسجيل، على الرغم من أن JWT يعتمد على role.

### 7.4 مشكلات في طبقة Services
- بعض Services تستخدم Supabase بشكل غير مكتمل أو غير منسق.
- في purchaseService و saleService يتم استخدام supabase بدون استيراد واضح.
- في بعض الحالات توجد بنية بيانات تتناقض مع الـ Controllers أو Routes.

### 7.5 غياب التزامن الحقيقي للمعاملات
عملية البيع والشراء تتضمن أكثر من خطوة:
- تعديل المخزون
- إدخال سجل البيع/الشراء
- إدخال transaction

إذا فشل أحد الخطوات، قد يتبقى النظام في حالة غير متسقة.

### 7.6 غياب schema versioning و migrations
لا يوجد ملف SQL أو نظام migrations، وبالتالي من الصعب:
- تتبع تغييرات قاعدة البيانات
- نشر التغييرات على بيئات متعددة
- التراجع عن التغييرات عند الحاجة

---

## 8. التوصيات والتعديلات الشاملة لتجهيز Backend للربط مع Frontend

### 8.1 تحسين البنية المعمارية
#### التوصية 1: توحيد سياق الطلب
توحيد استخدام req.user.id في جميع Controllers بدلاً من req.userId.

البديل المقترح:
```js
req.user = decoded;
```
ثم في كل Controller:
```js
const userId = req.user.id;
```

#### التوصية 2: فصل طبقة Services بشكل موحد
كل Controller يجب أن يستدعي خدمة واحدة فقط، ويجب أن تكون الخدمات هي نقطة الاتصال الوحيدة مع Supabase.

الهيكل الموصى به:
- controller → service → supabase
- لا يُسمح للـ Controller بالاتصال المباشر بـ Supabase.

#### التوصية 3: إزالة التداخل بين Routes و server.js
يجب حذف التعريف اليدوي المتداخل لـ GET /products/:id من server.js وإبقاء كل المسار في productRoutes.js فقط.

### 8.2 تحسين الـ Routes والـ Controllers
#### التوصية 4: تطبيق نظام Routes موحد
استخدام نمط موحد مثل:
```js
router.get('/', verifyToken, controller.list);
router.post('/', verifyToken, validate(schema), controller.create);
router.get('/:id', verifyToken, controller.getById);
router.put('/:id', verifyToken, validate(schema), controller.update);
router.delete('/:id', verifyToken, controller.remove);
```

#### التوصية 5: إنشاء Base Controller
إنشاء controller عام يضيف:
- handleSuccess
- handleError
- sendValidationError

هذا يقلل التكرار ويجعل الاستجابة موحدة بين جميع الـ Endpoints.

### 8.3 تحسينات أمنية حاسمة
#### التوصية 6: استبدال الأسرار الثابتة بالمتغيرات البيئية
- استبدال JWT_SECRET الثابت في authController و authMiddleware.
- استخدام dotenv مع تحقق من توفر القيم قبل تشغيل التطبيق.

مثال:
```js
if (!process.env.JWT_SECRET || !process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Missing required environment variables');
}
```

#### التوصية 7: تفعيل Row Level Security في Supabase
بدل الاعتماد فقط على user_id في التطبيق، يجب تفعيل RLS في Supabase مع سياسات مثل:
- المستخدم يرى فقط سجلاته الخاصة
- لا يمكن للمستخدم تعديل سجلات المستخدمين الآخرين

هذا يحسن الأمان بشكل كبير ويقلل الاعتماد على منطق التطبيق فقط.

#### التوصية 8: إضافة rate limiting و throttling
- منع الهجمات المتكررة على /auth/login
- حماية Endpoints الحساسة من الإساءة

### 8.4 تحسينات على Supabase Queries
#### التوصية 9: استخدام select مع الأعمدة المطلوبة فقط
بدلاً من select('*')، يُفضّل اختيار الأعمدة المطلوبة فقط لتقليل الحمل.

مثال:
```js
supabase.from('products').select('id, name, price, stock_quantity, categories(name)').eq('user_id', userId);
```

#### التوصية 10: إضافة indexes على الحقول المهمة
الحقول التي يجب أن تكون indexed:
- user_id
- category_id
- product_id
- sale_id
- purchase_id
- created_at
- email

#### التوصية 11: استخدام transactions/DB functions عند الحاجة
عند إدخال بيع أو شراء، يجب استخدام:
- transaction في قاعدة البيانات أو
- stored procedure / RPC

للتأكد من:
- صحة المخزون
- عدم وجود تناقضات
- التراجع إذا فشل جزء من العملية

### 8.5 ميزات مفقودة يجب إضافتها
#### التوصية 12: دعم Pagination و Search و Filters
الـ Frontend يحتاج في الغالب إلى:
- pagination
- search by name/category/customer
- filter by date
- filter by status

#### التوصية 13: دعم CRUD كامل وموحد للأكواد المرجعية
- إضافة update/delete/restore لجهات مثل suppliers, customers, expenses
- إضافة getById لكل الموارد

#### التوصية 14: نظام Audit Logs
تسجيل:
- من أنشأ/عدل/حذف السجل
- متى حدث ذلك
- ما كان نوع العملية

#### التوصية 15: إدارة الأخطاء بشكل موحد
إرجاع استجابة موحدة مثل:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "الكمية يجب أن تكون أكبر من صفر"
  }
}
```

### 8.6 تحسينات للربط مع Frontend
#### التوصية 16: توحيد شكل الاستجابة
كل Endpoint يجب أن يرجع نفس الشكل:
```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

#### التوصية 17: إضافة API versioning
التحول إلى بنية مثل:
- /api/v1/products
- /api/v1/sales
- /api/v1/auth

هذا يجعل التحديثات المستقبلية أكثر أمانًا ومرونة.

#### التوصية 18: إضافة Swagger / OpenAPI
يُفضّل إضافة OpenAPI لكي يكون Frontend أو المطورون على دراية كاملة بواجهة API.

---

## 9. الخلاصة التنفيذية

الـ Backend الحالي يعمل كنسخة مبكرة من نظام إدارة متجر، ويحتوي على أساس جيد من خلال:
- Express
- Supabase
- JWT
- Routes/Controllers/Services
- Middleware مخصص

لكنّه يحتاج إلى تحسينات جوهرية قبل أن يصبح جاهزًا بالكامل للربط مع Frontend على مستوى إنتاجي، خصوصًا فيما يتعلق بـ:
- توحيد سياق المستخدم
- تصحيح الثغرات الحالية في المسارات والخدمات
- تعزيز الأمان
- توحيد نموذج البيانات
- إضافة التنسيقات القياسية للاستجابة والـ Errors
- تفعيل سياسات Supabase الأمنية

إذا تم تنفيذ هذه التوصيات، يصبح المشروع جاهزًا بدرجة كبيرة للاستخدام العملي والتوسع لاحقًا.
