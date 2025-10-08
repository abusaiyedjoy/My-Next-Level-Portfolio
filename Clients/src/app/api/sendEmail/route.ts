import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email validation regex
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Validate input data
function validateInput(data: any) {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Valid email address is required');
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  return errors;
}

// Sanitize HTML to prevent XSS
function sanitizeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    const validationErrors = validateInput(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { success: false, message: validationErrors.join(', ') },
        { status: 400 }
      );
    }

    // Check for environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service is not configured. Please contact the administrator.' 
        },
        { status: 500 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // This should be your App Password
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError: any) {
      console.error('Transporter verification failed:', verifyError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email service configuration error. Please contact support.' 
        },
        { status: 500 }
      );
    }

    // Sanitize inputs for email
    const sanitizedName = sanitizeHTML(name.trim());
    const sanitizedEmail = email.trim();
    const sanitizedSubject = sanitizeHTML(subject.trim());
    const sanitizedMessage = sanitizeHTML(message.trim()).replace(/\n/g, '<br>');

    // Email to yourself
    const mailOptionsToSelf = {
      from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
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
              background: linear-gradient(135deg, #334CEC 0%, #9333EA 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .info-row {
              margin: 15px 0;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #334CEC;
            }
            .label {
              font-weight: bold;
              color: #334CEC;
              margin-bottom: 5px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">From Your Portfolio Website</p>
          </div>
          <div class="content">
            <div class="info-row">
              <div class="label">Name:</div>
              <div>${sanitizedName}</div>
            </div>
            <div class="info-row">
              <div class="label">Email:</div>
              <div><a href="mailto:${sanitizedEmail}" style="color: #334CEC;">${sanitizedEmail}</a></div>
            </div>
            <div class="info-row">
              <div class="label">Subject:</div>
              <div>${sanitizedSubject}</div>
            </div>
            <div class="info-row">
              <div class="label">Message:</div>
              <div style="margin-top: 10px;">${sanitizedMessage}</div>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form</p>
              <p>Reply directly to this email to respond to ${sanitizedName}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Confirmation email to sender
    const mailOptionsToSender = {
      from: `"Abu Saiyed Joy" <${process.env.EMAIL_USER}>`,
      to: sanitizedEmail,
      subject: `Thank you for contacting me - ${sanitizedSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
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
              background: linear-gradient(135deg, #334CEC 0%, #9333EA 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #334CEC 0%, #9333EA 100%);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">Message Received!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for reaching out</p>
          </div>
          <div class="content">
            <p>Hi ${sanitizedName},</p>
            <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible, usually within 24 hours.</p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #334CEC;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #334CEC;">Your Message:</p>
              <p style="margin: 0; color: #666;"><strong>Subject:</strong> ${sanitizedSubject}</p>
              <p style="margin: 10px 0 0 0; color: #666;">${sanitizedMessage}</p>
            </div>

            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out my portfolio projects</li>
              <li>Connect with me on LinkedIn</li>
              <li>Follow me on GitHub</li>
            </ul>

            <div style="text-align: center;">
              <a href="mailto:abusaiyedjoy1@gmail.com" class="button">Reply to this Email</a>
            </div>

            <div class="footer">
              <p><strong>Abu Saiyed Joy</strong></p>
              <p>Full Stack Developer</p>
              <p>📧 abusaiyedjoy1@gmail.com</p>
              <p style="margin-top: 15px;">If you didn't send this message, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptionsToSelf),
      transporter.sendMail(mailOptionsToSender),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.',
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send message. ';
    
    if (error.code === 'EAUTH') {
      errorMessage += 'Email authentication failed. Please contact support.';
    } else if (error.code === 'ECONNECTION') {
      errorMessage += 'Could not connect to email service. Please try again later.';
    } else if (error.responseCode === 535) {
      errorMessage += 'Email authentication error. Please contact support.';
    } else {
      errorMessage += 'Please try again or contact me directly via email.';
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}