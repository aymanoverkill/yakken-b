// أداة المطوّر فقط - لا توزعها مع العميل ولا ترفعها على GitHub
// الاستخدام:  node keygen.js            (أو: npm run keygen)
const readline = require('readline');
const core = require('./src/core');
console.log('Version fingerprint:', core.fingerprint(), '(لازم يساوي البصمة الظاهرة في شاشة الترخيص عند العميل)');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = () => rl.question('\nكود جهاز العميل (فاضي للخروج): ', (mc) => {
  if (!mc.trim()) return rl.close();
  console.log('  مفتاح التفعيل    :', core.sig('LIC', mc));
  console.log('  كود استرجاع السر :', core.sig('RST', mc));
  ask();
});
ask();
