# Complaint Management System

A comprehensive web application for managing complaints with real-time email notifications, secure authentication, and powerful admin tools. Built with Next.js, React, MongoDB, and Node.js.

## 🚀 Quick Setup for Recruiters/Evaluators

### **Step 1: Clone and Install**
```bash
git clone <repository-url>
cd complaint-management-system
npm install
```

### **Step 2: Quick Environment Setup**
```bash
# Option A: Use the interactive setup script (recommended)
npm run quick-setup

# Option B: Manual setup
# Copy the example environment file
cp env.example .env.local

# Edit .env.local and update these values:
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-gmail-app-password
```

### **Step 3: Gmail Setup (5 minutes)**
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification" → "App passwords"
   - Select "Mail" → Generate
   - Copy the 16-character password
3. **Update .env.local**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop  # Your actual app password
   ```

### **Step 4: Run the Application**
```bash
npm run dev
```

### **Step 5: Test Admin Features**
1. **Register Admin Account**:
   - Go to http://localhost:3000/register
   - Create account with role "admin"
   
2. **Test Email Configuration**:
   - Login as admin
   - Click "Test Email Configuration" on home page
   - Verify you receive test email

3. **Test Complaint Management**:
   - Register a regular user account
   - Submit a complaint
   - Login as admin to manage complaints
   - Check email notifications

## Features

### For Users
- **Easy Complaint Submission**: Submit complaints with detailed information including category, priority, and description
- **Multiple Categories**: Product, Service, and Support categories
- **Priority Levels**: Low, Medium, and High priority options
- **Real-time Status Tracking**: Track the status of your complaints
- **Secure Authentication**: JWT-based authentication system
- **Email Notifications**: Receive email updates about complaint status changes

### For Administrators
- **Comprehensive Dashboard**: View and manage all complaints in a centralized dashboard
- **Advanced Filtering**: Filter complaints by status and priority
- **Status Management**: Update complaint status (Pending, In Progress, Resolved)
- **Admin Notes**: Add internal notes to complaints
- **Email Notifications**: Receive real-time email notifications for new complaints and status updates
- **User Management**: Secure admin authentication and role-based access control

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Node.js with Next.js API routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **Email**: Nodemailer for email notifications
- **Styling**: Tailwind CSS
- **Deployment**: Vercel-ready

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Email Service** (Gmail or other SMTP provider)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd complaint-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/complaint-system
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   **Environment Variables Explanation:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT token generation (change in production)
   - `EMAIL_USER`: Email address for sending notifications
   - `EMAIL_PASS`: Email password or app-specific password
   - `NEXT_PUBLIC_API_URL`: Your application's base URL

4. **Set up MongoDB**

   **Option A: Local MongoDB**
   ```bash
   # Install MongoDB locally
   # Start MongoDB service
   mongod
   ```

   **Option B: MongoDB Atlas (Cloud)**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string and replace `MONGODB_URI` in `.env.local`

5. **Set up Email Service**

   **For Gmail:**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password
   - Use the App Password as `EMAIL_PASS`

   **For other providers:**
   - Update the email configuration in `lib/email.ts`

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Getting Started

1. **Register an Account**
   - Visit the registration page
   - Create a user account or admin account
   - Choose your role (user or admin)

2. **Submit Complaints (Users)**
   - Fill out the complaint form with:
     - Title
     - Category (Product, Service, Support)
     - Priority (Low, Medium, High)
     - Description
   - Submit the complaint
   - Receive email confirmation

3. **Manage Complaints (Admins)**
   - Log in with admin credentials
   - View all complaints in the dashboard
   - Filter complaints by status and priority
   - Update complaint status and add admin notes
   - Delete complaints if needed

### Email Notifications

The system sends email notifications for:
- **New Complaint**: Admin receives notification when a new complaint is submitted
- **Status Update**: Admin receives notification when complaint status is changed
- **Complaint Resolved**: Admin receives notification when a complaint is marked as resolved

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Complaints
- `POST /api/complaints` - Create a new complaint
- `GET /api/complaints` - Get all complaints (admin only)
- `GET /api/complaints/[id]` - Get specific complaint (admin only)
- `PUT /api/complaints/[id]` - Update complaint (admin only)
- `DELETE /api/complaints/[id]` - Delete complaint (admin only)

## Database Schema

### User Schema
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  role: String (enum: 'user', 'admin'),
  createdAt: Date
}
```

### Complaint Schema
```javascript
{
  title: String (required),
  description: String (required),
  category: String (enum: 'Product', 'Service', 'Support'),
  priority: String (enum: 'Low', 'Medium', 'High'),
  status: String (enum: 'Pending', 'In Progress', 'Resolved'),
  dateSubmitted: Date,
  userEmail: String (optional),
  adminNotes: String (optional),
  resolvedDate: Date (optional)
}
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `MONGODB_URI`: Your production MongoDB connection string
- `JWT_SECRET`: A strong secret key for JWT
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your email password/app password
- `NEXT_PUBLIC_API_URL`: Your production URL

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcryptjs for password security
- **Input Validation**: Server-side validation for all inputs
- **Role-based Access**: Admin-only routes and features
- **CORS Protection**: Configured for security
- **Environment Variables**: Sensitive data stored securely
- **Git Security**: `.env.local` file is automatically excluded from Git tracking

## Error Handling

The application includes comprehensive error handling:
- **Validation Errors**: Proper error messages for invalid inputs
- **Authentication Errors**: Clear feedback for login/registration issues
- **Database Errors**: Graceful handling of database connection issues
- **Email Errors**: Non-blocking email failures
- **API Errors**: Proper HTTP status codes and error messages

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/complaint-management-system/issues) page
2. Create a new issue with detailed information

## Live Demo

<a href="https://complaint-manager.vercel.app/">complaint-manager.vercel.app</a>

---

**Built with ❤️ using Next.js, React, MongoDB, and Node.js**
