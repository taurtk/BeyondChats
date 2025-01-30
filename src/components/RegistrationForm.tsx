import React, { useState } from 'react';
import { Mail, Lock, User, Chrome } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import type { UserData } from '../types';

interface Props {
  onComplete: (data: UserData) => void;
}

export function RegistrationForm({ onComplete }: Props) {
  const [data, setData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        
        const userInfo = await response.json();
        
        // Update the form data with Google user info
        setData({
          name: userInfo.name,
          email: userInfo.email,
          password: '', // You might want to handle this differently for Google auth
        });
        
        // Proceed with registration
        onComplete({
          name: userInfo.name,
          email: userInfo.email,
          password: '', // You might want to handle this differently for Google auth
        });
      } catch (error) {
        console.error('Error fetching Google user info:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Google login failed:', errorResponse);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showVerification) {
      setShowVerification(true);
      // Simulate sending verification code
      return;
    }
    onComplete(data);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                value={data.name}
                onChange={e => setData({ ...data, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@company.com"
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          {showVerification && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter code"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showVerification ? 'Verify & Continue' : 'Continue'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}