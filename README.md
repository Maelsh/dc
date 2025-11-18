[analysis.md](https://github.com/user-attachments/files/23600790/analysis.md)
# وثيقة التحليل الشاملة لمنصة Dueli

## 1. نظرة عامة على المشروع

### 1.1 الفكرة الجوهرية
**Dueli** هي منصة تواصل اجتماعي قائمة على **التنافس** وليس على دوائر المعارف التقليدية. المستخدمون يتواصلون ويظهرون مهاراتهم عبر منافسات حية مباشرة أمام جمهور يقيّم ويعلّق، والأرباح توزع بناءً على الأداء.

### 1.2 الأهداف الرئيسية
1. **تحويل النزاعات إلى حوار حضاري** - خاصة في القسم الحواري
2. **إتاحة المشاركة العلمية للجمهور** - كسر احتكار النخبة للعلم
3. **منصة عادلة للمواهب** - فرصة للجميع بلا قيود قنوات تلفزيونية
4. **الشفافية المالية** - 80% للمتنافسين، 20% للإدارة
5. **مفتوحة المصدر** - للمساهمة المجتمعية

---

## 2. أنواع المستخدمين

### 2.1 المتنافس (Competitor)
**الدور:** منشئ المنافسات والمشارك فيها
**الوظائف:**
- إنشاء منافسة جديدة وتحديد قوانينها
- قبول/رفض دعوات المنافسة
- التحكم في البث المباشر (كاميرا/صوت/مشاركة شاشة)
- التبديل بين الكاميرا ومشاركة الشاشة أثناء البث
- رفض عرض إعلان معين (حسب مبادئه)
- إدخال بيانات بنكية مشفرة لاستلام الأرباح
- عرض سجل الأرباح والفواتير

### 2.2 المشاهد المسجل (Registered Viewer)
**الدور:** جمهور المنصة الفعّال
**الوظائف:**
- مشاهدة المنافسات المباشرة والمسجلة
- **تقييم المتنافسين أثناء المنافسة** (هذا التقييم يحدد توزيع الأرباح)
- التعليق على المنافسات
- متابعة المتنافسين
- مراسلة المستخدمين الآخرين
- البحث عن منافسات حسب (القسم، المجال، اللغة، الدولة)
- رؤية معلومات شفافة عن المتنافسين:
  - عدد المتابعين
  - عدد البلاغات ضدهم
  - التقييم العام

### 2.3 المشاهد غير المسجل (Guest Viewer)
**الدور:** زائر بدون حساب
**الوظائف:**
- **المشاهدة فقط** (لا تقييم، لا تعليق، لا مراسلة)

### 2.4 المدير/المشرف (Administrator)
**الدور:** إدارة المنصة والإشراف
**الوظائف:**
- مراجعة البلاغات
- اتخاذ إجراءات (تعليق حساب، إلغاء منافسة، حذف محتوى)
- **إجباري:** كتابة سبب نصي لكل إجراء عقابي (يُخزن ويُعرض للجمهور)
- **قيد:** لا يمكنهم التقييم أو التعليق أو المراسلة كمستخدمين عاديين

---

## 3. أقسام المنافسات

### 3.1 قسم الحوار (Dialogue Section)
**المجالات:**
- حوارات الأديان والمذاهب
- الأيديولوجيات السياسية
- الأنظمة الاقتصادية
- قضايا الساعة
- **النزاعات الأخرى** (قسم فرعي مهم جداً)

**الهدف:** تحويل الصراعات إلى حوار حضاري

### 3.2 قسم العلوم (Science Section)
**المجالات:**
- جميع العلوم (فيزياء، رياضيات، طب، إلخ)
- مناقشة النظريات العلمية
- عرض نظريات جديدة من علماء مغمورين

**الهدف:** إشراك الجمهور في العلم وإتاحة الفرصة للعلماء غير المشهورين

### 3.3 قسم المواهب (Talent Section)
**المجالات:**
- المواهب البدنية (رياضة، استعراضات، إلخ)
- المواهب الصوتية (غناء، تقليد، إلقاء)
- المواهب النفسية (ذكاء، ذاكرة، إلخ)
- المواهب الرياضية

**الهدف:** منصة مفتوحة لكل موهوب ليُرى ويربح من موهبته

---

## 4. دورة حياة المنافسة (Challenge Lifecycle)

### المرحلة 1: الإنشاء (Creation)
1. المستخدم يختار القسم (حوار/علوم/مواهب)
2. يختار المجال الفرعي
3. **يضع قوانين المنافسة:**
   - **خيارات محددة:**
     - مدة المنافسة الإجمالية
     - عدد الجولات (إن وُجد)
     - مدة كل جولة
     - نظام التناوب (إن وُجد)
   - **نص حر:** شروط إضافية يكتبها المنشئ (مثل: موضوع النقاش، المصادر المسموحة، آداب الحوار، إلخ)
4. يحدد موعد المنافسة (اختياري)
5. المنافسة تُنشأ وتُعرض في قائمة "المنافسات المنتظرة لمنافس"

### المرحلة 2: المطابقة (Matching)
**سيناريو أ:** المنشئ يدعو منافساً
- يبحث عن مستخدمين في نفس المجال
- يرسل دعوة
- المدعو يرى شروط المنافسة
- يوافق أو يرفض

**سيناريو ب:** منافس يتقدم للمنافسة المنشأة
- يجد منافسة معروضة تناسبه
- يقدم طلب مشاركة
- المنشئ يوافق أو يرفض

### المرحلة 3: البث المباشر (Live Competition)
1. **بدء البث:** المنافسة تبدأ في الموعد المحدد

2. **نظام البث (YouTube Integration):**
   - المتنافس يربط حساب YouTube الخاص به مسبقاً
   - المنصة تتكامل مع YouTube API
   - عند بدء المنافسة:
     - المنصة تبدأ بث تلقائي على قناة كل متنافس
     - البث يتم من خلال واجهتنا لكن يُنشر على YouTube
     - المنصة تعرض البثَيْن معاً في واجهة واحدة للمشاهدين

3. **تحكم المتنافس:**
   - فتح/إغلاق الكاميرا
   - فتح/إغلاق الصوت
   - مشاركة الشاشة
   - **التبديل السلس بين الكاميرا والشاشة**

4. **الجمهور:**
   - المشاهدون يدخلون الغرفة على منصتنا
   - المسجلون يقيّمون ويعلّقون **أثناء** المنافسة
   - غير المسجلين يشاهدون فقط

5. **نظام الإعلانات (مستقل ومدار من الإدارة):**
   - الإدارة تختار منافسة معينة مسبقاً
   - تضع إعلاناً من الإعلانات المدفوعة
   - مدة العرض = حسب المبلغ المدفوع
   - الإعلان يُعرض أثناء المنافسة
   - **المتنافس يمكنه رفض إعلان معين** (حسب مبادئه)
     - عند الرفض: الإعلان يُخفى فوراً ويُسجل الرفض
     - الأرباح تُحسب من الإعلانات المعروضة فعلياً فقط

### المرحلة 4: التقييم والأرباح (Rating & Revenue)
1. **التقييم الفوري:** أثناء المنافسة، الجمهور يقيّم كل متنافس
2. **حساب الأرباح:**
   - إجمالي أرباح الإعلانات = X
   - نسبة الإدارة: 20% من X
   - نسبة المتنافسين: 80% من X
   - تُوزع الـ 80% بين المتنافسين حسب نسبة تقييمهم
   - **مثال:**
     - المتنافس A حصل على 70% من التقييمات
     - المتنافس B حصل على 30% من التقييمات
     - A يأخذ: 70% من (80% من X)
     - B يأخذ: 30% من (80% من X)

### المرحلة 5: التسجيل والأرشفة (Recording)
- المنافسة تُسجل تلقائياً على **قنوات YouTube الخاصة بالمتنافسين**
- المنصة تحفظ **روابط** الفيديوهات من YouTube
- في قسم "المنافسات المسجلة" على منصتنا:
  - نعرض الفيديوهات المدمجة (Embedded) من YouTube
  - نعرض التقييمات والتعليقات التي تمت أثناء البث
- يمكن مشاهدتها لاحقاً وإعادة التقييم والتعليق

---

## 5. النظام المالي (Financial System)

### 5.1 مصادر الدخل
1. **الإعلانات** (المصدر الأساسي للـMVP)
   - شركات/أفراد يدفعون للإدارة لعرض إعلاناتهم
   - الإدارة تختار المنافسة المناسبة للإعلان
2. **التبرعات** (مستقبلاً)

### 5.2 نظام الإعلانات
**كيف يعمل:**
1. معلن يدفع مبلغاً للمنصة
2. الإدارة تختار منافسة مناسبة لعرض الإعلان
3. تحدد مدة العرض حسب المبلغ المدفوع
4. الإعلان يُعرض أثناء المنافسة
5. **المتنافس له حق الرفض:**
   - إذا رأى الإعلان يخالف مبادئه
   - يضغط "رفض الإعلان"
   - الإعلان يختفي فوراً
   - يُسجل الرفض في النظام
6. الأرباح تُحسب من الإعلانات **المعروضة فعلياً** فقط

### 5.3 توزيع الأرباح
**الصيغة:**
- إجمالي أرباح الإعلانات في منافسة = X
- **20% للإدارة:** لتغطية التكاليف والتطوير
- **80% للمتنافسين:** توزع حسب نسبة التقييم

**مثال تفصيلي:**
```
إجمالي أرباح المنافسة = 1000$
- 20% للإدارة = 200$
- 80% للمتنافسين = 800$

المتنافس A حصل على 70% من التقييمات
المتنافس B حصل على 30% من التقييمات

A يأخذ: 70% من 800$ = 560$
B يأخذ: 30% من 800$ = 240$
```

### 5.4 آلية الدفع
1. المتنافس يدخل بياناته البنكية في الإعدادات
2. البيانات تُشفر بـ **256-bit AES** قبل التخزين
3. بعد انتهاء المنافسة:
   - النظام يحسب أرباح المتنافس تلقائياً
   - يُنشئ فاتورة
   - تُضاف إلى سجل الأرباح
4. المتنافس يمكنه رؤية:
   - سجل كل منافساته وأرباحها
   - إجمالي الأرباح
   - الفواتير المُصدرة
   - حالة الدفع (قيد الانتظار/تم الدفع)

---

## 6. نظام الشفافية (Transparency System)

### 6.1 البيانات الشفافة المتاحة للجمهور
عن كل متنافس:
1. **عدد المتابعين**
2. **عدد البلاغات المقدمة ضده**
3. **التقييم العام** (متوسط تقييماته في كل منافساته)

### 6.2 الشفافية في الوقت الفعلي
أثناء المنافسة، يجب عرض:
1. **عدد المشاهدين الحالي** (يتحدث لحظياً)
2. **التقييمات الفورية** (لكل متنافس)
3. **عدد التعليقات**

**متطلب تقني:** تحديث فوري (sub-second latency) عبر WebSockets

---

## 7. نظام البحث والفلترة (Search & Filtering)

### 7.1 فلاتر المنصة
**إلزامي للمستخدم:**
- **اللغة:** المستخدم يختار لغته
- **الدولة:** المستخدم يختار دولته
- **النتيجة:** يرى فقط المنافسات بلغته ومن دولته (افتراضياً)

**يمكن تغييره:** المستخدم يمكنه تبديل الفلتر لرؤية محتوى من دول ولغات أخرى

### 7.2 أنواع البحث
1. **بحث عن منافسات:**
   - حسب القسم (حوار/علوم/مواهب)
   - حسب المجال الفرعي
   - حسب الحالة (مباشر/مسجل/منتظر منافس)
   - حسب اللغة والدولة

2. **بحث عن مستخدمين:**
   - للمتابعة
   - للدعوة للمنافسة

---

## 8. البروفايل الشخصي (User Profile)

### 8.1 معلومات البروفايل
- الاسم والصورة الشخصية
- النبذة التعريفية
- القسم/المجالات المفضلة
- **عدد المتابعين**
- **عدد البلاغات** (شفاف)
- **التقييم العام**
- إحصائيات:
  - عدد المنافسات المشارك فيها
  - عدد الانتصارات (الأعلى تقييماً)
  - إجمالي الأرباح (اختياري للمستخدم إظهاره)

### 8.2 وظائف البروفايل
1. **عرض المنافسات السابقة**
2. **جدولة المنافسات القادمة**
3. **إضافة منشورات** (تحديثات نصية/صور)
4. **قائمة المتابعين والمتابَعين**
5. **زر المراسلة** (للمستخدمين المسجلين)
   - نمط بريدي (Inbox)
   - **الحظر:** المستخدم يمكنه حظر أي مستخدم من مراسلته
   - المحظورون لا يمكنهم إرسال رسائل له
6. **زر المتابعة**
7. **ربط حساب YouTube** (للمتنافسين)

---

## 9. نظام البلاغات والإشراف (Reporting & Moderation)

### 9.1 أنواع البلاغات
1. **محتوى مسيء/عنيف**
2. **انتهاك قوانين المنافسة**
3. **احتيال مالي**
4. **سلوك غير أخلاقي**
5. **محتوى مضلل/كاذب**

### 9.2 دور المشرف
1. **مراجعة البلاغ:** رؤية المحتوى المُبلغ عنه
2. **اتخاذ قرار:**
   - رفض البلاغ (لا إجراء)
   - تحذير المستخدم
   - تعليق الحساب مؤقتاً
   - حظر دائم
   - إلغاء منافسة
   - حذف محتوى

3. **كتابة السبب (إلزامي):**
   - عند أي إجراء عقابي، المشرف **مُجبر** على كتابة سبب نصي واضح
   - هذا السبب يُخزن في قاعدة البيانات
   - **يُعرض علناً** للجمهور (شفافية كاملة)

### 9.3 قيود المشرفين
- **لا يمكنهم:** التقييم، التعليق، المراسلة، المتابعة، المشاركة في المنافسات
- **دورهم:** إداري صرف

---

## 10. نظام الإشعارات (Notifications)

### 10.1 أنواع الإشعارات
1. **دعوة لمنافسة**
2. **قبول/رفض دعوة**
3. **بدء منافسة متابَع**
4. **تعليق جديد على منافستك**
5. **متابع جديد**
6. **رسالة جديدة**
7. **وصول أرباح جديدة**
8. **تحذير/إجراء من الإدارة**

---

## 11. المتطلبات التقنية (Technical Requirements)

### 11.1 الأداء
- **تحديث فوري:** sub-second latency للتقييمات والمشاهدين
- **دعم 5000 مستخدم متزامن** (هدف قابلية التوسع)

### 11.2 الأمان
- **تشفير البيانات الحساسة:** 256-bit AES
- **JWT Authentication**
- **HTTPS إلزامي**
- **حماية من CSRF/XSS**

### 11.3 التوثيق
- **90% من الكود يجب أن يحتوي على تعليقات** (للمجتمع المفتوح المصدر)

### 11.4 البث المباشر
- **MVP:** التكامل مع **YouTube Live Streaming API**
  - المتنافسون يربطون حسابات YouTube
  - المنصة تبدأ البث تلقائياً على قنواتهم
  - التسجيلات تُحفظ على YouTube
  - المنصة تعرض البث المدمج
- **المستقبل:** WebRTC + Kurento Media Server (للبث المباشر من سيرفراتنا)

### 11.5 قاعدة البيانات
- **MongoDB**
- **Collections الرئيسية:**
  - **Users** (username, email, password, role, youtubeLinked, bankDetails, followers, reportCount, overallRating)
  - **Challenges** (creator, opponent, category, field, rules, scheduledTime, status, youtubeLinks, adRevenue)
  - **Ratings** (challenge, rater, competitorRated, score, timestamp)
  - **Comments** (challenge, author, content, timestamp)
  - **Reports** (reporter, reportedUser, reason, status, adminAction, actionReason)
  - **Transactions** (user, challenge, amount, status, invoice)
  - **Notifications** (user, type, content, read, timestamp)
  - **Advertisements** (advertiser, content, paidAmount, duration, assignedChallenge)
  - **Messages** (sender, receiver, subject, content, timestamp, read)
  - **BlockedUsers** (user, blockedUser, timestamp)

---

## 12. واجهة المستخدم (UI/UX)

### 12.1 الصفحات الرئيسية
1. **الصفحة الرئيسية/Landing Page**
2. **التسجيل/تسجيل الدخول**
3. **لوحة التحكم (Dashboard):**
   - منافسات مباشرة حالياً
   - منافسات مقترحة لك
   - منافسات المتابَعين
   - إشعاراتك
4. **صفحة إنشاء منافسة**
5. **صفحة غرفة المنافسة المباشرة**
6. **صفحة البروفايل**
7. **صفحة البحث**
8. **صفحة الرسائل**
9. **صفحة الإعدادات:**
   - البيانات الشخصية
   - **ربط حساب YouTube** (OAuth)
   - البيانات البنكية (مشفرة)
   - الفلاتر (لغة/دولة)
   - الخصوصية
   - **قائمة المحظورين** (إدارة المستخدمين المحظورين من المراسلة)
10. **لوحة الإدارة (للمشرفين):**
    - إدارة البلاغات
    - **إدارة الإعلانات** (إضافة إعلان، تعيينه لمنافسة، متابعة الأرباح)

### 12.2 متطلبات UI
- **متعدد اللغات:** دعم كل اللغات الرئيسية
- **RTL Support:** للعربية وغيرها
- **Responsive:** يعمل على كل الأجهزة
- **Dark Mode:** (اختياري للمستقبل)

---

## 14. نقاط حرجة تحتاج توضيح

### ✅ التوضيحات المؤكدة:

1. **التقييم:** ✅ يتم **أثناء** المنافسة (Real-time)

2. **قوانين المنافسة:** 
   - ✅ **خيارات محددة:** مدة المنافسة، عدد الجولات، وقت كل جولة
   - ✅ **نص حر:** المنشئ يكتب شروط إضافية حسب طبيعة المنافسة

3. **الإعلانات:** 
   - ✅ **نظام مستقل خاص بالمنصة**
   - الإدارة تختار منافسة معينة
   - تضع إعلان مدفوع الثمن في المنافسة
   - مدة عرض الإعلان = حسب المبلغ المدفوع
   - الأرباح توزع على المتنافسين (80/20)

4. **البث من YouTube:**
   - ✅ المتنافس يربط حساب YouTube الخاص به
   - ✅ المنصة تتكامل مع YouTube API
   - ✅ البث يتم **تلقائياً** من خلال منصتنا على قناة المتنافس
   - ✅ التسجيل يُحفظ على قناة YouTube الخاصة بالمتنافس

5. **المتابعة والرسائل:**
   - ✅ الرسائل نمط **بريدي** (Inbox, ليس Chat فوري)
   - ✅ المستخدم يمكنه **حظر** مستخدمين معينين من مراسلته
   - المتابعة تتيح رؤية منافسات المتابَع والإشعارات

6. **المنافسات المسجلة:**
   - ✅ تُخزن على **YouTube** (قنوات المتنافسين)
   - المنصة تعرض الفيديو المدمج (Embedded) من YouTube

---

## 15. نقاط إضافية مهمة

### 15.1 إدارة الإعلانات (Admin Ad Management)
**واجهة الإدارة للإعلانات:**
1. **إضافة إعلان جديد:**
   - رفع محتوى الإعلان (فيديو/صورة/نص)
   - إدخال المبلغ المدفوع
   - حساب مدة العرض المكافئة للمبلغ
2. **تعيين الإعلان:**
   - اختيار منافسة مناسبة
   - تحديد توقيت العرض
3. **متابعة الأداء:**
   - هل تم عرض الإعلان؟
   - هل رفضه أحد المتنافسين؟
   - كم الأرباح الفعلية من هذا الإعلان؟

### 15.2 حساب التقييم والأرباح
**خلال المنافسة:**
- كل مشاهد مسجل يمكنه تقييم كل متنافس (نجوم/نقاط)
- التقييمات تُرسل فوراً عبر WebSocket
- النظام يحسب النسبة المئوية لكل متنافس

**بعد المنافسة:**
```javascript
// مثال حسابي
totalRatings = ratingsForA + ratingsForB
percentageA = (ratingsForA / totalRatings) * 100
percentageB = (ratingsForB / totalRatings) * 100

totalRevenue = sumOfAllAdsShown // الإعلانات المعروضة فعلاً
platformShare = totalRevenue * 0.20
competitorsShare = totalRevenue * 0.80

competitorA_Revenue = competitorsShare * (percentageA / 100)
competitorB_Revenue = competitorsShare * (percentageB / 100)
```

### 15.3 YouTube Integration Details
**خطوات التكامل:**
1. المستخدم يضغط "ربط YouTube" في الإعدادات
2. OAuth Flow: تسجيل دخول Google
3. طلب أذونات: YouTube Live Streaming
4. حفظ Access Token مشفر
5. عند بدء منافسة:
   - المنصة تستخدم YouTube API
   - تنشئ بثاً مباشراً على قناة المتنافس
   - تحصل على Embed Link
   - تعرضه في واجهة المنصة

---

## خلاصة الفهم المحدّث

منصة **Dueli** هي:
- ✅ تواصل اجتماعي قائم على التنافس
- ✅ بث مباشر عبر YouTube (متكامل تلقائياً)
- ✅ تقييم فوري من الجمهور أثناء البث
- ✅ **نظام إعلانات مستقل** تديره الإدارة مع حق المتنافس في الرفض
- ✅ توزيع أرباح عادل (80/20) حسب الأداء
- ✅ **رسائل بريدية** مع إمكانية الحظر
- ✅ شفافية كاملة في كل شيء
- ✅ مفتوحة المصدر وغير ربحية[architecture.md](https://github.com/user-attachments/files/23600825/architecture.md)
# Dueli Platform - Technical Architecture Document

## 1. System Overview

**Dueli** is an open-source competition-based social platform built on the MERN stack (MongoDB, Express, React, Node.js). The platform enables live debates, scientific discussions, and talent showcases with real-time audience rating and transparent revenue distribution (80/20 model).

---

## 2. Architecture Pattern

### 2.1 Overall Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT TIER                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   React/Next.js Frontend (Port 3000)                 │  │
│  │   - Authentication UI                                 │  │
│  │   - Competition Management                            │  │
│  │   - Live Streaming Interface (YouTube Embedded)       │  │
│  │   - Real-time Rating & Comments (Socket.IO Client)    │  │
│  │   - Admin Dashboard                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTPS/WSS
┌─────────────────────────────────────────────────────────────┐
│                       APPLICATION TIER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   Node.js/Express API Server (Port 5000)             │  │
│  │   ┌────────────────────────────────────────────────┐ │  │
│  │   │  RESTful API Routes                            │ │  │
│  │   │  - /auth   - /challenges   - /ratings          │ │  │
│  │   │  - /users  - /admin        - /ads              │ │  │
│  │   └────────────────────────────────────────────────┘ │  │
│  │   ┌────────────────────────────────────────────────┐ │  │
│  │   │  WebSocket Server (Socket.IO)                  │ │  │
│  │   │  - Real-time ratings/comments/viewers          │ │  │
│  │   └────────────────────────────────────────────────┘ │  │
│  │   ┌────────────────────────────────────────────────┐ │  │
│  │   │  Business Logic Layer                          │ │  │
│  │   │  - Revenue Calculator (80/20)                  │ │  │
│  │   │  - Rating Aggregator                           │ │  │
│  │   │  - YouTube API Integration                     │ │  │
│  │   └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                         DATA TIER                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   MongoDB Database (Port 27017)                      │  │
│  │   Collections:                                        │  │
│  │   - users, challenges, ratings, comments             │  │
│  │   - reports, transactions, notifications             │  │
│  │   - advertisements, messages, blockedUsers           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  - YouTube Live Streaming API (OAuth 2.0)                   │
│  - Payment Gateway (Future)                                  │
│  - Email Service (Notifications)                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Design Patterns Used
- **MVC Pattern:** Model-View-Controller separation
- **Repository Pattern:** Data access abstraction
- **Middleware Pattern:** Authentication, validation, error handling
- **Observer Pattern:** WebSocket event-driven updates
- **Strategy Pattern:** Revenue calculation algorithms

---

## 3. Technology Stack

### 3.1 Frontend
```json
{
  "framework": "React 18 / Next.js 14",
  "stateManagement": "React Context API + useState/useReducer",
  "realtime": "Socket.IO Client",
  "styling": "Tailwind CSS / CSS Modules",
  "httpClient": "Axios",
  "videoEmbed": "YouTube IFrame API",
  "authentication": "JWT + HTTP-Only Cookies"
}
```

### 3.2 Backend
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js 4.x",
  "realtime": "Socket.IO 4.x",
  "authentication": "JWT (jsonwebtoken)",
  "encryption": "crypto (AES-256-GCM)",
  "validation": "express-validator",
  "security": "helmet, cors, express-rate-limit"
}
```

### 3.3 Database
```json
{
  "database": "MongoDB 6.x",
  "ODM": "Mongoose 8.x",
  "indexing": "Compound indexes on frequently queried fields",
  "replication": "Replica Set (Production)"
}
```

### 3.4 External Integrations
```json
{
  "youtube": "Google APIs - YouTube Live Streaming API v3",
  "oauth": "Google OAuth 2.0",
  "email": "NodeMailer (SMTP)",
  "storage": "YouTube (video), MongoDB GridFS (images)"
}
```

---

## 4. Core System Components

### 4.1 Authentication System
**Flow:**
```
User → POST /auth/register → Validate → Hash Password (bcrypt)
     → Create User → Generate JWT → HTTP-Only Cookie → Response

User → POST /auth/login → Validate → Check Password
     → Generate JWT → Set Cookie → Response

Protected Route → Verify JWT Middleware → Decode → Attach user to req
```

**JWT Payload:**
```json
{
  "userId": "ObjectId",
  "role": "user|admin",
  "iat": "timestamp",
  "exp": "timestamp (7 days)"
}
```

### 4.2 YouTube Integration System
**OAuth Flow:**
```
User → Click "Link YouTube" → OAuth Request → Google Login
     → Consent Screen → Redirect with Auth Code
     → Exchange Code for Access Token + Refresh Token
     → Encrypt & Store Tokens → Update User.youtubeLinked = true
```

**Live Streaming Flow:**
```
Challenge Start → Retrieve User YouTube Tokens → Decrypt
              → YouTube API: Create Broadcast → Get Stream Key & URL
              → Return Embed URL to Frontend → Display in UI
```

### 4.3 Real-Time Transparency Engine (WebSockets)
**Socket.IO Events:**
```javascript
// Server-side events
socket.on('join_challenge', (challengeId) => {
  socket.join(`challenge:${challengeId}`);
  io.to(`challenge:${challengeId}`).emit('viewer_joined', viewerCount);
});

socket.on('rate_competitor', ({ challengeId, competitorId, score }) => {
  saveRating(); // Save to DB
  aggregateRatings(); // Calculate percentages
  io.to(`challenge:${challengeId}`).emit('ratings_update', ratingsData);
});

socket.on('new_comment', ({ challengeId, comment }) => {
  saveComment();
  io.to(`challenge:${challengeId}`).emit('comment_added', comment);
});

// Client receives
socket.on('ratings_update', (data) => {
  updateRatingsUI(data);
});

socket.on('viewer_count_update', (count) => {
  updateViewerCount(count);
});
```

### 4.4 Advertisement Management System
**Admin Workflow:**
```
1. Admin → POST /admin/ads → Upload ad content + amount
2. System calculates duration = f(amount)
3. Admin → PUT /admin/ads/:id/assign → Select challenge
4. Ad stored with { challengeId, startTime, duration, status: 'pending' }
5. During Live Challenge → Display ad at specified time
6. Competitor can trigger → POST /challenges/:id/reject-ad/:adId
7. System logs rejection → Update ad.status = 'rejected'
8. Revenue calculation excludes rejected ads
```

**Revenue Calculation Algorithm:**
```javascript
function calculateRevenue(challenge) {
  const displayedAds = challenge.ads.filter(ad => ad.status === 'displayed');
  const totalRevenue = displayedAds.reduce((sum, ad) => sum + ad.paidAmount, 0);
  
  const platformShare = totalRevenue * 0.20;
  const competitorsShare = totalRevenue * 0.80;
  
  const totalRatings = challenge.ratings.reduce((sum, r) => sum + r.score, 0);
  const competitorA_Ratings = challenge.ratings
    .filter(r => r.competitorRated === competitorA.id)
    .reduce((sum, r) => sum + r.score, 0);
  const competitorB_Ratings = challenge.ratings
    .filter(r => r.competitorRated === competitorB.id)
    .reduce((sum, r) => sum + r.score, 0);
  
  const percentageA = (competitorA_Ratings / totalRatings) * 100;
  const percentageB = (competitorB_Ratings / totalRatings) * 100;
  
  return {
    platform: platformShare,
    competitorA: competitorsShare * (percentageA / 100),
    competitorB: competitorsShare * (percentageB / 100)
  };
}
```

### 4.5 Moderation & Reporting System
**Report Processing:**
```
User → POST /reports → { reportedUser, reason, evidence }
     → Save to DB → Notify Admins

Admin → GET /admin/reports → View pending reports
      → PUT /admin/reports/:id/action → {
          action: 'warn|suspend|ban',
          reason: 'Required textual explanation'
        }
      → Update Report & User records
      → reason stored and publicly viewable
      → Notify reported user
```

**Admin Constraints (Code-Level):**
```javascript
// Middleware enforces admin restrictions
function restrictAdminActions(req, res, next) {
  if (req.user.role === 'admin') {
    const restrictedRoutes = ['/ratings', '/comments', '/messages'];
    if (restrictedRoutes.some(route => req.path.includes(route))) {
      return res.status(403).json({ error: 'Admins cannot perform user actions' });
    }
  }
  next();
}
```

---

## 5. Database Schema Design

### 5.1 Users Collection
```javascript
{
  _id: ObjectId,
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  
  // Profile
  bio: String,
  avatar: String,
  preferredCategories: [String],
  language: { type: String, default: 'ar' },
  country: { type: String, default: 'EG' },
  
  // YouTube Integration
  youtubeLinked: { type: Boolean, default: false },
  youtubeAccessToken: String, // Encrypted
  youtubeRefreshToken: String, // Encrypted
  youtubeChannelId: String,
  
  // Financial
  bankDetails: {
    accountNumber: String, // Encrypted AES-256
    bankName: String,
    accountHolder: String
  },
  totalEarnings: { type: Number, default: 0 },
  
  // Stats (Transparency)
  followerCount: { type: Number, default: 0 },
  reportCount: { type: Number, default: 0 },
  overallRating: { type: Number, default: 0 }, // Avg of all challenges
  
  // Social
  followers: [{ type: ObjectId, ref: 'User' }],
  following: [{ type: ObjectId, ref: 'User' }],
  blockedUsers: [{ type: ObjectId, ref: 'User' }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}

// Indexes
db.users.createIndex({ username: 1 });
db.users.createIndex({ email: 1 });
db.users.createIndex({ role: 1 });
```

### 5.2 Challenges Collection
```javascript
{
  _id: ObjectId,
  
  // Participants
  creator: { type: ObjectId, ref: 'User', required: true },
  opponent: { type: ObjectId, ref: 'User' },
  
  // Classification
  category: { 
    type: String, 
    enum: ['dialogue', 'science', 'talent'], 
    required: true 
  },
  field: String, // Sub-category
  
  // Rules
  rules: {
    duration: Number, // in minutes
    rounds: Number,
    roundDuration: Number,
    customRules: String // Free text
  },
  
  // Scheduling
  scheduledTime: Date,
  startedAt: Date,
  endedAt: Date,
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'live', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Streaming
  creatorYoutubeUrl: String,
  opponentYoutubeUrl: String,
  creatorStreamKey: String,
  opponentStreamKey: String,
  
  // Financial
  advertisements: [{
    adId: { type: ObjectId, ref: 'Advertisement' },
    displayTime: Date,
    status: { type: String, enum: ['pending', 'displayed', 'rejected'] }
  }],
  totalRevenue: { type: Number, default: 0 },
  revenueDistribution: {
    platform: Number,
    creator: Number,
    opponent: Number
  },
  
  // Stats
  viewerCount: { type: Number, default: 0 },
  peakViewers: { type: Number, default: 0 },
  
  // Localization
  language: String,
  country: String,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}

// Indexes
db.challenges.createIndex({ status: 1, scheduledTime: 1 });
db.challenges.createIndex({ category: 1, field: 1 });
db.challenges.createIndex({ creator: 1 });
db.challenges.createIndex({ opponent: 1 });
db.challenges.createIndex({ language: 1, country: 1 });
```

### 5.3 Ratings Collection
```javascript
{
  _id: ObjectId,
  challenge: { type: ObjectId, ref: 'Challenge', required: true, index: true },
  rater: { type: ObjectId, ref: 'User', required: true },
  competitorRated: { type: ObjectId, ref: 'User', required: true },
  score: { type: Number, min: 1, max: 5, required: true },
  timestamp: { type: Date, default: Date.now },
}

// Compound Index for aggregation
db.ratings.createIndex({ challenge: 1, competitorRated: 1 });
db.ratings.createIndex({ challenge: 1, timestamp: 1 });
```

### 5.4 Comments Collection
```javascript
{
  _id: ObjectId,
  challenge: { type: ObjectId, ref: 'Challenge', required: true, index: true },
  author: { type: ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 500 },
  timestamp: { type: Date, default: Date.now, index: true }
}

db.comments.createIndex({ challenge: 1, timestamp: -1 });
```

### 5.5 Reports Collection
```javascript
{
  _id: ObjectId,
  reporter: { type: ObjectId, ref: 'User', required: true },
  reportedUser: { type: ObjectId, ref: 'User', required: true, index: true },
  reportedChallenge: { type: ObjectId, ref: 'Challenge' }, // Optional
  
  reason: {
    type: String,
    enum: ['offensive', 'fraud', 'misconduct', 'misleading', 'rules_violation'],
    required: true
  },
  description: String,
  evidence: String, // URL or text
  
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'resolved', 'dismissed'],
    default: 'pending'
  },
  
  // Admin action
  reviewedBy: { type: ObjectId, ref: 'User' },
  adminAction: {
    type: String,
    enum: ['none', 'warn', 'suspend', 'ban', 'delete_content']
  },
  actionReason: { type: String }, // MANDATORY for transparency
  actionDate: Date,
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}

