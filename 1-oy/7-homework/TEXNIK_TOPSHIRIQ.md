# TEXNIK TOPSHIRIQ (TZ)
## Onlayn Do'kon va Rejalashtirilgan Yetkazib Berish Tizimi

---

## 1. LOYIHA MAQSADI VA VAZIFASI

### 1.1. Maqsad
Ushbu loyiha restoranlar, kafelar, mehmonxonalar va boshqa tashkilotlarga doimiy ravishda mahsulot yetkazib berishni avtomatlashtirishni maqsad qiladi. Mijozlar (restoranlar) dastur orqali yoki Telegram bot orqali mahsulotlarni tanlab, yetkazib berish sanasini belgilashlari mumkin. Har belgilangan sanada tanlangan mahsulotlar belgilangan miqdorda avtomatik ravishda yetkazib beriladi.

### 1.2. Asosiy Vazifa
- Restoranlar va boshqa tashkilotlar uchun qulay onlayn mahsulot tanlash va buyurtma berish imkoniyatini yaratish
- Mijoz va admin o'rtasidagi barcha pul va mahsulot o'tkazmalarini avtomatik hisobga olish va tarixini saqlash
- Rejalashtirilgan (subscription) va bitta buyurtmalarni qo'llab-quvvatlash
- Telegram bot orqali qulay va tezkor buyurtma berish imkoniyatini ta'minlash

### 1.3. Biznes Model
- **B2B (Business-to-Business)** model
- Faqat loyiha egasi (admin) sotuvchi bo'ladi
- Barcha mijozlar faqat xaridor bo'lishi mumkin (sotuvchi bo'la olmaydi)
- Mijozlar korxona sifatida ro'yxatdan o'tadilar (INN, kompaniya nomi bilan)

---

## 2. FOYDALANUVCHI ROLLARI VA IMKONIYATLARI

### 2.1. Mijoz (Client/Restaurant)
**Asosiy funksiyalar:**
- Ro'yxatdan o'tish va autentifikatsiya (telefon raqami orqali)
- Mahsulot katalogini ko'rish va qidirish
- Mahsulotlarni savatga qo'shish
- Buyurtma berish (bitta yoki rejalashtirilgan)
- Yetkazib berish sanasini belgilash (kun, hafta, oy)
- Buyurtmalar tarixini ko'rish
- To'lov tarixini ko'rish
- Profil ma'lumotlarini boshqarish
- Yetkazib berish manzillarini qo'shish/tahrirlash
- Telegram bot orqali buyurtma berish va holatini tekshirish

**Cheklovlar:**
- Sotuvchi bo'lish imkoniyati yo'q
- Faqat o'z buyurtmalarini ko'rish mumkin

### 2.2. Admin (Loyiha Egasi)
**Asosiy funksiyalar:**
- Mijozlarni boshqarish (ko'rish, qo'shish, tahrirlash)
- Mahsulotlarni boshqarish (qo'shish, tahrirlash, o'chirish, narxni yangilash)
- Kategoriyalarni boshqarish
- Barcha buyurtmalarni ko'rish va boshqarish
- Buyurtma holatini yangilash (yangilangan, tasdiqlangan, yetkazilmoqda, yetkazilgan, bekor qilingan)
- Mijozlar bilan bo'lgan barcha pul o'tkazmalari tarixini ko'rish
- Mijozlar bilan bo'lgan barcha mahsulot o'tkazmalari tarixini ko'rish
- Hisobotlar (kunlik, haftalik, oylik)
- Rejalashtirilgan yetkazib berishlarni ko'rish va boshqarish
- Telegram bot orqali buyurtmalarni ko'rish

---

## 3. ASOSIY FUNKSIONAL VAZIFALAR

### 3.1. Autentifikatsiya va Avtorizatsiya

