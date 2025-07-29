import nodemailer from 'nodemailer';
import { IComplaint } from '../models/Complaint';

// Create transporter with better error handling
const createTransport = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error('Email configuration missing: EMAIL_USER and EMAIL_PASS must be set');
  }

  console.log('Creating email transporter with:', { emailUser });

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    // Add timeout and other options for better reliability
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
    // Fix SSL certificate issues
    tls: {
      rejectUnauthorized: false
    },
  });
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransport();
    const emailUser = process.env.EMAIL_USER;
    
    if (!emailUser) {
      throw new Error('EMAIL_USER not configured');
    }

    const mailOptions = {
      from: emailUser,
      to: emailUser, // Send test to self
      subject: 'Email Configuration Test - Complaint Management System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Configuration Test</h2>
          <p>This is a test email to verify that the email configuration is working properly.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p>If you receive this email, the complaint management system email notifications are properly configured.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email configuration test successful');
    return true;
  } catch (error) {
    console.error('❌ Email configuration test failed:', error);
    throw error;
  }
};

// Email template for new complaint
export const sendNewComplaintEmail = async (complaint: IComplaint, adminEmail: string) => {
  try {
    console.log('📧 Sending new complaint email to:', adminEmail);
    
    const transporter = createTransport();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `🚨 New Complaint Submitted: ${complaint.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">🚨 New Complaint Submitted</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Complaint Details:</h3>
            <p><strong>Title:</strong> ${complaint.title}</p>
            <p><strong>Category:</strong> ${complaint.category}</p>
            <p><strong>Priority:</strong> <span style="color: ${
              complaint.priority === 'High' ? '#e74c3c' : 
              complaint.priority === 'Medium' ? '#f39c12' : '#27ae60'
            };">${complaint.priority}</span></p>
            <p><strong>Status:</strong> ${complaint.status}</p>
            <p><strong>Date Submitted:</strong> ${new Date(complaint.dateSubmitted).toLocaleString()}</p>
            <p><strong>Description:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3498db;">
              ${complaint.description}
            </div>
            ${complaint.userEmail ? `<p><strong>User Email:</strong> ${complaint.userEmail}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 14px;">
            Please log in to the admin panel to review and update this complaint.
          </p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ New complaint email sent successfully to:', adminEmail);
    console.log('📧 Email ID:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending new complaint email:', error);
    throw error;
  }
};

// Email template for status update
export const sendStatusUpdateEmail = async (
  complaint: IComplaint, 
  oldStatus: string, 
  adminEmail: string
) => {
  try {
    console.log('📧 Sending status update email to:', adminEmail);
    
    const transporter = createTransport();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `📝 Complaint Status Updated: ${complaint.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">📝 Complaint Status Updated</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Complaint Details:</h3>
            <p><strong>Title:</strong> ${complaint.title}</p>
            <p><strong>Previous Status:</strong> ${oldStatus}</p>
            <p><strong>New Status:</strong> <span style="color: ${
              complaint.status === 'Resolved' ? '#27ae60' : 
              complaint.status === 'In Progress' ? '#f39c12' : '#e74c3c'
            };">${complaint.status}</span></p>
            <p><strong>Date Updated:</strong> ${new Date().toLocaleString()}</p>
            ${complaint.adminNotes ? `
              <p><strong>Admin Notes:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #e74c3c;">
                ${complaint.adminNotes}
              </div>
            ` : ''}
          </div>
          <p style="color: #666; font-size: 14px;">
            The complaint status has been successfully updated in the system.
          </p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Status update email sent successfully to:', adminEmail);
    console.log('📧 Email ID:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending status update email:', error);
    throw error;
  }
};

// Email template for complaint resolved
export const sendComplaintResolvedEmail = async (complaint: IComplaint, adminEmail: string) => {
  try {
    console.log('📧 Sending complaint resolved email to:', adminEmail);
    
    const transporter = createTransport();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `✅ Complaint Resolved: ${complaint.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #27ae60;">✅ Complaint Resolved Successfully</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #555;">Complaint Details:</h3>
            <p><strong>Title:</strong> ${complaint.title}</p>
            <p><strong>Category:</strong> ${complaint.category}</p>
            <p><strong>Priority:</strong> ${complaint.priority}</p>
            <p><strong>Date Resolved:</strong> ${complaint.resolvedDate ? new Date(complaint.resolvedDate).toLocaleString() : new Date().toLocaleString()}</p>
            ${complaint.adminNotes ? `
              <p><strong>Resolution Notes:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #27ae60;">
                ${complaint.adminNotes}
              </div>
            ` : ''}
          </div>
          <p style="color: #666; font-size: 14px;">
            This complaint has been marked as resolved and is now closed.
          </p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Complaint resolved email sent successfully to:', adminEmail);
    console.log('📧 Email ID:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Error sending complaint resolved email:', error);
    throw error;
  }
};