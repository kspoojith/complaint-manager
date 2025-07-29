#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Complaint Management System - Quick Setup for Recruiters');
console.log('==========================================================\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local file already exists!');
  rl.question('Do you want to overwrite it? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createEnvFile();
    } else {
      console.log('Setup cancelled. Using existing .env.local file.');
      rl.close();
    }
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log('\n📧 Email Configuration Setup');
  console.log('----------------------------');
  console.log('You need to set up Gmail for email notifications:');
  console.log('1. Enable 2-Factor Authentication on your Gmail account');
  console.log('2. Generate an App Password:');
  console.log('   - Go to https://myaccount.google.com/security');
  console.log('   - Click "2-Step Verification" → "App passwords"');
  console.log('   - Select "Mail" → Generate');
  console.log('   - Copy the 16-character password\n');

  rl.question('Enter your Gmail address: ', (email) => {
    rl.question('Enter your Gmail App Password (16 characters): ', (password) => {
      const envContent = `MONGODB_URI=mongodb+srv://suryapoojith9805:0jvJo5vaf0HVPS1M@assignment.plz4thw.mongodb.net/?retryWrites=true&w=majority&appName=assignment
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EMAIL_USER=${email}
EMAIL_PASS=${password}
NEXT_PUBLIC_API_URL=http://localhost:3000
`;

      fs.writeFileSync(envPath, envContent);
      
      console.log('\n✅ .env.local file created successfully!');
      console.log('\n📋 Next Steps:');
      console.log('1. Run: npm run dev');
      console.log('2. Open: http://localhost:3000');
      console.log('3. Register an admin account');
      console.log('4. Test email configuration');
      console.log('5. Submit complaints and test admin features');
      
      console.log('\n🎯 Quick Test Checklist:');
      console.log('□ Register admin account');
      console.log('□ Test email configuration (admin only)');
      console.log('□ Register regular user account');
      console.log('□ Submit a complaint');
      console.log('□ Login as admin and manage complaints');
      console.log('□ Check email notifications');
      
      console.log('\n🚀 Ready to go! Run "npm run dev" to start the application.');
      rl.close();
    });
  });
}