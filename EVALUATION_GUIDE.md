# Evaluation Guide for Recruiters

This guide helps recruiters quickly test and evaluate the Complaint Management System.

## 🚀 Quick Start (5 minutes)

### 1. Setup
```bash
git clone <repository-url>
cd complaint-management-system
npm install
npm run quick-setup
```

### 2. Run Application
```bash
npm run dev
```

### 3. Open Application
Navigate to: http://localhost:3000

## 🎯 Evaluation Checklist

### ✅ Core Features Testing

#### **User Authentication**
- [ ] **Register User Account**
  - Go to `/register`
  - Create account with role "user"
  - Verify successful registration

- [ ] **Register Admin Account**
  - Go to `/register`
  - Create account with role "admin"
  - Verify admin privileges

- [ ] **Login/Logout**
  - Test login with both user and admin accounts
  - Verify logout functionality
  - Test session persistence

#### **Complaint Submission (User Features)**
- [ ] **Submit Complaint**
  - Login as regular user
  - Go to `/submit-complaint`
  - Fill form with all required fields:
    - Title: "Test Complaint"
    - Category: "Product"
    - Priority: "High"
    - Description: "This is a test complaint for evaluation"
  - Submit and verify success message

- [ ] **Form Validation**
  - Test submitting empty form
  - Test with invalid data
  - Verify proper error messages

#### **Admin Dashboard (Admin Features)**
- [ ] **Access Admin Dashboard**
  - Login as admin
  - Navigate to `/admin`
  - Verify admin-only access

- [ ] **View Complaints**
  - Verify complaints table displays
  - Check all columns: Title, Category, Priority, Status, Date, Actions

- [ ] **Filter Complaints**
  - Test filtering by status (Pending, In Progress, Resolved)
  - Test filtering by priority (Low, Medium, High)
  - Verify filter functionality

- [ ] **Update Complaint Status**
  - Click "Update" on a complaint
  - Change status from "Pending" to "In Progress"
  - Add admin notes
  - Save changes
  - Verify status update

- [ ] **Mark Complaint as Resolved**
  - Update complaint status to "Resolved"
  - Add resolution notes
  - Verify resolved date is set

- [ ] **Delete Complaint**
  - Click "Delete" on a complaint
  - Confirm deletion
  - Verify complaint is removed

#### **Email Notifications**
- [ ] **Test Email Configuration**
  - Login as admin
  - Click "Test Email Configuration" on home page
  - Verify test email is received

- [ ] **New Complaint Email**
  - Submit a new complaint as user
  - Check admin's email for notification
  - Verify email contains complaint details

- [ ] **Status Update Email**
  - Update complaint status as admin
  - Check email for status update notification
  - Verify email contains old and new status

- [ ] **Complaint Resolved Email**
  - Mark complaint as resolved
  - Check email for resolution notification
  - Verify email contains resolution details

### ✅ Technical Features

#### **Database Operations**
- [ ] **CRUD Operations**
  - Create: Submit new complaint
  - Read: View complaints in admin dashboard
  - Update: Modify complaint status and notes
  - Delete: Remove complaints

#### **API Endpoints**
- [ ] **Authentication APIs**
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login

- [ ] **Complaint APIs**
  - `POST /api/complaints` - Create complaint
  - `GET /api/complaints` - Get all complaints (admin)
  - `PUT /api/complaints/[id]` - Update complaint (admin)
  - `DELETE /api/complaints/[id]` - Delete complaint (admin)

#### **Security Features**
- [ ] **Authentication Protection**
  - Try accessing `/admin` without login
  - Try accessing `/submit-complaint` without login
  - Verify redirects to login page

- [ ] **Role-Based Access**
  - Try accessing admin features as regular user
  - Verify access is denied

- [ ] **JWT Authentication**
  - Check browser storage for JWT token
  - Verify token persistence across page refreshes

#### **UI/UX Features**
- [ ] **Responsive Design**
  - Test on desktop browser
  - Test on mobile browser
  - Verify responsive layout

- [ ] **User Interface**
  - Check form styling and validation
  - Verify table layout and functionality
  - Test modal dialogs for updates

- [ ] **Error Handling**
  - Test with invalid inputs
  - Verify proper error messages
  - Check loading states

## 📊 Evaluation Criteria

### **Code Quality (25%)**
- [ ] Clean, readable code structure
- [ ] Proper error handling
- [ ] Input validation
- [ ] Security best practices

### **Functionality (35%)**
- [ ] All CRUD operations working
- [ ] Email notifications functional
- [ ] Authentication system working
- [ ] Role-based access control

### **User Experience (20%)**
- [ ] Intuitive interface
- [ ] Responsive design
- [ ] Proper feedback messages
- [ ] Smooth navigation

### **Technical Implementation (20%)**
- [ ] MongoDB integration
- [ ] Next.js API routes
- [ ] JWT authentication
- [ ] Email service integration

## 🐛 Common Issues & Solutions

### **Email Not Working**
- Verify Gmail App Password is correct
- Check 2-Factor Authentication is enabled
- Test email configuration from admin panel

### **Database Connection Issues**
- Verify MongoDB URI is correct
- Check network connectivity
- Ensure MongoDB service is running

### **Authentication Issues**
- Clear browser storage
- Check JWT token in browser dev tools
- Verify login credentials

## 📝 Notes for Evaluation

### **Strengths to Look For**
- Complete CRUD functionality
- Real-time email notifications
- Secure authentication system
- Clean, responsive UI
- Proper error handling
- Role-based access control

### **Bonus Points**
- Email testing functionality
- Comprehensive documentation
- Easy setup process
- Professional UI design
- Mobile responsiveness

## 🎯 Quick Test Summary

**Essential Features (Must Work):**
1. User registration and login
2. Complaint submission
3. Admin dashboard access
4. Complaint status updates
5. Email notifications

**Time Required:** 15-20 minutes for complete evaluation

**Success Criteria:** All core features working, emails being sent, proper authentication

---

**Good luck with your evaluation! 🚀**