#### 3.1.1. Mijozlar uchun
- **Ro'yxatdan o'tish:**
  - Kompaniya nomi (required)
  - INN (required)
  - Telefon raqami (required, format: +998 XX XXX XX XX)
  - Email (optional)
  - Parol (minimum 8 belgi)
  - SMS kod orqali telefon raqamini tasdiqlash
  
- **Kirish:**
  - Telefon raqami + parol
  - Yoki telefon raqami + SMS kod
  - JWT token orqali sessiya boshqaruvi
  - Refresh token mexanizmi

#### 3.1.2. Admin uchun
- **Kirish:**
  - Email yoki username + parol
  - 2FA (ikki bosqichli autentifikatsiya) tavsiya etiladi
  - JWT token orqali sessiya boshqaruvi

### 3.2. Mahsulotlar Boshqaruvi

#### 3.2.1. Mahsulot Katalogi
- **Kategoriyalar:**
  - Ko'p darajali kategoriyalar (parent-child)
  - Kategoriya nomi, tavsifi, rasmi
  - Kategoriya bo'yicha mahsulotlarni filtrlash
  
- **Mahsulotlar:**
  - Mahsulot nomi (o'zbek va rus tillarida)
  - Tavsif (o'zbek va rus tillarida)
  - Rasmlar (ko'p rasm)
  - Narx (birlik: kg, litr, dona, quti)
  - Birlik turi
  - Mavjudligi (in stock / out of stock)
  - Kategoriya
  - SKU (Stock Keeping Unit) kodi
  - Minimal buyurtma miqdori
  - Maksimal buyurtma miqdori (agar kerak bo'lsa)

#### 3.2.2. Mahsulot Qidiruv va Filtrlash
- Matn bo'yicha qidiruv
- Kategoriya bo'yicha filtrlash
- Narx oralig'i bo'yicha filtrlash
- Mavjudlik bo'yicha filtrlash
- Pagination (sahifalash)

### 3.3. Buyurtma Tizimi

#### 3.3.1. Bitta Buyurtma (One-time Order)
- Mahsulotlarni savatga qo'shish
- Miqdorni belgilash
- Yetkazib berish sanasini tanlash
- Yetkazib berish manzilini tanlash
- To'lov usulini tanlash (naqt pul / karta / hisob-faktura)
- Buyurtmani tasdiqlash
- Buyurtma raqami generatsiya qilish

#### 3.3.2. Rejalashtirilgan Buyurtma (Subscription Order)
- Mahsulotlarni tanlash
- Miqdorni belgilash
- **Yetkazib berish chastotasini belgilash:**
  - Har kuni
  - Har hafta (ma'lum kun/kunlar: Dushanba, Chorshanba, Juma)
  - Har oy (ma'lum sana: 1, 5, 15, 20)
  - Ixtiyoriy interval (har 2 kunda, har 3 kunda)
- Boshlanish sanasi
- Tugash sanasi (yoki cheksiz)
- Avtomatik aktivatsiya
- Pausa qilish imkoniyati
- To'xtatish imkoniyati

#### 3.3.3. Buyurtma Holatlari
- **Yangi (New)** - yangi yaratilgan buyurtma
- **Tasdiqlangan (Confirmed)** - admin tomonidan tasdiqlangan
- **Tayyorlanmoqda (Preparing)** - mahsulotlar tayyorlanmoqda
- **Yetkazilmoqda (In Delivery)** - yetkazib berish jarayonida
- **Yetkazilgan (Delivered)** - muvaffaqiyatli yetkazilgan
- **Bekor qilingan (Cancelled)** - bekor qilingan
- **To'lov kutilmoqda (Pending Payment)** - to'lov kutilmoqda

### 3.4. To'lov Tizimi

#### 3.4.1. To'lov Usullari
- **Naqt pul** - yetkazib berishda naqt to'lov
- **Karta orqali** - Click, Payme integratsiyasi (kelajakda)
- **Hisob-faktura** - korxonalar uchun, keyinchalik to'lov

#### 3.4.2. To'lov Tarixi
- Har bir to'lov yozuvi:
  - To'lov ID
  - Buyurtma ID
  - Mijoz ID
  - Summa
  - To'lov usuli
  - To'lov sanasi va vaqti
  - To'lov holati (muvaffaqiyatli / muvaffaqiyatsiz)
  - Qo'shimcha ma'lumotlar

### 3.5. Yetkazib Berish Tizimi

#### 3.5.1. Yetkazib Berish Manzillari
- Mijoz bir nechta manzil qo'sha oladi:
  - Manzil nomi (masalan: "Asosiy restoran", "Filial 1")
  - To'liq manzil
  - Geografik koordinatalar (GPS)
  - Kontakt shaxs
  - Telefon raqami
  - Qo'shimcha ma'lumotlar

#### 3.5.2. Yetkazib Berish Jarayoni
- Admin buyurtma holatini yangilaydi
- Mijoz holatni real vaqtda ko'radi
- SMS/Email bildirishnomalar (kelajakda)

### 3.6. Tarix va Hisobotlar

#### 3.6.1. Pul O'tkazmalari Tarixi
**Mijoz uchun:**
- O'z to'lovlarini ko'rish
- Filtrlash: sana oralig'i, to'lov usuli, holat
- Export qilish (Excel, PDF)

**Admin uchun:**
- Barcha mijozlarning to'lovlarini ko'rish
- Mijoz bo'yicha filtrlash
- Umumiy statistikalar
- Export qilish

#### 3.6.2. Mahsulot O'tkazmalari Tarixi
**Mijoz uchun:**
- O'z buyurtmalarini ko'rish
- Buyurtma bo'yicha yetkazilgan mahsulotlar ro'yxati
- Miqdor, sana, narx ma'lumotlari

**Admin uchun:**
- Barcha yetkazilgan mahsulotlar ro'yxati
- Mijoz bo'yicha, mahsulot bo'yicha filtrlash
- Statistikalar:
  - Eng ko'p sotilgan mahsulotlar
  - Eng faol mijozlar
  - Kunlik/haftalik/oylik statistikalar

#### 3.6.3. Buyurtmalar Tarixi
- Barcha buyurtmalar ro'yxati
- Holat bo'yicha filtrlash
- Sana oralig'i bo'yicha filtrlash
- Detal ma'lumotlarni ko'rish
- Buyurtmani takrorlash imkoniyati

### 3.7. Profil Boshqaruvi

#### 3.7.1. Mijoz Profili
- Kompaniya ma'lumotlari (nom, INN, telefon, email)
- Parolni o'zgartirish
- Manzillar ro'yxati
- Profil rasmi
- Kompaniya haqida qo'shimcha ma'lumotlar

#### 3.7.2. Admin Profili
- Shaxsiy ma'lumotlar
- Parolni o'zgartirish
- 2FA sozlamalari
- Sistem sozlamalari

### 3.8. Bildirishnomalar

#### 3.8.1. Dastur Ichida
- Yangi buyurtma bildirishnomalari
- Buyurtma holati o'zgarganida
- Rejalashtirilgan buyurtma eslatmalari

#### 3.8.2. Telegram Bot
- Buyurtma holati o'zgarganda
- Yangi mahsulotlar haqida
- Rejalashtirilgan yetkazib berish eslatmalari

---

## 4. TELEGRAM BOT FUNKSIONALLIGI

### 4.1. Autentifikatsiya
- Telefon raqami orqali autentifikatsiya
- Dastur bilan bir xil hisob bilan bog'lash

### 4.2. Asosiy Funksiyalar
- **Katalog:**
  - Kategoriyalar ro'yxati
  - Kategoriya bo'yicha mahsulotlar
  - Mahsulot tafsilotlari
  - Qidiruv

- **Buyurtma Berish:**
  - Mahsulotlarni savatga qo'shish
  - Miqdorni belgilash
  - Yetkazib berish sanasini tanlash
  - Buyurtmani tasdiqlash
  - Bitta va rejalashtirilgan buyurtmalar

- **Buyurtmalarni Ko'rish:**
  - Faol buyurtmalar
  - Buyurtma tarixi
  - Buyurtma holatini tekshirish
  - Buyurtma tafsilotlari

- **Profil:**
  - Profil ma'lumotlari
  - Manzillar ro'yxati
  - To'lovlar tarixi

### 4.3. Inline Keyboard va Bot UX
- Qulay navigatsiya
- Inline keyboard buttons
- Mahsulotlarni rasmlar bilan ko'rsatish
- Emoji'lar bilan vizualizatsiya

---

## 5. TEXNIK TALABLAR

### 5.1. Frontend (Next.js)

#### 5.1.1. Texnologiyalar
- **Framework:** Next.js 14+ (App Router)
- **UI Framework:** Tailwind CSS + shadcn/ui yoki Material-UI
- **State Management:** Zustand yoki Redux Toolkit
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios yoki Fetch API
- **Internationalization:** next-intl (o'zbek va rus tillarini qo'llab-quvvatlash)

#### 5.1.2. Asosiy Sahifalar

**Mijozlar uchun:**
- `/` - Bosh sahifa (katalog, yangi mahsulotlar)
- `/catalog` - To'liq katalog
- `/catalog/[category]` - Kategoriya bo'yicha
- `/product/[id]` - Mahsulot tafsilotlari
- `/cart` - Savat
- `/checkout` - Buyurtma berish
- `/orders` - Buyurtmalar ro'yxati
- `/orders/[id]` - Buyurtma tafsilotlari
- `/profile` - Profil
- `/addresses` - Manzillar
- `/payments` - To'lovlar tarixi
- `/subscriptions` - Rejalashtirilgan buyurtmalar

**Admin uchun:**
- `/admin` - Admin dashboard
- `/admin/products` - Mahsulotlar boshqaruvi
- `/admin/products/new` - Yangi mahsulot qo'shish
- `/admin/products/[id]/edit` - Mahsulotni tahrirlash
- `/admin/categories` - Kategoriyalar boshqaruvi
- `/admin/orders` - Buyurtmalar ro'yxati
- `/admin/orders/[id]` - Buyurtma tafsilotlari
- `/admin/clients` - Mijozlar ro'yxati
- `/admin/clients/[id]` - Mijoz tafsilotlari
- `/admin/reports` - Hisobotlar
- `/admin/payments` - To'lovlar tarixi
- `/admin/settings` - Sozlamalar

#### 5.1.3. Talablar
- Responsive dizayn (mobile, tablet, desktop)
- Dark mode qo'llab-quvvatlash (optional)
- SEO optimizatsiya
- Lazy loading images
- Infinite scroll yoki pagination
- Loading states va error handling
- Accessibility (WCAG 2.1 AA standarti)

### 5.2. Backend (FastAPI)

#### 5.2.1. Texnologiyalar
- **Framework:** FastAPI 0.104+
- **ORM:** SQLAlchemy 2.0+
- **Database:** PostgreSQL 14+
- **Authentication:** JWT (python-jose, passlib)
- **Validation:** Pydantic v2
- **CORS:** FastAPI CORS middleware
- **File Upload:** FastAPI UploadFile
- **Background Tasks:** Celery + Redis (rejalashtirilgan buyurtmalar uchun)

#### 5.2.2. API Strukturasi

**Autentifikatsiya:**
- `POST /api/auth/register` - Ro'yxatdan o'tish
- `POST /api/auth/login` - Kirish
- `POST /api/auth/refresh` - Token yangilash
- `POST /api/auth/verify-phone` - Telefon raqamini tasdiqlash
- `POST /api/auth/logout` - Chiqish

**Mahsulotlar:**
- `GET /api/products` - Mahsulotlar ro'yxati (pagination, filter)
- `GET /api/products/{id}` - Mahsulot tafsilotlari
- `GET /api/categories` - Kategoriyalar ro'yxati
- `POST /api/admin/products` - Yangi mahsulot qo'shish (admin)
- `PUT /api/admin/products/{id}` - Mahsulotni tahrirlash (admin)
- `DELETE /api/admin/products/{id}` - Mahsulotni o'chirish (admin)

**Buyurtmalar:**
- `GET /api/orders` - Buyurtmalar ro'yxati (mijoz yoki admin)
- `GET /api/orders/{id}` - Buyurtma tafsilotlari
- `POST /api/orders` - Yangi buyurtma yaratish (mijoz)
- `PUT /api/admin/orders/{id}/status` - Buyurtma holatini yangilash (admin)
- `POST /api/orders/subscription` - Rejalashtirilgan buyurtma yaratish

**To'lovlar:**
- `GET /api/payments` - To'lovlar tarixi
- `POST /api/payments` - Yangi to'lov yaratish
- `GET /api/admin/payments` - Barcha to'lovlar (admin)

**Profil:**
- `GET /api/profile` - Profil ma'lumotlari
- `PUT /api/profile` - Profilni yangilash
- `POST /api/profile/addresses` - Manzil qo'shish
- `PUT /api/profile/addresses/{id}` - Manzilni tahrirlash
- `DELETE /api/profile/addresses/{id}` - Manzilni o'chirish

**Hisobotlar (Admin):**
- `GET /api/admin/reports/sales` - Sotuvlar statistikasi
- `GET /api/admin/reports/products` - Mahsulotlar statistikasi
- `GET /api/admin/reports/clients` - Mijozlar statistikasi

#### 5.2.3. Xavfsizlik
- JWT token autentifikatsiya
- Password hashing (bcrypt)
- CORS sozlash
- Rate limiting
- SQL injection himoyasi (ORM orqali)
- XSS himoyasi
- Input validation (Pydantic)

### 5.3. Ma'lumotlar Bazasi (PostgreSQL)

#### 5.3.1. Asosiy Jadval Strukturasi

**users** (foydalanuvchilar):
- id (UUID, Primary Key)
- username (String, unique)
- email (String, unique, nullable)
- phone (String, unique)
- password_hash (String)
- role (Enum: client, admin)
- company_name (String, nullable)
- inn (String, nullable)
- is_active (Boolean)
- is_phone_verified (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)

**categories** (kategoriyalar):
- id (UUID, Primary Key)
- name_uz (String)
- name_ru (String)
- slug (String, unique)
- description_uz (Text, nullable)
- description_ru (Text, nullable)
- image_url (String, nullable)
- parent_id (UUID, Foreign Key -> categories.id, nullable)
- is_active (Boolean)
- order_index (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)

**products** (mahsulotlar):
- id (UUID, Primary Key)
- name_uz (String)
- name_ru (String)
- slug (String, unique)
- description_uz (Text, nullable)
- description_ru (Text, nullable)
- sku (String, unique)
- price (Decimal)
- unit (Enum: kg, liter, piece, box)
- category_id (UUID, Foreign Key -> categories.id)
- min_quantity (Decimal, default 1)
- max_quantity (Decimal, nullable)
- is_available (Boolean)
- stock_quantity (Decimal, nullable)
- created_at (Timestamp)
- updated_at (Timestamp)

**product_images** (mahsulot rasmlari):
- id (UUID, Primary Key)
- product_id (UUID, Foreign Key -> products.id)
- image_url (String)
- order_index (Integer)
- is_primary (Boolean)

**addresses** (manzillar):
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key -> users.id)
- name (String) - "Asosiy restoran"
- full_address (String)
- latitude (Decimal, nullable)
- longitude (Decimal, nullable)
- contact_person (String, nullable)
- contact_phone (String, nullable)
- notes (Text, nullable)
- is_default (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)

**orders** (buyurtmalar):
- id (UUID, Primary Key)
- order_number (String, unique) - "ORD-2024-001234"
- user_id (UUID, Foreign Key -> users.id)
- address_id (UUID, Foreign Key -> addresses.id)
- status (Enum: new, confirmed, preparing, in_delivery, delivered, cancelled, pending_payment)
- payment_method (Enum: cash, card, invoice)
- payment_status (Enum: pending, paid, failed, refunded)
- total_amount (Decimal)
- notes (Text, nullable)
- delivery_date (Date)
- delivered_at (Timestamp, nullable)
- created_at (Timestamp)
- updated_at (Timestamp)

**order_items** (buyurtma elementlari):
- id (UUID, Primary Key)
- order_id (UUID, Foreign Key -> orders.id)
- product_id (UUID, Foreign Key -> products.id)
- quantity (Decimal)
- unit_price (Decimal) - vaqtida narx
- total_price (Decimal)
- created_at (Timestamp)

**subscriptions** (rejalashtirilgan buyurtmalar):
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key -> users.id)
- name (String) - "Restoran uchun mevalar"
- frequency_type (Enum: daily, weekly, monthly, custom)
- frequency_value (Integer) - haftada necha marta, oyda necha marta
- days_of_week (Array[Integer], nullable) - [1,3,5] Dushanba, Chorshanba, Juma
- day_of_month (Integer, nullable) - oyning qaysi sanasi
- start_date (Date)
- end_date (Date, nullable)
- is_active (Boolean)
- next_delivery_date (Date)
- created_at (Timestamp)
- updated_at (Timestamp)

**subscription_items** (rejalashtirilgan buyurtma elementlari):
- id (UUID, Primary Key)
- subscription_id (UUID, Foreign Key -> subscriptions.id)
- product_id (UUID, Foreign Key -> products.id)
- quantity (Decimal)
- created_at (Timestamp)
- updated_at (Timestamp)

**subscription_deliveries** (rejalashtirilgan buyurtmalar yetkazib berilgan):
- id (UUID, Primary Key)
- subscription_id (UUID, Foreign Key -> subscriptions.id)
- order_id (UUID, Foreign Key -> orders.id)
- scheduled_date (Date)
- delivered_date (Date, nullable)
- status (Enum: scheduled, delivered, cancelled, skipped)
- created_at (Timestamp)
- updated_at (Timestamp)

**payments** (to'lovlar):
- id (UUID, Primary Key)
- payment_number (String, unique)
- order_id (UUID, Foreign Key -> orders.id, nullable)
- user_id (UUID, Foreign Key -> users.id)
- amount (Decimal)
- payment_method (Enum: cash, card, invoice)
- status (Enum: pending, completed, failed, refunded)
- transaction_id (String, nullable) - Click/Payme transaction ID
- payment_date (Timestamp, nullable)
- notes (Text, nullable)
- created_at (Timestamp)
- updated_at (Timestamp)

**transactions** (pul o'tkazmalari - to'liq tarix):
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key -> users.id)
- type (Enum: payment, refund, adjustment)
- amount (Decimal)
- currency (String, default 'UZS')
- description (Text)
- related_order_id (UUID, Foreign Key -> orders.id, nullable)
- related_payment_id (UUID, Foreign Key -> payments.id, nullable)
- created_at (Timestamp)

**product_transactions** (mahsulot o'tkazmalari - to'liq tarix):
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key -> users.id)
- product_id (UUID, Foreign Key -> products.id)
- order_id (UUID, Foreign Key -> orders.id)
- type (Enum: delivery, return, adjustment)
- quantity (Decimal)
- unit_price (Decimal)
- total_price (Decimal)
- transaction_date (Date)
- created_at (Timestamp)

#### 5.3.2. Indekslar
- users.phone - unique index
- users.email - unique index
- products.sku - unique index
- products.category_id - index
- orders.user_id - index
- orders.status - index
- orders.delivery_date - index
- subscriptions.user_id - index
- subscriptions.is_active - index
- subscriptions.next_delivery_date - index

#### 5.3.3. Migratsiyalar
- Alembic yordamida ma'lumotlar bazasi migratsiyalari

### 5.4. Telegram Bot

#### 5.4.1. Texnologiyalar
- **Framework:** Aiogram 3.x (Python)
- **Database:** Backend API orqali (alohida DB emas)

#### 5.4.2. Asosiy Funksiyalar
- Bot komandalari (/start, /help, /catalog, /orders, /profile)
- Inline keyboard navigatsiya
- Mahsulot katalogini ko'rsatish
- Buyurtma berish jarayoni (multi-step)
- Buyurtmalar ro'yxatini ko'rsatish
- Backend API bilan integratsiya

### 5.5. Background Jobs (Celery)

#### 5.5.1. Vazifalar
- Rejalashtirilgan buyurtmalarni avtomatik yaratish
- Kunlik rejalashtirilgan yetkazib berishlarni tekshirish
- Email/SMS bildirishnomalar yuborish (kelajakda)
- Statistikalarni hisoblash

---

## 6. INTEGRATSIYALAR

### 6.1. SMS Xizmat
- SMS kod yuborish (autentifikatsiya uchun)
- Buyurtma holati o'zgarganda bildirishnomalar (kelajakda)
- Mumkin xizmatlar: SMS.uz, Eskiz.uz

### 6.2. To'lov Tizimlari
- Click yoki Payme integratsiyasi (kelajakda)
- Webhook qo'llab-quvvatlash

### 6.3. File Storage
- Rasmlarni saqlash uchun cloud storage
- AWS S3, Cloudinary yoki local storage

---

## 7. ISHGA TUSHIRISH (DEPLOYMENT)

### 7.1. Infrastructure
- **Frontend:** Vercel yoki Netlify
- **Backend:** Ubuntu server (DigitalOcean, AWS, yoki boshqa)
- **Database:** PostgreSQL (serverda yoki managed service)
- **Redis:** Celery uchun
- **Nginx:** Reverse proxy

### 7.2. CI/CD
- GitHub Actions yoki GitLab CI
- Avtomatik testlar
- Avtomatik deployment

### 7.3. Monitoring
- Error tracking (Sentry)
- Logging (ELK stack yoki boshqa)
- Performance monitoring

---

## 8. XAVFSIZLIK TALABLARI

### 8.1. Autentifikatsiya va Avtorizatsiya
- JWT token (access + refresh)
- Password hashing (bcrypt, salt rounds: 12)
- Phone verification (SMS kod)
- Role-based access control (RBAC)

### 8.2. Ma'lumotlarni Himoya
- HTTPS majburiy
- SQL injection himoyasi
- XSS himoyasi
- CSRF himoyasi
- Rate limiting
- Input validation va sanitization

### 8.3. Ma'lumotlar Bazasi
- Connection pooling
- Backup strategiyasi (kunlik backup)
- Sensitive ma'lumotlarni shifrlash

---

## 9. PERFORMANCE TALABLARI

### 9.1. Frontend
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Image optimization (WebP format)
- Code splitting
- Lazy loading

### 9.2. Backend
- API response time < 500ms (95 percentile)
- Database query optimization
- Caching strategiyasi (Redis)
- Pagination barcha list API'larda

### 9.3. Ma'lumotlar Bazasi
- Connection pooling
- Query optimization
- Indekslar to'g'ri sozlash
- Regular maintenance (VACUUM, ANALYZE)

---

## 10. TESTING

### 10.1. Frontend Testing
- Unit testlar (Jest + React Testing Library)
- Integration testlar
- E2E testlar (Playwright yoki Cypress)

### 10.2. Backend Testing
- Unit testlar (pytest)
- API testlar (pytest + httpx)
- Database testlar

### 10.3. Coverage
- Minimum 70% code coverage

---

## 11. DOKUMENTATSIYA

### 11.1. API Dokumentatsiyasi
- Swagger/OpenAPI (FastAPI avtomatik generatsiya qiladi)
- Postman collection

### 11.2. Kod Dokumentatsiyasi
- Docstring'lar
- README fayllar
- Architecture dokumentatsiyasi

### 11.3. Foydalanuvchi Qo'llanmalari
- Mijozlar uchun qo'llanma
- Admin uchun qo'llanma
- Telegram bot qo'llanmasi

---

## 12. ISHGA TUSHIRISH BOSQICHLARI

### Bosqich 1: Asosiy Infrastruktur (2-3 hafta)
- Database dizayni va migratsiyalar
- Backend API asosiy struktura
- Autentifikatsiya tizimi
- Frontend asosiy struktura
- Admin panel asosiy sahifalar

### Bosqich 2: Mahsulotlar va Katalog (1-2 hafta)
- Mahsulotlar CRUD (admin)
- Kategoriyalar boshqaruvi
- Frontend katalog sahifasi
- Qidiruv va filtrlash

### Bosqich 3: Buyurtma Tizimi (2-3 hafta)
- Bitta buyurtma yaratish
- Buyurtmalar ro'yxati va tafsilotlari
- Admin buyurtma boshqaruvi
- Frontend buyurtma sahifalari

### Bosqich 4: Rejalashtirilgan Buyurtmalar (2 hafta)
- Subscription model va CRUD
- Background job (Celery) sozlash
- Avtomatik buyurtma yaratish
- Frontend subscription sahifalari

### Bosqich 5: To'lov va Tarix (1-2 hafta)
- To'lov tizimi integratsiyasi
- Pul o'tkazmalari tarixi
- Mahsulot o'tkazmalari tarixi
- Frontend hisobot sahifalari

### Bosqich 6: Telegram Bot (2 hafta)
- Bot asosiy struktura
- Autentifikatsiya
- Katalog va buyurtma funksiyalari
- Backend API bilan integratsiya

### Bosqich 7: Testing va Optimizatsiya (2 hafta)
- Unit va integration testlar
- Performance optimizatsiya
- Bug fixes
- Security audit

### Bosqich 8: Deployment va Launch (1 hafta)
- Production environment sozlash
- Deployment
- Monitoring sozlash
- Final testing

---

## 13. QO'SHIMCHA TALABLAR

### 13.1. Ko'p Tillilik
- O'zbek tili (asosiy)
- Rus tili (qo'shimcha)
- next-intl yoki boshqa i18n kutubxona

### 13.2. Responsive Dizayn
- Mobile-first yondashuv
- Barcha qurilmalarda ishlashi

### 13.3. Accessibility
- WCAG 2.1 AA standarti
- Keyboard navigation
- Screen reader qo'llab-quvvatlash

---

## 14. XULOSA

Ushbu texnik topshiriq onlayn do'kon va rejalashtirilgan yetkazib berish tizimining barcha asosiy jihatlarini qamrab oladi. Loyiha quyidagi texnologiyalar asosida ishlab chiqiladi:

- **Frontend:** Next.js 14+ (React)
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **Telegram Bot:** Aiogram 3.x (Python)
- **Background Jobs:** Celery + Redis

Loyiha **B2B model**da ishlaydi, ya'ni faqat loyiha egasi (admin) sotuvchi bo'ladi, barcha mijozlar faqat xaridor sifatida ishlaydi.

Asosiy funksional imkoniyatlar:
1. Mahsulot katalogi va qidiruv
2. Bitta va rejalashtirilgan buyurtmalar
3. To'lov tizimi va tarix
4. Pul va mahsulot o'tkazmalari tarixi
5. Telegram bot orqali buyurtma berish
6. Admin panel - to'liq boshqaruv
7. Real-vaqt bildirishnomalar

Ishga tushirish muddati: **12-16 hafta** (3-4 oy)

---

**Tayyorladi:** [Sizning ismingiz]  
**Sana:** [Hozirgi sana]  
**Versiya:** 1.0

