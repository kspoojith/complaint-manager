import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Testing database connection...');
    
    // Test database connection
    await dbConnect();
    console.log('✅ Database connection successful');
    
    // Test environment variables
    const envCheck = {
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Missing',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Missing',
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Missing',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Missing',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ? 'Set' : 'Missing',
    };
    
    console.log('📋 Environment variables status:', envCheck);
    
    res.status(200).json({
      success: true,
      message: 'Database connection successful',
      environment: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('❌ Database connection failed:', error);
    
    res.status(500).json({
      success: false,
      error: error.message,
      environment: {
        MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Missing',
        JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Missing',
        EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Missing',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Missing',
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ? 'Set' : 'Missing',
      },
      timestamp: new Date().toISOString()
    });
  }
}