import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './_app';
import Head from 'next/head';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) {
    return (
      <>
        <Head>
          <title>Profile - Complaint Management System</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Not Logged In
              </h2>
              <p className="text-gray-600 mb-4">
                Please log in to view your profile.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="btn-primary w-full"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profile - Complaint Management System</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              User Profile
            </h1>
            <p className="text-gray-600">
              Manage your account information and settings.
            </p>
          </div>

          <div className="card">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Account Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-md space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Role:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/')}
                  className="btn-secondary flex-1"
                >
                  Back to Home
                </button>
                {user.role === 'admin' && (
                  <button
                    onClick={() => router.push('/admin')}
                    className="btn-primary flex-1"
                  >
                    Admin Dashboard
                  </button>
                )}
                {user.role === 'user' && (
                  <button
                    onClick={() => router.push('/submit-complaint')}
                    className="btn-primary flex-1"
                  >
                    Submit Complaint
                  </button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button
                  onClick={handleLogout}
                  className="btn-danger w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}