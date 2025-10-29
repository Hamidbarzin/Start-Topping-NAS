import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// امن‌سازی هدرها
app.use(helmet({
  contentSecurityPolicy: false  // غیرفعال کردن CSP برای رفع مشکلات
}));

// لاگینگ و فشرده‌سازی
app.use(morgan("tiny"));
app.use(compression());

// غیرفعال کردن کامل Cache
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// Routeهای کامل برای همه داشبوردها
// Main unified site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "site.html")); // سایت یکپارچه
});

// سرو فایل‌های public (باید بعد از route ها باشه)
app.use(express.static(path.join(__dirname, "public")));

app.get("/classic", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // لیست لینک‌ها
});

app.get("/roadmap", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "barzin-roadmap.html")); // نسخه تعاملی با Chart
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html")); // با Sidebar
});

app.get("/minimal", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "minimal.html")); // ساده
});

app.get("/interactive", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "barzin-roadmap.html")); // نگه‌داری برای سازگاری
});

app.get("/classic", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // نگه‌داری برای سازگاری
});

app.get("/topping", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "topping-courier.html"));
});

app.get("/coach", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "coach.html"));
});

app.get("/test-xai", (req, res) => {
  res.sendFile(path.join(__dirname, "test-xai-api.html"));
});

// هندل 404
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - صفحه پیدا نشد</title>
      <style>
        body{
          font-family:'Vazirmatn',sans-serif;
          background:#0b0b0f;
          color:#e9e9ee;
          padding:40px;
          display:flex;
          align-items:center;
          justify-content:center;
          height:100vh;
          margin:0;
          flex-direction:column
        }
        h1{font-size:4em;margin:0;color:#d4af37}
        p{font-size:1.2em;margin:20px 0}
        a{
          color:#e5c45e;
          text-decoration:none;
          font-weight:700;
          border-bottom:2px solid #e5c45e;
          padding-bottom:2px;
          transition:.3s;
          margin: 0 10px;
        }
        a:hover{color:#d4af37;border-bottom-color:#d4af37}
      </style>
    </head>
    <body>
      <h1>404</h1>
      <p>صفحه پیدا نشد.</p>
      <p>
        <a href="/">صفحه اصلی</a>
        <a href="/roadmap">داشبورد تعاملی</a>
        <a href="/dashboard">داشبورد اصلی</a>
      </p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`\n🎉 سرور راه‌اندازی شد روی پورت ${PORT}!`);
  console.log(`\n🌐 لینک اصلی:`);
  console.log(`   http://localhost:${PORT}/?v=1`);
  console.log(`\n📂 صفحات:`);
  console.log(`   🏠 صفحه اصلی: http://localhost:${PORT}/`);
  console.log(`   📊 Dashboard: http://localhost:${PORT}/dashboard`);
  console.log(`   🗺️ Roadmap: http://localhost:${PORT}/roadmap`);
  console.log(`   🤖 مربی کسب‌وکار: http://localhost:${PORT}/coach`);
  console.log(`   🧪 تست xAI API: http://localhost:${PORT}/test-xai`);
  console.log(`   🚀 Topping: http://localhost:${PORT}/topping`);
  console.log(`   ⚡ Minimal: http://localhost:${PORT}/minimal`);

  // Debug info for Render
  console.log(`\n🔍 Debug Info:`);
  console.log(`   Working directory: ${process.cwd()}`);
  console.log(`   __dirname: ${__dirname}`);
  console.log(`   PORT from env: ${process.env.PORT}`);
  console.log(`   Node version: ${process.version}`);
});
