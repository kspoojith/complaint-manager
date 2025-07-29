import { NextApiRequest, NextApiResponse } from 'next';
import { testEmailConfig } from '../../lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Testing email configuration...');
    
    // Check if email environment variables are set
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      return res.status(400).json({
        error: 'Email configuration missing',
        details: {
          EMAIL_USER: emailUser ? 'Set' : 'Missing',
          EMAIL_PASS: emailPass ? 'Set' : 'Missing'
        }
      });
    }

    // Test the email configuration
    await testEmailConfig();

    res.status(200).json({
      success: true,
      message: 'Email configuration test successful! Check your email inbox.',
      emailUser: emailUser
    });
  } catch (error: any) {
    console.error('❌ Email test failed:', error);
    
    res.status(500).json({
      error: 'Email configuration test failed',
      details: error.message,
      commonIssues: [
        'Make sure EMAIL_USER and EMAIL_PASS are set in your .env.local file',
        'For Gmail: Enable 2-factor authentication and use an App Password',
        'Check that your email provider allows SMTP access',
        'Verify your email credentials are correct'
      ]
    });
  }
}