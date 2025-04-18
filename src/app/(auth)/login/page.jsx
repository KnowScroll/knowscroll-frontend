'use client';


import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
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

      {/* Welcome Text */}
      <h1 className="text-3xl font-bold text-white mb-12">Welcome Back</h1>

      {/* Login Form */}
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
        
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent border-b border-gray-400 text-white px-2 py-2 focus:outline-none focus:border-white"
            required
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-4 rounded-full font-semibold mb-4"
        >
          Sign In
        </button>

        <div className="flex justify-center text-sm text-white mb-12">
          <span>Forgot password?</span>
          <Link href="/reset-password" className="ml-2 font-semibold">
            Reset it
          </Link>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4 mb-8">
          <button
            type="button"
            className="w-full border border-white/20 text-white py-3 rounded-full flex items-center justify-center space-x-2"
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
          
          <button
            type="button"
            className="w-full border border-white/20 text-white py-3 rounded-full flex items-center justify-center space-x-2"
          >
            <Image src="/microsoft-icon.svg" alt="Microsoft" width={20} height={20} className="w-5 h-5" />
            <span>Continue with Microsoft</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="flex justify-center text-sm text-white">
          <span>New users?</span>
          <Link href="/signup" className="ml-2 font-semibold">
            Sign up
          </Link>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-auto mb-4 text-xs text-gray-400">
        Known Scroll Android · Version 211 (19781)
      </div>
    </div>
  );
}