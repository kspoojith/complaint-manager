# Deployment Guide

This guide will help you deploy the Complaint Management System to Vercel.

## Prerequisites

1. **GitHub Account**: Make sure your code is pushed to a GitHub repository
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas**: Set up a MongoDB Atlas cluster (recommended for production)
4. **Email Service**: Configure your email service (Gmail recommended)

## Step 1: Prepare Your Repository

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Verify Files**
   Make sure these files are in your repository:
   - `package.json`
   - `next.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `tsconfig.json`
   - All source files

## Step 2: Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

2. **Configure Project**
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `.next` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

3. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/complaint-system
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NEXT_PUBLIC_API_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-app.vercel.app`

## Step 3: Configure MongoDB Atlas

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Choose your preferred cloud provider and region

2. **Set Up Database Access**
   - Go to "Database Access"
   - Create a new database user
   - Set username and password
   - Choose "Read and write to any database"

3. **Set Up Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Vercel)
   - Or add Vercel's IP ranges

4. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update `MONGODB_URI` in Vercel environment variables

## Step 4: Configure Email Service

### Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to your Google Account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to "Security"
   - Click "App passwords"
   - Generate a new app password for "Mail"
   - Use this password as `EMAIL_PASS`

3. **Update Environment Variables**
   - Set `EMAIL_USER` to your Gmail address
   - Set `EMAIL_PASS` to the app password you generated

### Other Email Providers

Update the email configuration in `lib/email.ts`:

```javascript
const transporter = nodemailer.createTransporter({
  service: 'your-provider', // e.g., 'outlook', 'yahoo'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Step 5: Test Your Deployment

1. **Health Check**
   - Visit `https://your-app.vercel.app/api/health`
   - Should return a healthy status

2. **Test Features**
   - Register a new user account
   - Submit a complaint
   - Test admin functionality
   - Verify email notifications

## Step 6: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to your Vercel project settings
   - Click "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

2. **Update Environment Variables**
   - Update `NEXT_PUBLIC_API_URL` to your custom domain

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in Vercel
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript configuration

2. **Database Connection Issues**
   - Verify MongoDB Atlas network access
   - Check connection string format
   - Ensure database user has correct permissions

3. **Email Not Working**
   - Verify email credentials
   - Check if 2FA is enabled (for Gmail)
   - Test with a different email provider

4. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names
   - Redeploy after changing environment variables

### Getting Help

1. **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
2. **MongoDB Atlas Documentation**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
3. **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use strong, unique JWT secrets
   - Rotate secrets regularly

2. **Database Security**
   - Use strong database passwords
   - Restrict network access when possible
   - Enable MongoDB Atlas security features

3. **Email Security**
   - Use app-specific passwords
   - Enable 2FA on email accounts
   - Monitor for suspicious activity

## Performance Optimization

1. **Database Indexing**
   - The application includes basic indexes
   - Monitor query performance
   - Add indexes as needed

2. **Caching**
   - Consider adding Redis for session storage
   - Implement API response caching
   - Use CDN for static assets

3. **Monitoring**
   - Set up Vercel Analytics
   - Monitor MongoDB Atlas metrics
   - Set up error tracking (e.g., Sentry)

---

**Your Complaint Management System is now live! 🎉**