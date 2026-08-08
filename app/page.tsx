'use client';

import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { user, mode, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (user) {
      if (mode === 'recruiter') {
        router.push('/recruiter/dashboard');
      } else {
        router.push('/candidate/jobs');
      }
    }
  }, [user, mode, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-black mb-4">Vitae</h1>
        <p className="text-xl text-gray-700 mb-8">
          Enterprise Hiring Platform
        </p>
        <p className="text-lg text-gray-600 mb-12">
          AI-powered recruitment automation with intelligent screening, instant scheduling, and comprehensive analytics.
        </p>

        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <Link
            href="/login?role=recruiter"
            className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Recruiter Login
          </Link>
          <Link
            href="/login?role=candidate"
            className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors border-2 border-black"
          >
            Candidate Login
          </Link>
        </div>

        <p className="text-gray-700 mt-8">
          Don't have an account?{' '}
          <Link href="/signup" className="text-black font-semibold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
