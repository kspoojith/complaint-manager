import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './_app';
import Head from 'next/head';

export default function Home() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>Complaint Management System</title>
        <meta name="description" content="A comprehensive complaint management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Complaint Management System
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <span className="text-gray-700">
                      Welcome, {user?.name} ({user?.role})
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn-secondary"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigateTo('/login')}
                      className="btn-primary"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigateTo('/register')}
                      className="btn-secondary"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to the Complaint Management System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform for managing complaints with real-time notifications, 
              secure authentication, and powerful admin tools.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Submit Complaints</h3>
              </div>
              <p className="text-gray-600">
                Easily submit complaints with detailed information including category, 
                priority, and description. Get instant confirmation and tracking.
              </p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Admin Dashboard</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive admin panel to view, manage, and update complaint status. 
                Filter and search through complaints efficiently.
              </p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Email Notifications</h3>
              </div>
              <p className="text-gray-600">
                Real-time email notifications for new complaints and status updates. 
                Stay informed about all activities in the system.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            {isAuthenticated ? (
              <div className="space-x-4">
                {user?.role === 'admin' ? (
                  <button
                    onClick={() => navigateTo('/admin')}
                    className="btn-primary text-lg px-8 py-3"
                  >
                    Go to Admin Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigateTo('/submit-complaint')}
                    className="btn-primary text-lg px-8 py-3"
                  >
                    Submit a Complaint
                  </button>
                )}
                <button
                  onClick={() => navigateTo('/profile')}
                  className="btn-secondary text-lg px-8 py-3"
                >
                  View Profile
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md text-center">
                  <p className="text-sm">
                    <strong>Login Required:</strong> You need to be logged in to submit complaints.
                  </p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => navigateTo('/login?redirect=/submit-complaint')}
                    className="btn-primary text-lg px-8 py-3"
                  >
                    Login to Submit Complaint
                  </button>
                  <button
                    onClick={() => navigateTo('/login')}
                    className="btn-secondary text-lg px-8 py-3"
                  >
                    Login to Manage
                  </button>
                </div>
              </div>
            )}
            
            {/* Test Email Configuration Link - Admin Only */}
            {isAuthenticated && user?.role === 'admin' && (
              <div className="mt-6">
                <button
                  onClick={() => navigateTo('/test-email')}
                  className="text-blue-600 hover:text-blue-500 text-sm underline"
                >
                  Test Email Configuration
                </button>
              </div>
            )}
          </div>

          {/* System Features */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              System Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  For Users
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Easy complaint submission form</li>
                  <li>• Multiple categories and priority levels</li>
                  <li>• Real-time status tracking</li>
                  <li>• Secure user authentication</li>
                  <li>• Email notifications</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  For Administrators
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Comprehensive complaint management</li>
                  <li>• Advanced filtering and search</li>
                  <li>• Status updates and admin notes</li>
                  <li>• Email notification system</li>
                  <li>• User management and security</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <p className="mt-2 text-gray-400">
              Built with Next.js, React, MongoDB, and Node.js
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}