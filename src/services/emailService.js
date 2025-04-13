// src/services/emailService.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport.
// The configuration parameters are sourced from environment variables.
// Ensure you have a .env file with these values defined.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,             // e.g., 'smtp.gmail.com'
  port: parseInt(process.env.SMTP_PORT, 10), // e.g., 465 or 587
  secure: process.env.SMTP_SECURE === 'true',// true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,             // Your SMTP username
    pass: process.env.SMTP_PASS,             // Your SMTP password
  },
});

/**
 * Sends an email using the transporter.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plaintext body of the email.
 * @param {string} [html] - The HTML body of the email (optional).
 * @returns {Promise} Resolves with the info response if sent, otherwise rejects.
 */
async function sendEmail(to, subject, text, html = null) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Authentication App" <no-reply@example.com>',
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Propagate the error so the calling function can handle it.
  }
}

module.exports = { sendEmail };
