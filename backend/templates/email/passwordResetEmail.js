// ============================================
// FILE: templates/email/passwordResetEmail.js
// Password Reset Email Template
// ============================================

/**
 * Generate password reset email HTML
 * @param {string} username - User's username
 * @param {string} resetUrl - Password reset URL
 * @returns {string} - HTML email
 */
const getPasswordResetEmail = (username, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>إعادة تعيين كلمة المرور</title>
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
        .warning {
          background: #fff3cd;
          border: 1px solid #ffc107;
          padding: 15px;
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
        <h1>⚔️ إعادة تعيين كلمة المرور</h1>
      </div>
      <div class="content">
        <h2>مرحباً ${username}!</h2>
        <p>تلقينا طلباً لإعادة تعيين كلمة مرور حسابك.</p>
        <p>إذا قمت بهذا الطلب، انقر على الزر أدناه لإعادة تعيين كلمة المرور:</p>
        <a href="${resetUrl}" class="button">
          إعادة تعيين كلمة المرور
        </a>
        <div class="warning">
          <strong>⚠️ تحذير:</strong>
          <p>هذا الرابط صالح لمدة 10 دقائق فقط.</p>
          <p>إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذه الرسالة.</p>
        </div>
        <p>إذا لم يعمل الزر، انسخ الرابط التالي والصقه في متصفحك:</p>
        <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
      </div>
      <div class="footer">
        <p>© 2024 Dueli Platform</p>
        <p>لم تطلب هذه الرسالة؟ تجاهلها بأمان</p>
      </div>
    </body>
    </html>
  `;
};

module.exports = { getPasswordResetEmail };