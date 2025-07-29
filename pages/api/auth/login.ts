import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/database';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Login attempt for:', req.body.email);
    
    // Test database connection
    await dbConnect();
    console.log('✅ Database connected successfully');

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ User found:', user.email, 'Role:', user.role);

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Password validated successfully');

    // Generate token
    const token = generateToken(user._id.toString(), user.email, user.role);
    console.log('✅ Token generated successfully');

    // Return user data (without password) and token
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log('✅ Login successful for:', email);
    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token,
    });
  } catch (error: any) {
    console.error('❌ Login error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
}