# يقين — برنامج حسابات مواد البناء (Electron)

## تشغيل للتجربة
    npm install
    npm start

## عمل ملف التسطيب Setup.exe
- على ويندوز: ثبّت Node.js (نسخة LTS) ثم اضغط مرتين على `build_windows.bat` → هتلاقي الملف في فولدر `dist`.
- بدون تسطيب أي حاجة: ارفع الفولدر على GitHub (مستودع Private) وشغّل Actions → "Build Windows installer" ونزّل الملف من الـ Artifacts.

## التفعيل (للمطوّر فقط)
غيّر `SECRET` في `src/secret.js` قبل التوزيع، ثم:
    npm run keygen
والصق كود جهاز العميل → يطلع مفتاح التفعيل وكود استرجاع كلمة السر.
**لا ترفع keygen.js على GitHub ولا تسلّمه للعميل** (موجود في .gitignore).

## الاختبارات
    npm test

## الأيقونة
ضع صورتك باسم `build/icon.png` (مربعة 512×512 أو أكبر، PNG) وانسخها أيضًا إلى `renderer/icon.png` ثم أعد البناء.
