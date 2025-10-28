# راهنمای کامل فعال‌سازی xAI API برای Topping Empire

## 🎯 نمای کلی
این راهنما به شما کمک می‌کند که xAI API را کامل فعال کنید و در پروژه خود ادغام کنید.

---

## 📋 گام 1: ثبت‌نام و دریافت اشتراک

### 1.1 ثبت‌نام
1. به [console.x.ai](https://console.x.ai) بروید
2. با حساب X (x.com) خود وارد شوید
3. بعد از ورود، به داشبورد هدایت می‌شوید

### 1.2 انتخاب اشتراک مناسب

#### گزینه A: X Premium+ ($40/ماه)
- دسترسی به Grok 3 و Grok 3-mini
- مناسب برای استفاده عمومی
- $25 اعتبار رایگان ماهانه در بتا

#### گزینه B: SuperGrok ($50/ماه) - پیشنهادی
- دسترسی به Grok 4 (بهترین کیفیت)
- مناسب برای تحلیل پیشرفته
- محدودیت بالاتر نرخ

### 1.3 دریافت اشتراک
1. در console.x.ai، بخش **"Billing"** را باز کنید
2. **"Upgrade to Premium"** یا **"Subscribe to SuperGrok"** را انتخاب کنید
3. اطلاعات پرداخت را وارد کنید
4. منتظر تأیید بمانید (معمولاً 24-48 ساعت)

---

## 🔑 گام 2: ایجاد و فعال‌سازی کلید API

### 2.1 ایجاد کلید جدید
1. در داشبورد، به بخش **"Keys"** بروید
2. روی **"Create New Key"** کلیک کنید
3. نام کلید را وارد کنید (مثلاً: `Topping-Empire-Prod`)
4. روی **"Create"** کلیک کنید
5. **⚠️ مهم**: کلید را فوراً کپی کنید - دیگر نمایش داده نمی‌شود!

### 2.2 بررسی وضعیت کلید
1. در لیست کلیدها، وضعیت باید **"Active"** باشد
2. اگر **"Pending"** است، 24-48 ساعت صبر کنید
3. اگر بعد از 48 ساعت هنوز غیرفعال است:
   - ایمیل به support@x.ai بفرستید
   - یا تیکت در console.x.ai ایجاد کنید

### 2.3 ذخیره امن کلید
```bash
# در فایل .env (توصیه می‌شود):
XAI_API_KEY=your-api-key-here

# یا در localStorage (برای تست):
localStorage.setItem('xai_api_key', 'your-api-key-here');
```

---

## 🐛 گام 3: رفع مشکلات رایج

### مشکل 1: خطای 401 - کلید API معتبر نیست
**علت**: کلید غیرفعال یا اشتباه  
**راه‌حل**:
```javascript
// بررسی کلید در console.x.ai
// اگر منقضی شده، کلید جدید بسازید
const API_KEY = 'your-new-key';
```

### مشکل 2: خطای 429 - محدودیت نرخ
**علت**: درخواست‌های زیاد  
**راه‌حل**: پیاده‌سازی exponential backoff
```javascript
async function getAIAdviceWithRetry(tasks, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await getAIAdvice(tasks);
        } catch (error) {
            if (error.status === 429) {
                const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
                await new Promise(r => setTimeout(r, delay));
            } else {
                throw error;
            }
        }
    }
}
```

### مشکل 3: خطای 404 - مدل یافت نشد
**علت**: نام مدل اشتباه  
**راه‌حل**: استفاده از aliases یا مدل‌های صحیح
```javascript
// ✅ صحیح
const models = [
    'grok-beta',        // عمومی
    'grok-2-1212',     // پایدار
    'grok-2-vision',   // با بینایی
    'grok-2-latest'    // آخرین نسخه
];

// ❌ نامعتبر
const invalid = 'grok-4'; // نیاز به SuperGrok
```

### مشکل 4: تأخیر در فعال‌سازی کلید
**راه‌حل**:
1. صبر کنید (معمولاً 24-48 ساعت)
2. بررسی کنید billing فعال باشد
3. ایمیل به support@x.ai

### مشکل 5: محدودیت کشورها
**راه‌حل**: 
- بررسی eligibility در console.x.ai
- استفاده از proxy/VPN (اگر قانونی است)
- جایگزین: OpenAI GPT-4o-mini

---

## 💻 گام 4: ادغام در پروژه

### 4.1 ساختار کلی
```javascript
// در coach.html

// API Configuration
const XAI_CONFIG = {
    apiKey: 'YOUR_XAI_API_KEY_HERE', // Replace with your actual API key
    model: 'grok-beta',
    endpoint: 'https://api.x.ai/v1/chat/completions'
};

// تابع اصلی
async function getAIAdvice(incompleteTasks) {
    const context = incompleteTasks.map(t => 
        `کار: "${t.title}" | اولویت: ${t.priority} | دلیل: ${t.reason}`
    ).join('\n');

    const prompt = `به عنوان مربی کسب‌وکار حرفه‌ای، تحلیل کن و پیشنهاد بده:\n\n${context}`;

    try {
        const response = await fetch(XAI_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${XAI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: XAI_CONFIG.model,
                messages: [
                    { role: 'system', content: 'مربی کسب‌وکار حرفه‌ای به زبان فارسی' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('❌ خطای xAI:', error);
        return null; // Fallback to local suggestions
    }
}
```

### 4.2 مدیریت خطاها با Fallback
```javascript
async function updateAI() {
    // تحلیل محلی
    let suggestions = [...localSuggestions];

    // تلاش برای دریافت از xAI
    try {
        const aiAdvice = await getAIAdvice(incompleteTasks);
        if (aiAdvice) {
            suggestions.push(...aiAdvice.split('\n'));
        }
    } catch (error) {
        console.log('⚠️ استفاده از پیشنهادات محلی');
    }

    // نمایش نهایی
    displaySuggestions([...new Set(suggestions)]);
}
```

### 4.3 تست در مرورگر
```javascript
// باز کردن Console (F12)
// اجرای این کد:

async function testXAI() {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_XAI_API_KEY_HERE' // Replace with your actual API key
        },
        body: JSON.stringify({
            model: 'grok-beta',
            messages: [
                { role: 'user', content: 'سلام! تست اتصال' }
            ],
            max_tokens: 100
        })
    });
    
    const data = await response.json();
    console.log('✅ تست موفق:', data);
}

testXAI();
```

---

## 📊 گام 5: نظارت بر هزینه‌ها

### 5.1 محاسبه توکن‌ها
```javascript
function estimateTokens(text) {
    // تقریب: 1 توکن ≈ 4 کاراکتر فارسی
    return Math.ceil(text.length / 4);
}

function estimateCost(prompt, model) {
    const tokens = estimateTokens(prompt);
    const costs = {
        'grok-beta': 0.001,      // $1/1000 tokens
        'grok-2-1212': 0.0015,   // $1.5/1000 tokens
        'grok-2-vision': 0.002   // $2/1000 tokens
    };
    
    const cost = (tokens / 1000) * (costs[model] || 0.001);
    console.log(`💰 هزینه تقریبی: $${cost.toFixed(4)}`);
    
    return cost;
}
```

### 5.2 هشدار هزینه
```javascript
const DAILY_LIMIT = 10; // $10 per day

let dailySpent = parseFloat(localStorage.getItem('daily_spent') || '0');

function trackCost(cost) {
    dailySpent += cost;
    localStorage.setItem('daily_spent', dailySpent.toString());
    
    if (dailySpent > DAILY_LIMIT) {
        alert('⚠️ حد هزینه روزانه رد شد!');
    }
}
```

---

## 🎯 گام 6: بهینه‌سازی و بهبود

### 6.1 استفاده از Cached Responses
```javascript
const cache = new Map();

async function getAIAdviceCached(incompleteTasks) {
    const key = JSON.stringify(incompleteTasks);
    
    if (cache.has(key)) {
        console.log('✅ استفاده از کش');
        return cache.get(key);
    }
    
    const result = await getAIAdvice(incompleteTasks);
    cache.set(key, result);
    
    return result;
}
```

### 6.2 Rate Limiting
```javascript
let lastRequest = 0;
const MIN_INTERVAL = 5000; // 5 seconds

async function getAIAdviceWithLimiting(incompleteTasks) {
    const now = Date.now();
    if (now - lastRequest < MIN_INTERVAL) {
        throw new Error('Please wait 5 seconds');
    }
    
    lastRequest = now;
    return await getAIAdvice(incompleteTasks);
}
```

### 6.3 پیشنهاد: انتقال به Backend
```javascript
// server.js (Node.js + Express)
app.post('/api/ai-coach', async (req, res) => {
    try {
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.XAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'grok-beta',
                messages: req.body.messages,
                max_tokens: 500
            })
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// در frontend:
async function getAIAdvice(incompleteTasks) {
    const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...] })
    });
    
    return await response.json();
}
```

---

## 📝 گام 7: خلاصه و چک‌لیست

### ✅ چک‌لیست فعال‌سازی
- [ ] اشتراک X Premium+ یا SuperGrok خریداری شده
- [ ] کلید API ایجاد شده و وضعیت "Active"
- [ ] کلید در کد درج شده
- [ ] تست اتصال با console.log موفق
- [ ] مدیریت خطا پیاده‌سازی شده
- [ ] Fallback به پیشنهادات محلی

### 🎯 لینک‌های مفید
- [Console xAI](https://console.x.ai)
- [مستندات مدل‌ها](https://docs.x.ai/docs/models)
- [قیمت‌گذاری](https://docs.x.ai/docs/pricing)
- [پشتیبانی](mailto:support@x.ai)

### 💡 نکات مهم
1. **امنیت**: کلید API را در frontend نگذارید (استفاده از backend)
2. **محدودیت**: نرخ‌ها را رعایت کنید (2M tokens/min)
3. **هزینه**: از هزینه‌ها آگاه باشید
4. **به‌روزرسانی**: تاریخ deprecation Live Search را چک کنید

---

## 🚀 اجرای نهایی

```bash
# 1. اطمینان از اجرای سرور
npm start

# 2. باز کردن مرورگر
# http://localhost:8080/coach

# 3. تست دکمه AI
# کلیک روی "🔮 دریافت مشاوره با xAI"

# 4. بررسی Console (F12)
# باید: "🔄 در حال اتصال به xAI API..."
# سپس: "✅ پاسخ دریافت شد: {...}"
```

---

## 🎉 موفق باشید!

اگر مشکلی داشتید:
1. Console را بررسی کنید
2. وضعیت کلید را چک کنید
3. اشتراک را بررسی کنید
4. با support@x.ai تماس بگیرید

**تاریخ به‌روزرسانی**: 27 اکتبر 2025  
**پروژه**: Topping Empire AI Logistics  
**توسعه‌دهنده**: حمیدرضا برزین، تورنتو، کانادا