db.reports.createIndex({ status: 1, createdAt: -1 });
db.reports.createIndex({ reportedUser: 1 });
```

### 5.6 Transactions Collection
```javascript
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User', required: true, index: true },
  challenge: { type: ObjectId, ref: 'Challenge', required: true },
  
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  
  type: { 
    type: String, 
    enum: ['challenge_earning', 'withdrawal', 'refund'],
    default: 'challenge_earning'
  },
  
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  
  invoiceNumber: String,
  paymentMethod: String,
  paymentDate: Date,
  
  metadata: {
    ratingPercentage: Number,
    totalChallengeRevenue: Number
  },
  
  createdAt: { type: Date, default: Date.now }
}

db.transactions.createIndex({ user: 1, createdAt: -1 });
db.transactions.createIndex({ status: 1 });
```

### 5.7 Advertisements Collection
```javascript
{
  _id: ObjectId,
  advertiser: { type: String, required: true },
  
  content: {
    type: { type: String, enum: ['video', 'image', 'text'] },
    url: String, // Media URL
    text: String
  },
  
  paidAmount: { type: Number, required: true },
  calculatedDuration: Number, // in seconds
  
  assignedChallenge: { type: ObjectId, ref: 'Challenge', index: true },
  displayTime: Date,
  
  status: {
    type: String,
    enum: ['pending', 'assigned', 'displayed', 'rejected', 'expired'],
    default: 'pending'
  },
  
  rejectedBy: { type: ObjectId, ref: 'User' },
  rejectionReason: String,
  
  createdAt: { type: Date, default: Date.now }
}

