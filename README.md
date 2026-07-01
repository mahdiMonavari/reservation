<div dir="rtl">

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Vazirmatn&size=30&duration=3000&pause=1000&color=10B981&center=true&vCenter=true&width=600&lines=سیستم+رزرو+آنلاین+نوبت+کلینیک;Online+Medical+Clinic+Booking+System" alt="Typing SVG" />

<br/>

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br/>

[![GitHub repo](https://img.shields.io/badge/GitHub-mahdiMonavari%2Freservation-181717?style=flat-square&logo=github)](https://github.com/mahdiMonavari/reservation)
![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)
![Status](https://img.shields.io/badge/Status-In_Development-orange?style=flat-square)

</div>

---

## 📋 فهرست مطالب | Table of Contents

- [درباره پروژه](#-درباره-پروژه)
- [About Project](#-about-project)
- [اسکرین‌شات‌ها](#-اسکرین‌شات‌ها)
- [ویژگی‌ها](#-ویژگی‌ها)
- [تکنولوژی‌ها](#-تکنولوژی‌ها)
- [نصب و راه‌اندازی](#-نصب-و-راه‌اندازی)
- [ساختار پروژه](#-ساختار-پروژه)

---

## 🏥 درباره پروژه

یک سیستم کامل رزرو آنلاین نوبت برای کلینیک تخصصی زنان، زایمان و طب مکمل.  
این پروژه با هدف دیجیتال کردن فرآیند نوبت‌دهی و مدیریت بیماران طراحی و توسعه یافته است.

کاربران می‌توانند بدون نیاز به تماس تلفنی، در هر ساعتی از شبانه‌روز نوبت خود را آنلاین رزرو کنند.  
سیستم سه پنل مجزا برای **ادمین**، **پزشک** و **بیمار** دارد.

---

## 🌐 About Project

A full-stack online appointment booking system for a specialized Women's Health & Complementary Medicine clinic.

Patients can book appointments 24/7 without phone calls. The system features three separate panels for **Admin**, **Doctor**, and **Patient** with role-based access control.

---

## 📸 اسکرین‌شات‌ها | Screenshots

<table>
  <tr>
    <td align="center"><b>🏠 صفحه اصلی | Home</b></td>
    <td align="center"><b>🔐 ورود | Login</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/mahdiMonavari/reservation/raw/main/screenshots/home.png" alt="Home"/></td>
    <td><img src="https://github.com/mahdiMonavari/reservation/raw/main/screenshots/login.png" alt="Login"/></td>
  </tr>
  <tr>
    <td align="center"><b>🛡️ پنل ادمین | Admin Panel</b></td>
    <td align="center"><b>👤 پنل کاربری | User Panel</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/mahdiMonavari/reservation/raw/main/screenshots/admin.png" alt="Admin"/></td>
    <td><img src="https://github.com/mahdiMonavari/reservation/raw/main/screenshots/user.png" alt="User"/></td>
  </tr>
  <tr>
    <td align="center"><b>📅 تقویم جلالی | Jalali Calendar</b></td>
    <td align="center"><b>⏰ انتخاب ساعت | Time Slots</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/mahdiMonavari/reservation/raw/main/screenshots/calendar.png" alt="Calendar"/></td>
    <td><img src="https://github.com/mahdiMonavari/reservation/raw/main/screenshots/timeslots.png" alt="Time Slots"/></td>
  </tr>
</table>

---

## ✨ ویژگی‌ها | Features

### 👤 پنل کاربری | User Panel
- ✅ ثبت‌نام و ورود با OTP (بدون رمز عبور)
- ✅ رزرو نوبت گام‌به‌گام (انتخاب دکتر ← خدمات ← تاریخ ← ساعت ← تأیید)
- ✅ تقویم جلالی سفارشی با پشتیبانی از تاریخ‌های کاری
- ✅ انتخاب slot‌های ۱۵ دقیقه‌ای با بررسی تداخل زمانی
- ✅ مشاهده و مدیریت همه نوبت‌ها
- ✅ تغییر زمان مراجعه (قبل از تاریخ نوبت)
- ✅ دریافت پیامک تأیید نوبت
- ✅ ویرایش پروفایل با احراز هویت OTP برای تغییر شماره

### 🛡️ پنل ادمین | Admin Panel
- ✅ داشبورد با آمار کلی و نمودار درآمد ماهانه
- ✅ مدیریت کاربران، دکترها و خدمات
- ✅ تقویم حضور پزشکان با امکان تنظیم ساعت کاری
- ✅ مدیریت و تأیید کامنت‌ها
- ✅ مدیریت نوبت‌ها

### 🔧 فنی | Technical
- ✅ JWT Authentication با Access/Refresh Token rotation
- ✅ Dark/Light Mode با SSR (بدون flash)
- ✅ سیستم Role-Based Access Control
- ✅ واکنش‌گرا (Responsive) برای موبایل و دسکتاپ
- ✅ SEO بهینه با متاتگ‌های پویا و Schema.org
- ✅ محافظت از مسیرها با Middleware
- ✅ اعتبارسنجی سمت سرور با `fastest-validator`

---

## 🛠️ تکنولوژی‌ها | Tech Stack

| بخش | ابزارها |
|-----|---------|
| **Frontend** | Next.js 15 (App Router), React 19, Tailwind CSS |
| **State Management** | Zustand |
| **Backend** | Next.js API Routes (Route Handlers) |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, bcryptjs, OTP via SMS |
| **UI** | React Icons, React Hot Toast, Recharts |
| **Calendar** | Custom Jalali Calendar + date-fns-jalali |
| **Validation** | fastest-validator |

---

## 🚀 نصب و راه‌اندازی | Installation

### پیش‌نیازها | Prerequisites

```bash
Node.js >= 18
MongoDB (local or Atlas)
```

### مراحل نصب | Steps

```bash
# کلون کردن پروژه
git clone https://github.com/mahdiMonavari/reservation.git
cd reservation

# نصب وابستگی‌ها
npm install

# ساخت فایل متغیرهای محیطی
cp .env.example .env.local
```

### متغیرهای محیطی | Environment Variables

```env
MONGODB_URI=mongodb+srv://...
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
SMS_API_KEY=your_sms_provider_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

```bash
# اجرا در حالت توسعه
npm run dev

# بیلد برای پروداکشن
npm run build
npm start
```

---

## 📁 ساختار پروژه | Project Structure

```
reservation/
├── app/
│   ├── (main)/          # سایت اصلی
│   │   ├── page.js      # صفحه اصلی
│   │   ├── doctors/     # لیست و پروفایل دکترها
│   │   ├── reservation/ # فرایند رزرو نوبت
│   │   ├── login/
│   │   └── register/
│   ├── (p-admin)/       # پنل ادمین
│   │   └── p-admin/
│   │       ├── page.js  # داشبورد
│   │       ├── users/
│   │       ├── doctors/
│   │       ├── appointments/
│   │       ├── comments/
│   │       ├── services/
│   │       └── schedule/
│   ├── (p-user)/        # پنل کاربری
│   │   └── p-user/
│   │       ├── page.js  # داشبورد
│   │       ├── appointments/
│   │       └── profile/
│   └── api/             # Route Handlers
│       ├── auth/
│       ├── appointments/
│       ├── doctors/
│       ├── services/
│       ├── schedule/
│       ├── comments/
│       ├── otp/
│       └── user/
├── components/
│   ├── modules/         # کامپوننت‌های مشترک
│   │   ├── calendar/    # تقویم جلالی سفارشی
│   │   ├── navbar/
│   │   ├── footer/
│   │   └── ...
│   └── templates/       # کامپوننت‌های صفحات
├── model/               # Mongoose Models
├── store/               # Zustand Stores
├── context/             # React Contexts
├── utiles/              # توابع کمکی
│   ├── auth/
│   ├── DB/
│   └── jalali/
└── validators/          # اعتبارسنجی
```

---

## 🔄 فلوی رزرو نوبت | Booking Flow

```
ثبت‌نام/ورود با OTP
        ↓
  انتخاب متخصص
        ↓
   انتخاب خدمات
        ↓
  انتخاب تاریخ (تقویم جلالی)
        ↓
  انتخاب ساعت (slot 15 دقیقه‌ای)
        ↓
    تأیید و ثبت
        ↓
  دریافت پیامک تأیید
```

---

## 👨‍💻 توسعه‌دهنده | Developer

<div align="center">

**Mahdi Monavari**

[![GitHub](https://img.shields.io/badge/GitHub-mahdiMonavari-181717?style=flat-square&logo=github)](https://github.com/mahdiMonavari)

*این پروژه اولین پروژه پورتفولیو من است و با هدف یادگیری عمیق Next.js و توسعه full-stack ساخته شده.*

*This is my first major portfolio project, built to deeply learn Next.js and full-stack development.*

</div>

---

<div align="center">

⭐ اگه این پروژه برات جالب بود، یه ستاره بهش بده!

⭐ If you found this project interesting, give it a star!

</div>

</div>