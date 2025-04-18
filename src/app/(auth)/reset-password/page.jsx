'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to send a reset email
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Logo and Brand */}
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full mr-3"></div>
        <div className="text-white font-bold text-xl">
          <div>Know</div>
          <div>Scroll</div>
        </div>
      </div>

      {/* Reset Password Text */}
      <h1 className="text-3xl font-bold text-white mb-4">Reset Password</h1>
      
      {!submitted ? (
        <>
          <p className="text-gray-300 text-center mb-8 max-w-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-6">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent border-b border-gray-400 text-white px-2 py-2 focus:outline-none focus:border-white"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-full font-semibold mb-4"
            >
              Send Reset Link
            </button>

            <div className="flex justify-center text-sm text-white mb-8">
              <Link href="/login" className="font-semibold">
                Back to login
              </Link>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center max-w-sm">
          <div className="mb-6 text-green-400 text-6xl">✓</div>
          <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
          <p className="text-gray-300 mb-8">
            We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
          </p>
          <Link href="/login" className="text-white underline font-semibold">
            Return to login
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto mb-4 text-xs text-gray-400">
        Known Scroll Android · Version 211 (19781)
      </div>
    </div>
  );
}