db.advertisements.createIndex({ status: 1 });
db.advertisements.createIndex({ assignedChallenge: 1 });
```

### 5.8 Messages Collection
```javascript
{
  _id: ObjectId,
  sender: { type: ObjectId, ref: 'User', required: true },
  receiver: { type: ObjectId, ref: 'User', required: true, index: true },
  
  subject: { type: String, maxlength: 200 },
  content: { type: String, required: true, maxlength: 2000 },
  
  read: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now, index: true }
}

db.messages.createIndex({ receiver: 1, read: 1, createdAt: -1 });
db.messages.createIndex({ sender: 1, createdAt: -1 });
```

### 5.9 Notifications Collection
```javascript
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User', required: true, index: true },
  
  type: {
    type: String,
    enum: [
      'challenge_invite',
      'invite_accepted',
      'challenge_starting',
      'new_comment',
      'new_follower',
      'new_message',
      'earnings_received',
      'admin_action'
    ],
    required: true
  },
  
  content: { type: String, required: true },
  link: String, // URL to related resource
  
  read: { type: Boolean, default: false },
  
  metadata: {
    challengeId: ObjectId,
    userId: ObjectId,
    amount: Number
  },
  
  createdAt: { type: Date, default: Date.now, index: true }
}

db.notifications.createIndex({ user: 1, read: 1, createdAt: -1 });
```

---

## 6. API Endpoint Structure

### 6.1 Authentication Routes (`/auth`)
```
POST   /auth/register          - Register new user
POST   /auth/login             - Login user
POST   /auth/logout            - Logout user
GET    /auth/me                - Get current user info
PUT    /auth/update-profile    - Update user profile
POST   /auth/youtube/connect   - Initiate YouTube OAuth
GET    /auth/youtube/callback  - Handle OAuth callback
```

### 6.2 User Routes (`/users`)
```
GET    /users/:id              - Get user profile (public)
GET    /users/:id/challenges   - Get user's challenges
POST   /users/:id/follow       - Follow user
DELETE /users/:id/follow       - Unfollow user
POST   /users/:id/block        - Block user
DELETE /users/:id/block        - Unblock user
GET    /users/:id/earnings     - Get earnings history (own only)
PUT    /users/bank-details     - Update bank details (encrypted)
```

### 6.3 Challenge Routes (`/challenges`)
```
GET    /challenges                      - List challenges (filtered)
GET    /challenges/:id                  - Get challenge details
POST   /challenges                      - Create new challenge
PUT    /challenges/:id                  - Update challenge
DELETE /challenges/:id                  - Cancel challenge
POST   /challenges/:id/join             - Request to join
PUT    /challenges/:id/accept/:userId   - Accept participant
POST   /challenges/:id/start            - Start live challenge
POST   /challenges/:id/end              - End challenge
POST   /challenges/:id/reject-ad/:adId  - Reject advertisement
GET    /challenges/:id/ratings          - Get real-time ratings
GET    /challenges/:id/comments         - Get comments
```

### 6.4 Rating Routes (`/ratings`)
```
POST   /ratings                - Submit rating (during live challenge)
GET    /ratings/challenge/:id  - Get challenge ratings (aggregated)
```

### 6.5 Comment Routes (`/comments`)
```
POST   /comments               - Post comment
GET    /comments/challenge/:id - Get challenge comments
DELETE /comments/:id           - Delete own comment
```

### 6.6 Message Routes (`/messages`)
```
GET    /messages              - Get inbox
GET    /messages/sent         - Get sent messages
POST   /messages              - Send message
PUT    /messages/:id/read     - Mark as read
DELETE /messages/:id          - Delete message
```

### 6.7 Report Routes (`/reports`)
```
POST   /reports               - Submit report
GET    /reports/my-reports    - Get user's submitted reports
```

### 6.8 Admin Routes (`/admin`)
```
GET    /admin/reports                    - Get all reports
PUT    /admin/reports/:id/action         - Take action on report
GET    /admin/users                      - List all users
PUT    /admin/users/:id/suspend          - Suspend user
GET    /admin/ads                        - List advertisements
POST   /admin/ads                        - Create advertisement
PUT    /admin/ads/:id/assign             - Assign ad to challenge
GET    /admin/analytics                  - Platform analytics
```

---

## 7. Security Implementation

### 7.1 Authentication & Authorization
```javascript
// JWT Generation
const jwt = require('jsonwebtoken');
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Role-based Access
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
```

### 7.2 Data Encryption (AES-256-GCM)
```javascript
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // 32 bytes
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag.toString('hex')
  };
}

