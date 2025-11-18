// ============================================
// FILE: templates/email/welcomeEmail.js
// Welcome Email Template
// ============================================

/**
 * Generate welcome email HTML
 * @param {string} username - User's username
 * @returns {string} - HTML email
 */
const getWelcomeEmail = (username) => {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Dueli</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>⚔️ مرحباً بك في Dueli</h1>
      </div>
      <div class="content">
        <h2>مرحباً ${username}!</h2>
        <p>نحن سعداء بانضمامك إلى منصة Dueli - منصة التنافس الحضاري.</p>
        <p>الآن يمكنك:</p>
        <ul>
          <li>إنشاء منافساتك الخاصة</li>
          <li>المشاركة في منافسات الآخرين</li>
          <li>الربح من مهاراتك ومواهبك</li>
          <li>التواصل مع منافسين من حول العالم</li>
        </ul>
        <a href="${process.env.FRONTEND_URL}/dashboard" class="button">
          ابدأ الآن
        </a>
        <p>إذا كنت بحاجة إلى مساعدة، لا تتردد في التواصل معنا.</p>
      </div>
      <div class="footer">
        <p>© 2024 Dueli Platform - جميع الحقوق محفوظة</p>
        <p>منصة مفتوحة المصدر | غير ربحية</p>
      </div>
    </body>
    </html>
  `;
};

module.exports = { getWelcomeEmail };

