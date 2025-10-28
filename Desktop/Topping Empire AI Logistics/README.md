# 🚀 Barzin Holding Roadmap - سایت داشبورد

## 📋 معرفی

دو داشبورد زیبا و تعاملی برای ردیابی مسیر راه Barzin Holding:

1. **نسخه تعاملی (Black & Gold)** - `/`
   - Progress bars تعاملی
   - سیستم یادداشت‌گذاری
   - نمره‌دهی KPI
   - چارت رشد با Chart.js
   - Achievement system

2. **نسخه کلاسیک (Gradient Cards)** - `/classic`
   - کارت‌های رنگی زیبا
   - گرادیان‌های جذاب
   - مینیمال و ساده

## 🛠️ نصب و اجرا

### پیش‌نیازها
- Node.js 18+ 
- npm

### نصب
```bash
npm install
```

### اجرا
```bash
npm start
# یا برای توسعه با auto-reload:
npm run dev
```

### دسترسی
- صفحه اصلی: http://localhost:3000
- نسخه کلاسیک: http://localhost:3000/classic

## 📁 ساختار پروژه

```
barzin-roadmap-site/
├── package.json
├── server.js
├── public/
│   ├── index.html              # نسخه گرادیان/کارت‌ها
│   └── barzin-roadmap.html     # نسخه مشکی-طلایی تعاملی
└── README.md
```

## 🌐 دیپلوی

### Render.com

1. Repository خود را روی GitHub بسازید

2. در Render.com:
   - New → Web Service
   - Connect repository
   
3. تنظیمات:
   ```
   Build Command: npm install
   Start Command: npm start
   Environment: NODE_VERSION=18
   ```

4. دیپلوی کنید!

### Vercel

```bash
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## ✨ ویژگی‌ها

### نسخه تعاملی (`/`)
- ✅ Progress bars با امتیازدهی
- ✅ سیستم یادداشت‌گذاری
- ✅ Achievement indicators
- ✅ چارت رشد تعاملی
- ✅ Focus Mode
- ✅ Export به JSON
- ✅ Print Mode

### نسخه کلاسیک (`/classic`)
- ✅ طراحی گرادیانی زیبا
- ✅ 10 کارت استراتژیک
- ✅ RTL کامل
- ✅ Responsive

## 🔒 امنیت

- Helmet.js برای امنیت headers
- Compression برای بهینه‌سازی
- Content Security Policy (CSP)
- Morgan برای لاگینگ

## 📝 یادداشت‌ها

- همه داده‌ها در localStorage مرورگر ذخیره می‌شوند
- نیازی به دیتابیس نیست
- 100% client-side storage

## 👨‍💼 توسعه‌دهنده

**حمیدرضا برزین** - Toronto, Canada

ساخته‌شده با ❤️ برای Topping Empire AI Logistics

---

© 2024 Barzin Holding. All rights reserved.
