'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'recruiter' | 'candidate'>('candidate');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const roleParam = searchParams.get('role') as 'recruiter' | 'candidate';
    if (roleParam) {
      setRole(roleParam);
    }

    if (user) {
      if (role === 'recruiter') {
        router.push('/recruiter/dashboard');
      } else {
        router.push('/candidate/jobs');
      }
    }
  }, [user, router, role, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password, role);
      if (role === 'recruiter') {
        router.push('/recruiter/dashboard');
      } else {
        router.push('/candidate/jobs');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Vitae</h1>
        <p className="text-center text-gray-600 mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection - Keep Separate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  role === 'recruiter'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Recruiter
              </button>
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  role === 'candidate'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Candidate
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up here
          </Link>
        </p>

        <p className="text-center text-gray-500 text-xs mt-6">
          Note: Each login type (Recruiter vs Candidate) uses a separate account
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <LoginContent />
    </Suspense>
  );
}
