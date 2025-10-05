import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  // Gmail SMTP configuration
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'yojanafinder2024@gmail.com', // Replace with your Gmail
    pass: process.env.EMAIL_PASS || 'your-app-password' // Replace with your Gmail App Password
  }
};

// Alternative SMTP configuration (if not using Gmail)
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'spranav0812@gmail.com',
    pass: process.env.EMAIL_PASS || 'psbu btxq wrjf sjju'
  }
};

// Create transporter
const createTransporter = () => {
  try {
    // Try Gmail service first
    return nodemailer.createTransport(EMAIL_CONFIG);
  } catch (error) {
    console.log('Gmail service failed, trying SMTP configuration...');
    return nodemailer.createTransport(SMTP_CONFIG);
  }
};

export async function sendEmailChangeNotification(emailChangeData) {
  const { userName, oldEmail, newEmail, timestamp, userAgent, ipAddress } = emailChangeData;

  try {
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();
    console.log('📧 Email transporter verified for email change notification');

    // Email content for admin notification
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #F59E0B, #D97706); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #D97706; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #F59E0B; }
          .footer { margin-top: 20px; padding: 15px; background: #e5e7eb; border-radius: 4px; font-size: 12px; color: #6b7280; }
          .warning { background: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 4px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔄 Email Change Request - YojanaFinder</h2>
            <p>A user has requested to change their email address in YojanaFinder.</p>
          </div>
          
          <div class="content">
            <div class="warning">
              <strong>⚠️ Security Notice:</strong> This is an automated notification about an email change request in the YojanaFinder system.
            </div>
            
            <div class="field">
              <div class="label">👤 User Name:</div>
              <div class="value">${userName}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Old Email:</div>
              <div class="value">${oldEmail}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 New Email:</div>
              <div class="value">${newEmail}</div>
            </div>
            
            <div class="field">
              <div class="label">🔐 Status:</div>
              <div class="value">Email change initiated - Verification email sent to new address</div>
            </div>
            
            <div class="footer">
              <strong>📊 Change Details:</strong><br>
              🕒 Timestamp: ${timestamp}<br>
              🌐 IP Address: ${ipAddress || 'Unknown'}<br>
              🖥️ User Agent: ${userAgent || 'Unknown'}<br>
              📱 Platform: YojanaFinder Profile Management
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: {
        name: 'YojanaFinder Security',
        address: process.env.EMAIL_USER || 'yojanafinder2024@gmail.com'
      },
      to: '23104115@apsit.edu.in',
      subject: `YojanaFinder: Email Change Request - ${userName}`,
      html: htmlContent,
      text: `
Email Change Request - YojanaFinder

User Name: ${userName}
Old Email: ${oldEmail}
New Email: ${newEmail}
Status: Email change initiated - Verification email sent to new address

---
Change Details:
Timestamp: ${timestamp}
IP Address: ${ipAddress || 'Unknown'}
User Agent: ${userAgent || 'Unknown'}
Platform: YojanaFinder Profile Management
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('📧 Email change notification sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 To:', '23104115@apsit.edu.in');
    console.log('📧 User:', userName, `(${oldEmail} → ${newEmail})`);

    return {
      success: true,
      messageId: info.messageId,
      message: 'Email change notification sent successfully to 23104115@apsit.edu.in'
    };

  } catch (error) {
    console.error('❌ Email change notification failed:', error.message);

    // Log the email content for debugging
    console.log('📧 Email change notification that failed to send:');
    console.log(`To: 23104115@apsit.edu.in`);
    console.log(`User: ${userName}`);
    console.log(`Old Email: ${oldEmail}`);
    console.log(`New Email: ${newEmail}`);
    console.log(`Timestamp: ${timestamp}`);

    // Don't throw error - email notification failure shouldn't block profile update
    console.log('⚠️ Continuing with profile update despite email notification failure');
    return {
      success: false,
      error: error.message
    };
  }
}

export async function sendContactEmail(contactData) {
  const { name, email, subject, message, ipAddress, userAgent } = contactData;

  try {
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();
    console.log('📧 Email transporter verified successfully');

    // Email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3B82F6, #1E40AF); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2563EB; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #3B82F6; }
          .footer { margin-top: 20px; padding: 15px; background: #e5e7eb; border-radius: 4px; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎯 New Contact Form Submission - YojanaFinder</h2>
            <p>You have received a new message through the YojanaFinder contact form.</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${email}</div>
            </div>
            
            <div class="field">
              <div class="label">📋 Subject:</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value">${message}</div>
            </div>
            
            <div class="footer">
              <strong>📊 Submission Details:</strong><br>
              🕒 Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br>
              🌐 IP Address: ${ipAddress || 'Unknown'}<br>
              🖥️ User Agent: ${userAgent || 'Unknown'}<br>
              📱 Platform: YojanaFinder Contact Form
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: {
        name: 'YojanaFinder Contact Form',
        address: process.env.EMAIL_USER || 'yojanafinder2024@gmail.com'
      },
      to: '23104115@apsit.edu.in',
      replyTo: email, // Allow direct reply to the user
      subject: `YojanaFinder Contact: ${subject}`,
      html: htmlContent,
      text: `
New Contact Form Submission - YojanaFinder

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Submission Details:
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
IP Address: ${ipAddress || 'Unknown'}
User Agent: ${userAgent || 'Unknown'}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('📧 Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 To:', '23104115@apsit.edu.in');
    console.log('📧 From:', name, `(${email})`);
    console.log('📧 Subject:', subject);

    return {
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully to 23104115@apsit.edu.in'
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);

    // Log the email content for debugging
    console.log('📧 Email content that failed to send:');
    console.log(`To: 23104115@apsit.edu.in`);
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: YojanaFinder Contact: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);

    // Throw error to be handled by the calling function
    throw new Error(`Email sending failed: ${error.message}`);
  }
}
