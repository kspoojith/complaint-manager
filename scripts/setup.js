#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Complaint Management System...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file already exists');
} else {
  console.log('📝 Creating .env.local file...');
  const envContent = `MONGODB_URI=mongodb://localhost:27017/complaint-system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NEXT_PUBLIC_API_URL=http://localhost:3000
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created');
  console.log('⚠️  Please update the environment variables in .env.local');
}

console.log('\n📋 Next steps:');
console.log('1. Update .env.local with your actual values');
console.log('2. Install dependencies: npm install');
console.log('3. Start MongoDB (local or Atlas)');
console.log('4. Run the development server: npm run dev');
console.log('5. Open http://localhost:3000 in your browser');

console.log('\n🎉 Setup complete!');