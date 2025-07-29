import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthContext } from './_app';

export default function TestEmail() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  // Check authentication and admin role
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/test-email');
      return;
    }
    if (user?.role !== 'admin') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, user, router]);

  // Show loading while checking authentication
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <>
        <Head>
          <title>Access Denied - Complaint Management System</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Checking Access...
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your admin privileges.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const testEmail = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to test email configuration');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Test Email Configuration - Complaint Management System</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Test Email Configuration
            </h1>
            <p className="text-gray-600">
              This page helps you test if your email configuration is working properly.
              If the test is successful, you should receive a test email.
            </p>
          </div>

          <div className="card">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Email Configuration Status
                </h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">
                    <strong>EMAIL_USER:</strong> {process.env.NEXT_PUBLIC_EMAIL_USER || 'Not set (hidden for security)'}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>EMAIL_PASS:</strong> {process.env.NEXT_PUBLIC_EMAIL_PASS ? 'Set' : 'Not set'}
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={testEmail}
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Testing...' : 'Test Email Configuration'}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  <h3 className="font-medium">Test Failed</h3>
                  <p className="mt-1">{error}</p>
                </div>
              )}

              {result && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  <h3 className="font-medium">Test Successful!</h3>
                  <p className="mt-1">{result.message}</p>
                  <p className="mt-1 text-sm">
                    Check your email inbox at: <strong>{result.emailUser}</strong>
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Troubleshooting
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <strong>1. Check Environment Variables:</strong>
                    <p>Make sure EMAIL_USER and EMAIL_PASS are set in your .env.local file</p>
                  </div>
                  <div>
                    <strong>2. Gmail Setup:</strong>
                    <p>For Gmail, enable 2-factor authentication and use an App Password</p>
                  </div>
                  <div>
                    <strong>3. Check Console Logs:</strong>
                    <p>Look at the terminal/console for detailed error messages</p>
                  </div>
                  <div>
                    <strong>4. Email Provider:</strong>
                    <p>Ensure your email provider allows SMTP access</p>
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
                <button
                  onClick={() => router.push('/admin')}
                  className="btn-primary flex-1"
                >
                  Go to Admin Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}