function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(encrypted.iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Usage for bank details
user.bankDetails.accountNumber = encrypt(accountNumber);
```

### 7.3 Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit login attempts
  message: 'Too many login attempts'
});

app.use('/api/', apiLimiter);
app.use('/auth/login', authLimiter);
```

---

## 8. Scalability Considerations

### 8.1 Horizontal Scaling
```
┌──────────────┐
│ Load Balancer│ (Nginx/HAProxy)
└──────┬───────┘
       │
   ┌───┴────┬─────────┬─────────┐
   │        │         │         │
┌──▼──┐ ┌──▼──┐  ┌──▼──┐  ┌──▼──┐
│App 1│ │App 2│  │App 3│  │App 4│  (Express instances)
└──┬──┘ └──┬──┘  └──┬──┘  └──┬──┘
   │       │        │        │
   └───────┴────────┴────────┘
           │
    ┌──────▼───────┐
    │ MongoDB      │ (Replica Set)
    │ Primary +    │
    │ Secondaries  │
    └──────────────┘
```

### 8.2 WebSocket Scaling (Socket.IO with Redis)
```javascript
const io = require('socket.io')(server);
const redisAdapter = require('socket.io-redis');

io.adapter(redisAdapter({ 
  host: 'localhost', 
  port: 6379 
}));

// This allows multiple server instances to share socket connections
```

### 8.3 Database Optimization
- **Indexes:** Strategic indexing on frequently queried fields
- **Aggregation Pipelines:** For complex rating calculations
- **Caching:** Redis for frequently accessed data (user profiles, challenge lists)
- **Connection Pooling:** MongoDB connection pool size = 10-50

### 8.4 CDN for Static Assets
```
Frontend Build → Upload to CDN → Serve from edge locations
YouTube Videos → Already on YouTube CDN
User Avatars → Cloudinary/AWS S3 + CloudFront
```

---

## 9. Deployment Architecture

### 9.1 Development Environment
```
docker-compose.yml:
  - mongodb (container)
  - backend (port 5000)
  - frontend (port 3000)
  - redis (port 6379)
```

### 9.2 Production Environment
```
Cloud Provider (AWS/DigitalOcean/Heroku)
├── EC2/Droplets (Multiple instances behind load balancer)
├── MongoDB Atlas (Managed cluster)
├── Redis Cloud (Session store)
├── S3/Spaces (Static assets)
└── CloudFront/CDN (Content delivery)
```

### 9.3 CI/CD Pipeline
```
GitHub → Push → GitHub Actions → Run Tests → Build
      → Deploy to Staging → Manual Approval → Deploy to Production
```

---

## 10. Monitoring & Logging

### 10.1 Application Monitoring
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Usage
logger.info('User logged in', { userId, timestamp });
logger.error('Database connection failed', { error });
```

### 10.2 Performance Metrics
```javascript
// Track API response times
const responseTime = require('response-time');
app.use(responseTime((req, res, time) => {
  logger.info('API Response', {
    method: req.method,
    url: req.url,
    duration: time,
    statusCode: res.statusCode
  });
}));
```

### 10.3 Error Tracking
- **Sentry.io** integration for production error tracking
- **Stack traces** logged for debugging
- **User context** attached to errors

---

## 11. Testing Strategy

### 11.1 Unit Tests
```javascript
// Example: Rating calculation test
describe('Revenue Calculator', () => {
  test('should distribute 80/20 correctly', () => {
    const result = calculateRevenue({
      totalRevenue: 1000,
      competitorA_Ratings: 70,
      competitorB_Ratings: 30
    });
    
    expect(result.platform).toBe(200);
    expect(result.competitorA).toBe(560);
    expect(result.competitorB).toBe(240);
  });
});
```

### 11.2 Integration Tests
- API endpoint testing with **Supertest**
- Database operations with **test database**
- YouTube API mocking

### 11.3 E2E Tests
- **Cypress** for frontend user flows
- Complete challenge lifecycle testing
- Real-time features testing

---

## 12. Development Guidelines

### 12.1 Code Structure
```
dueli-platform/
├── backend/
│   ├── src/
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # Express routes
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth, validation, etc.
│   │   ├── services/         # External services (YouTube, etc.)
│   │   ├── utils/            # Helper functions
│   │   ├── config/           # Configuration files
│   │   └── socket/           # WebSocket handlers
│   ├── tests/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Next.js pages
│   │   ├── contexts/         # React Context providers
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API calls
│   │   ├── utils/            # Helper functions
│   │   └── styles/           # CSS/Tailwind
│   ├── public/
│   ├── package.json
│   └── next.config.js
├── docker-compose.yml
├── .github/
│   └── workflows/            # CI/CD
└── README.md
```

### 12.2 Naming Conventions
- **Variables:** camelCase (`userId`, `challengeData`)
- **Functions:** camelCase, verb-first (`getUserProfile`, `calculateRevenue`)
- **Classes/Models:** PascalCase (`User`, `Challenge`)
- **Constants:** UPPER_SNAKE_CASE (`JWT_SECRET`, `MAX_RATING`)
- **Files:** kebab-case (`user-controller.js`, `auth-middleware.js`)

### 12.3 Comment Standards
```javascript
/**
 * Calculates revenue distribution for a completed challenge
 * @param {Object} challenge - Challenge document from DB
 * @param {Array} ratings - Array of rating documents
 * @returns {Object} Revenue distribution { platform, competitorA, competitorB }
 * @throws {Error} If challenge or ratings are invalid
 */
function calculateRevenue(challenge, ratings) {
  // Implementation with inline comments for complex logic
}
```

### 12.4 Git Workflow
```
main (production)
  ↑
develop (staging)
  ↑
feature/user-authentication
feature/challenge-creation
bugfix/rating-calculation
```

**Commit Convention:**
```
feat: Add YouTube OAuth integration
fix: Resolve rating calculation error
docs: Update API documentation
refactor: Optimize database queries
test: Add unit tests for revenue calculator
```

---

## 13. Environment Variables

### 13.1 Backend (.env)
```bash
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/dueli
MONGODB_TEST_URI=mongodb://localhost:27017/dueli_test

# JWT
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# Encryption (AES-256)
ENCRYPTION_KEY=64_char_hex_string_for_aes_256_key

# YouTube API
YOUTUBE_CLIENT_ID=your_google_oauth_client_id
YOUTUBE_CLIENT_SECRET=your_google_oauth_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:5000/auth/youtube/callback

# Email (NodeMailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# External Services
SENTRY_DSN=your_sentry_dsn
```

### 13.2 Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_SITE_NAME=Dueli
```

---

## 14. Performance Benchmarks (MVP Goals)

### 14.1 Response Time Targets
- **API Endpoints:** < 200ms (95th percentile)
- **Database Queries:** < 100ms (average)
- **WebSocket Updates:** < 50ms (sub-second)
- **Page Load:** < 3s (initial load)

### 14.2 Capacity Targets
- **Concurrent Users:** 5,000 active users
- **Simultaneous Live Challenges:** 100
- **Ratings per Second:** 500
- **Comments per Second:** 200

### 14.3 Database Performance
```javascript
// Example indexes for performance
db.challenges.createIndex({ status: 1, scheduledTime: 1 });
db.ratings.createIndex({ challenge: 1, competitorRated: 1 });
db.notifications.createIndex({ user: 1, read: 1, createdAt: -1 });

// Aggregation pipeline for rating calculation (optimized)
db.ratings.aggregate([
  { $match: { challenge: challengeId } },
  { $group: {
      _id: '$competitorRated',
      totalScore: { $sum: '$score' },
      count: { $sum: 1 }
    }
  }
]);
```

---

## 15. MVP Feature Checklist

### ✅ Phase 1: Core Infrastructure (Weeks 1-2)
- [x] Project setup (MERN stack)
- [x] Database schema implementation
- [x] Authentication system (JWT)
- [x] Basic API structure
- [x] WebSocket server setup

### ✅ Phase 2: User Management (Week 3)
- [x] User registration/login
- [x] Profile management
- [x] YouTube OAuth integration
- [x] Bank details encryption
- [x] Follow/block system

### ✅ Phase 3: Challenge System (Weeks 4-5)
- [x] Challenge creation
- [x] Challenge matching (invite/accept)
- [x] YouTube live streaming integration
- [x] Challenge lifecycle management
- [x] Search and filtering

### ✅ Phase 4: Real-time Features (Week 6)
- [x] Live ratings (WebSocket)
- [x] Live comments (WebSocket)
- [x] Viewer count tracking
- [x] Real-time transparency updates

### ✅ Phase 5: Financial System (Week 7)
- [x] Advertisement management
- [x] Revenue calculation (80/20)
- [x] Transaction logging
- [x] Earnings display

### ✅ Phase 6: Moderation (Week 8)
- [x] Reporting system
- [x] Admin dashboard
- [x] Moderation actions with logging
- [x] Admin constraints enforcement

### ✅ Phase 7: Communication (Week 9)
- [x] Messaging system (inbox)
- [x] Notifications system
- [x] Email notifications

### ✅ Phase 8: Polish & Deploy (Week 10)
- [x] UI/UX refinement
- [x] Multi-language support
- [x] Testing (unit, integration, E2E)
- [x] Documentation
- [x] Deployment setup
- [x] Performance optimization

---

## 16. Known Limitations & Future Enhancements

### 16.1 MVP Limitations
1. **YouTube Dependency:** Streaming relies on YouTube API
2. **Single Currency:** Only USD supported initially
3. **Manual Ad Assignment:** Admin must manually assign ads
4. **Basic Search:** No advanced filtering/recommendation algorithm
5. **No Mobile App:** Web-only for MVP

### 16.2 Post-MVP Roadmap
**Phase 2 (Q2 2025):**
- Direct WebRTC streaming (Kurento Media Server)
- Mobile apps (React Native)
- Advanced recommendation engine
- Multi-currency support
- Automated ad placement AI

**Phase 3 (Q3 2025):**
- Donation system
- Sponsorship features
- Advanced analytics dashboard
- Gamification (badges, levels)
- API for third-party integrations

**Phase 4 (Q4 2025):**
- Machine learning moderation
- Live translation
- Virtual backgrounds/effects
- Premium features
- White-label solution for organizations

---

## 17. Security Checklist

### 17.1 Pre-Deployment Security Audit
- [ ] All secrets in environment variables (not hardcoded)
- [ ] HTTPS enforced in production
- [ ] CORS configured properly
- [ ] Rate limiting active on all routes
- [ ] SQL/NoSQL injection protection (Mongoose sanitization)
- [ ] XSS protection (helmet.js)
- [ ] CSRF tokens implemented
- [ ] Input validation on all endpoints
- [ ] Sensitive data encrypted (AES-256)
- [ ] JWT tokens in HTTP-only cookies
- [ ] Admin actions logged and auditable
- [ ] Password hashing with bcrypt (cost factor ≥ 10)
- [ ] Session timeout configured
- [ ] File upload size limits enforced
- [ ] Error messages don't leak system info

### 17.2 Ongoing Security Practices
- Weekly dependency updates (`npm audit`)
- Monthly security reviews
- Penetration testing before major releases
- Bug bounty program (post-MVP)

---

## 18. Success Metrics

### 18.1 Technical Metrics
- **Uptime:** 99.5% availability
- **Response Time:** < 200ms (95th percentile)
- **Error Rate:** < 0.1%
- **Code Coverage:** > 80%

### 18.2 User Metrics
- **User Registration:** 10,000 users (Month 3)
- **Active Challenges:** 500/month
- **Average Rating per Challenge:** > 50 ratings
- **Return User Rate:** > 40%

### 18.3 Financial Metrics
- **Total Revenue:** Track monthly ad revenue
- **Platform Share:** 20% of total
- **Average Competitor Earnings:** Track per challenge
- **Payment Success Rate:** > 98%

---

## 19. Compliance & Legal

### 19.1 Data Protection (GDPR/CCPA)
- User consent for data collection
- Right to data export
- Right to deletion
- Data breach notification procedures
- Privacy policy clearly displayed

### 19.2 Content Moderation
- Clear community guidelines
- Report processing SLA: < 48 hours
- Appeals process for banned users
- Transparency reports (quarterly)

### 19.3 Financial Compliance
- Tax reporting for earnings > threshold
- KYC (Know Your Customer) for high earners
- Anti-money laundering checks
- Payment processor compliance (PCI-DSS)

---

## 20. Documentation Deliverables

### 20.1 Technical Documentation
1. **This Architecture Document**
2. **API Reference** (Swagger/OpenAPI)
3. **Database Schema Reference**
4. **Deployment Guide**
5. **Developer Setup Guide**

### 20.2 User Documentation
1. **User Manual** (How to use the platform)
2. **Competitor Guide** (How to compete and earn)
3. **Admin Guide** (Moderation procedures)
4. **FAQ Document**

### 20.3 Legal Documentation
1. **Terms of Service**
2. **Privacy Policy**
3. **Community Guidelines**
4. **Copyright Policy (DMCA)**

---

## 21. Support & Maintenance Plan

### 21.1 Support Channels
- **GitHub Issues:** Bug reports & feature requests
- **Discord Server:** Community support
- **Email:** support@dueli.platform
- **Documentation Wiki:** Self-service help

### 21.2 Maintenance Schedule
- **Daily:** Monitoring, log review
- **Weekly:** Dependency updates, security patches
- **Monthly:** Performance review, database optimization
- **Quarterly:** Major updates, feature releases

---

## Conclusion

This architecture document provides a comprehensive blueprint for building the Dueli MVP. The system is designed with scalability, security, and transparency as core principles. All implementations must follow the patterns and standards outlined here to ensure consistency and maintainability.

**Key Principles to Remember:**
1. ✅ **Transparency:** Everything is visible to users
2. ✅ **Security:** Encryption, authentication, rate limiting
3. ✅ **Scalability:** Built to handle 5,000 concurrent users
4. ✅ **Open Source:** Well-documented, modular code
5. ✅ **Real-time:** Sub-second updates via WebSockets
6. ✅ **Fair Revenue:** 80/20 distribution based on performance

---

**Document Version:** 1.0  
**Last Updated:** November 16, 2024  
**Maintained By:** Dueli Development Team  
**License:** MIT (Open Source)

- 
