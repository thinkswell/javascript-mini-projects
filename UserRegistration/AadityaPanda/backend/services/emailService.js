const nodemailer = require('nodemailer');
require('dotenv').config();  

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    minVersion: 'TLSv1.2',
  },
});

// User input goes into the email HTML, so escape it (otherwise anyone can send links/markup from your address)
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const sendVerificationEmail = (userEmail, token, userFirstname) => {
  const verificationLink = `${process.env.BASE_URL}/signup/verify-email?token=${token}`;

  // Local development without SMTP: print the link instead, so signups can still be verified
  if (!process.env.SMTP_HOST) {
    console.log(`SMTP_HOST not set, verification link for ${userEmail}: ${verificationLink}`);
    return;
  }

  const mailOptions = {
    from: `"User Registration" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Action Required: Verify Your Email Address',
    text: `Hello ${userFirstname},
  
  Thank you for registering with us! To complete your registration, please verify your email address by clicking the link below:
  
  ${verificationLink}
  
  This verification link will expire in 1 hour. If you did not create this account, please ignore this email.
  
  Best regards,
  The User Registration Team`,
    html: `
      <p>Hello <strong>${escapeHtml(userFirstname)}</strong>,</p>
      <p>Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below:</p>
      
      <!-- Verification Button -->
      <p style="text-align: center;">
        <a href="${verificationLink}" style="display: inline-block; padding: 15px 30px; background-color: #4CAF50; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">Verify Your Email</a>
      </p>
      
      <p><strong>Note:</strong> This verification link will expire in <strong>1 hour</strong>. If you did not create this account, please ignore this email.</p>
      <p>Best regards,</p>
      <p><em>The User Registration Team</em></p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

module.exports = { sendVerificationEmail };